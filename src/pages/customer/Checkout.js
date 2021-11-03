import { Box, Stack, Heading, Flex, Button, Container } from '@chakra-ui/react'
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
import { getAllCourier } from '../../redux/reducer/courierSlice'

import { useEffect } from 'react'

const Checkout = ({ auth, cart, courier, getCartByUserId, getAllCourier }) => {
  useEffect(async () => {
    await getCartByUserId(auth.user.id)
    await getAllCourier()
  }, [])
  return (
    <>
      <Navbar />
      <Box backgroundColor="#ffffff">
        <Container>
          <Heading size="lg" pt={4} pb={4}>
            Checkout
          </Heading>
          <Stack spacing={2}>
            <Address />
            <DetailCheckout products={cart.listCarts} courierCost={courier.cost} />
            <Logistic courier={courier} weight={cart.listCarts.map(cart => cart.product.weightInGrams * cart.quantity).reduce((a, b) => a + b, 0)} />
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
        </Container>
      </Box>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  auth: state.auth,
  cart: state.cart,
  courier: state.courier
})

export default connect(mapStateToProps, {
  getCartByUserId, getAllCourier
})(Checkout)
