import {
  Box,
  Stack,
  Heading,
  Flex,
  Link,
  Button,
  Container,
  Text
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import {
  Address,
  DetailCheckout,
  Logistic,
  Payment
} from '../../components/Checkout'

import Navbar from '../../components/Navbar'
import { connect } from 'react-redux'

import { getCartByUserId, getSellerByIds } from '../../redux/reducer/cartSlice'
import { getCustomerAddressByUserId } from '../../redux/reducer/customerAddressSlice'
import { getAllCourier } from '../../redux/reducer/courierSlice'

import { useEffect } from 'react'

const Checkout = ({
  auth,
  cart,
  courier,
  customerAddress,
  getCustomerAddressByUserId,
  getCartByUserId,
  getAllCourier,
  getSellerByIds
}) => {
  useEffect(async () => {
    await getCartByUserId(auth.user.id)
    await getAllCourier()
    await getCustomerAddressByUserId(auth.user.id)
  }, [])

  useEffect(async () => {
    await getSellerByIds(
      cart.listCarts.map(entity => entity.product.users_permissions_user)
    )
  }, [cart.listCarts])
  const primaryAddress = customerAddress.listCustomerAddresss.filter(
    addr => addr.primary
  )[0]
  return (
    <>
      <Navbar />
      <Box backgroundColor="#ffffff">
        <Container>
          <Heading size="lg" pt={4} pb={4}>
            Checkout
          </Heading>
          {primaryAddress
            ? (
            <>
              <Stack spacing={2}>
                <Address detail={primaryAddress.detail} />
                <DetailCheckout
                  products={cart.listCarts}
                  sellers={cart.sellerList.map(seller => {
                    return {
                      id: seller.id,
                      name: seller.firstName + ' ' + seller.lastName,
                      address: seller.seller_addresses.filter(
                        addr => addr.primary
                      )[0]
                    }
                  })}
                />
                <Logistic
                  courier={courier}
                  address={primaryAddress}
                  products={cart.listCarts}
                  sellers={cart.sellerList.map(seller => {
                    return {
                      id: seller.id,
                      name: seller.firstName + ' ' + seller.lastName,
                      address: seller.seller_addresses.filter(
                        addr => addr.primary
                      )[0]
                    }
                  })}
                />
                <Payment />
              </Stack>
              <Flex justifyContent="flex-end">
                <Button
                  variant="solid"
                  size="md"
                  textAlign="right"
                  leftIcon={<CheckIcon />}
                  colorScheme="green"
                  mt={4}
                >
                  Checkout
                </Button>
              </Flex>
            </>
              )
            : (
            <Text marginTop="24px" color="tomato">
              You do not have address, please input one here{' '}
              <Link color="blue.400" href="/AddCustomerAddress">
                here
              </Link>
            </Text>
              )}
        </Container>
      </Box>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  auth: state.auth,
  cart: state.cart,
  customerAddress: state.customerAddress,
  courier: state.courier
})

export default connect(mapStateToProps, {
  getCartByUserId,
  getAllCourier,
  getCustomerAddressByUserId,
  getSellerByIds
})(Checkout)
