import { Box, Heading, Flex, Text, Divider, Stack } from '@chakra-ui/react'

function OrderDetail ({ paymentDetails }) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })
  return (
    <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
      <Stack spacing={2}>
        <Flex flexDirection="column">
          <Flex>
            <Heading as="h2" size="md">
              Jenis Transaksi
            </Heading>
            <Text ml={3} fontStyle="italic" fontSize="sm">
              {paymentDetails && paymentDetails.method}
            </Text>
          </Flex>
          <Text fontSize="md">{paymentDetails && paymentDetails.description}</Text>
        </Flex>
        <Divider borderColor="blackAlpha.500" />
        {paymentDetails && (
          <Text color={paymentDetails.status === 'paid' ? 'teal' : 'tomato'}>{paymentDetails.status}</Text>
        )}
        <Divider borderColor="blackAlpha.500" />
        <Flex flexDirection="row" justifyContent="space-between">
          <Heading as="h3" size="sm">
            Total Belanja
          </Heading>
          <Text>{paymentDetails && formatter.format(paymentDetails.totalPrice)}</Text>
        </Flex>
      </Stack>
    </Box>
  )
}

export default OrderDetail
