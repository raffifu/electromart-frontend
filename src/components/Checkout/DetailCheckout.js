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

function DetailCheckout () {
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
                    <Tr>
                    <Td>Raspberry Pi 4</Td>
                    <Td isNumeric>2</Td>
                    <Td isNumeric>50000</Td>
                    </Tr>
                </Tbody>
            </Table>
          </Box>
  )
}

export default DetailCheckout
