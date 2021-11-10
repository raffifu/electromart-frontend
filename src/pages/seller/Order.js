import {
  Box,
  Stack,
  Heading,
  Container
} from '@chakra-ui/react'

import Navbar from '../../components/Navbar'
import OrderItem from '../../components/Order/OrderItem'

function Order () {
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
                <OrderItem/>
                <OrderItem/>
              </Stack>
            </>
        </Container>
      </Box>
    </>
  )
}

export default Order
