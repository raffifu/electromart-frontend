import {
  Box,
  Heading,
  Divider
} from '@chakra-ui/react'

function Payment () {
  return (
        <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
            <Heading size="md" as="h2" pt={2} pb={2}>
                Metode Pembayaran
            </Heading>
            <Divider borderColor="blackAlpha.500" />
        </Box>
  )
}

export default Payment
