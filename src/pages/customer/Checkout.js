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

import {
  getCartByUserId,
  getSellerByIds,
  checkout
} from '../../redux/reducer/cartSlice'
import { getCustomerAddressByUserId } from '../../redux/reducer/customerAddressSlice'
import { getAllCourier } from '../../redux/reducer/courierSlice'

import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Checkout = ({
  auth,
  cart,
  courier,
  customerAddress,
  getCustomerAddressByUserId,
  getCartByUserId,
  getAllCourier,
  getSellerByIds,
  checkout
}) => {
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [courierCost, setCourierCost] = useState([])
  const history = useHistory()

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

  const isAbleToCheckout = () => {
    if (cart.sellerList.length === 0) return false
    for (let i = 0; i < cart.sellerList.length; i++) {
      if (cart.sellerList[i].seller_addresses.length === 0) return false
    }

    return true
  }

  const calculateTotalPriceBySellerId = sellerId => {
    let total = 0
    cart.listCarts
      .filter(entity => entity.product.users_permissions_user === sellerId)
      .map(cart => {
        total += cart.product.price * cart.quantity
        return null
      })
    return total
  }

  const calculateTotalPrice = () => {
    let total = 0
    cart.listCarts.map(cart => {
      total += cart.product.price * cart.quantity
      return null
    })
    return total
  }

  const calculateGrandTotal = () => {
    let total = 0
    courierCost.map(c => {
      total += c.cost
      return 1
    })
    total += calculateTotalPrice()
    return total
  }

  const submitOrder = async () => {
    const data = {
      payment_method: paymentMethod,
      grand_total: calculateGrandTotal(),
      sellers: cart.sellerList.map(seller => {
        return {
          id: seller.id,
          products: cart.listCarts
            .filter(
              entity => entity.product.users_permissions_user === seller.id
            )
            .map(cart => {
              return { id: cart.product.id }
            }),
          total_price: calculateTotalPriceBySellerId(seller.id),
          shipping_price: courierCost.filter(cost => cost.id === seller.id)[0]
            .cost
        }
      }),
      user: {
        id: auth.user.id,
        address: primaryAddress.id
      },
      cart: cart.listCarts.map(cart => cart.id)
    }
    await checkout(data)
  }

  useEffect(() => {
    if (cart.paymentId) history.push(`/payment/${cart.paymentId}`)
  }, [cart.paymentId])

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
                  courierCost={courierCost}
                  setCourierCost={setCourierCost}
                />
                <Payment
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              </Stack>
              <Flex justifyContent="flex-end">
                <Button
                  variant="solid"
                  size="md"
                  textAlign="right"
                  leftIcon={<CheckIcon />}
                  colorScheme="green"
                  mt={4}
                  disabled={!isAbleToCheckout()}
                  onClick={submitOrder}
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
  getSellerByIds,
  checkout
})(Checkout)
