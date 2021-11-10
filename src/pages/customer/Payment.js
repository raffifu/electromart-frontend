import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  Container
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import Navbar from '../../components/Navbar'
import PaymentStep from '../../components/Payment/PaymentStep'
import OrderDetail from '../../components/Payment/OrderDetail'

const Payment = () => {
  return (
    <>
      <Navbar />
      <Box backgroundColor="#ffffff">
        <Container>
          <Heading size="lg" pt={4} pb={4}>
            Payment
          </Heading>
            <>
              <Stack spacing={2}>
                <OrderDetail/>
                <PaymentStep/>
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
                  Pay
                </Button>
              </Flex>
            </>
        </Container>
      </Box>
    </>
  )
}

export default Payment
