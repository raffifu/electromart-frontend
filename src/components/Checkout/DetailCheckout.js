import {
  Box,
  Heading,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react'

function DetailCheckout ({ products }) {
  const calculateTotalPrice = () => {
    let total = 0
    products.map(cart => {
      total += cart.product.price * cart.quantity
      return null
    })
    return total
  }

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })

  return (
    <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
      <Heading size="md" as="h2" pt={2} pb={2}>
        Detail Checkout
      </Heading>
      <Divider borderColor="blackAlpha.500" />
      <Table size="sm" variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th isNumeric>qty</Th>
            <Th isNumeric>harga</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(cart => (
            <Tr key={cart.id}>
              <Td>{cart.product.name}</Td>
              <Td isNumeric>{cart.quantity}</Td>
              <Td isNumeric>{formatter.format(cart.product.price)}</Td>
            </Tr>
          ))}
          <Tr>
            <Td colSpan="2" align="start">
              Total
            </Td>
            <Td align="end" isNumeric>
              {formatter.format(calculateTotalPrice())}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}

export default DetailCheckout
