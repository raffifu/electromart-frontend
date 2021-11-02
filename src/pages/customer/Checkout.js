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

import { getCartByUserId } from '../../redux/reducer/cartSlice'
import { getCustomerAddressByUserId } from '../../redux/reducer/customerAddressSlice'

import { useEffect } from 'react'

const Checkout = ({
  auth,
  cart,
  getCartByUserId,
  customerAddress,
  getCustomerAddressByUserId
}) => {
  useEffect(async () => {
    await getCartByUserId(auth.user.id)
    await getCustomerAddressByUserId(auth.user.id)
  }, [])
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
                <DetailCheckout products={cart.listCarts} />
                <Logistic />
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
  customerAddress: state.customerAddress
})

export default connect(mapStateToProps, {
  getCartByUserId,
  getCustomerAddressByUserId
})(Checkout)
