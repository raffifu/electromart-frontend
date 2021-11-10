import { Box, Stack, Heading, Flex, Button, Container } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import Navbar from '../../components/Navbar'
import PaymentStep from '../../components/Payment/PaymentStep'
import OrderDetail from '../../components/Payment/OrderDetail'
import {
  getPaymentMethods,
  getPaymentDetails,
  pay
} from '../../redux/reducer/paymentMethodSlice'

import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const Payment = ({
  paymentId,
  paymentMethods,
  paymentDetail,
  getPaymentMethods,
  getPaymentDetails,
  pay
}) => {
  const [paymentDetails, setPaymentDetails] = useState(null)
  useEffect(async () => {
    await getPaymentMethods()
    await getPaymentDetails(paymentId)
  }, [])

  useEffect(() => {
    if (paymentDetail) {
      const currentPayment = paymentMethods.filter(
        p => parseInt(p.id) === parseInt(paymentDetail.payment_method.id)
      )[0]
      setPaymentDetails({
        description: currentPayment.description,
        method: currentPayment.method,
        totalPrice: paymentDetail.total,
        status: paymentDetail.status
      })
    }
  }, [paymentMethods, paymentDetail])
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
              <OrderDetail paymentDetails={paymentDetails} />
              <PaymentStep />
            </Stack>
            <Flex justifyContent="flex-end">
              <Button
                variant="solid"
                size="md"
                textAlign="right"
                leftIcon={<CheckIcon />}
                colorScheme="green"
                mt={4}
                onClick={() => pay(paymentId)}
                disabled={!paymentDetails || paymentDetails.status === 'paid'}
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

const mapStateToProps = (state, ownProps) => ({
  paymentMethods: state.paymentMethod.listPaymentMethods,
  paymentDetail: state.paymentMethod.paymentDetail,
  paymentId: ownProps.match.params.paymentId
})

export default connect(mapStateToProps, {
  getPaymentMethods,
  getPaymentDetails,
  pay
})(Payment)
