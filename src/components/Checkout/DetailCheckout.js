import {
  Box,
  Heading,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text
} from '@chakra-ui/react'

import { Fragment } from 'react'

function DetailCheckout ({ products, sellers }) {
  const calculateTotalPriceBySellerId = sellerId => {
    let total = 0
    products
      .filter(entity => entity.product.users_permissions_user === sellerId)
      .map(cart => {
        total += cart.product.price * cart.quantity
        return null
      })
    return total
  }

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
      {sellers.map(seller => (
        <Fragment key={seller.id}>
          <Heading size="xs" as="h4" pt={2} pb={2}>
            {seller.name}
          </Heading>
          {typeof seller.address !== 'undefined'
            ? (
            <Table size="sm" variant="simple" mt={4}>
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th isNumeric>qty</Th>
                  <Th isNumeric>harga</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products
                  .filter(
                    entity =>
                      entity.product.users_permissions_user === seller.id
                  )
                  .map(cart => (
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
                    {formatter.format(calculateTotalPriceBySellerId(seller.id))}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
              )
            : (
            <Text fontSize="sm" color="gray.500">
              {seller.name} does not provide address info, so at the moment we
              cannot proceed their products
            </Text>
              )}
        </Fragment>
      ))}
      <Table size="sm" variant="simple" mt={4}>
        <Tbody>
          <Tr>
            <Td colSpan="2" align="start">
              Grand Total
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
