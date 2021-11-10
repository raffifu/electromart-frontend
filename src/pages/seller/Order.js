import { Box, Stack, Heading, Container } from '@chakra-ui/react'

import Navbar from '../../components/Navbar'
import OrderItem from '../../components/Order/OrderItem'

import {
  getListOfOrdersBySellerId,
  processOrder
} from '../../redux/reducer/orderSlice'

import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { store } from '../../redux/store'

function Order ({ sellerId, listOrders, getListOfOrdersBySellerId }) {
  const [toggleRefetch, setToggleRefetch] = useState(false)
  useEffect(async () => {
    await getListOfOrdersBySellerId(sellerId)
  }, [sellerId, toggleRefetch])
  return (
    <>
      <Navbar />
      <Box backgroundColor="#ffffff">
        <Container>
          <Heading size="lg" pt={4} pb={4}>
            Transaksi Masuk
          </Heading>
          <>
            <Stack spacing={2}>
              {listOrders.map(order => (
                <OrderItem
                  key={order.id}
                  orderDetails={order}
                  processOrder={async () => {
                    await store.dispatch(processOrder(order.id))
                    setToggleRefetch(!toggleRefetch)
                  }}
                />
              ))}
            </Stack>
          </>
        </Container>
      </Box>
    </>
  )
}

const mapStateToProps = state => ({
  sellerId: state.auth.user.id,
  listOrders: state.order.listOrders
})

export default connect(mapStateToProps, {
  getListOfOrdersBySellerId,
  processOrder
})(Order)
