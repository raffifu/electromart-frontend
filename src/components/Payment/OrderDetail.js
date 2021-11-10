import {
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Stack
} from '@chakra-ui/react'

function OrderDetail () {
  return (
        <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
            <Stack spacing={2}>
                <Flex flexDirection="column">
                    <Flex>
                        <Heading as="h2" size="md">
                            Nomor Rekening
                        </Heading>
                        <Text ml={3} fontStyle="italic" fontSize="sm">(Bank BNI: Transfer)</Text>
                    </Flex>
                    <Text fontSize="md">01298347983</Text>
                </Flex>
                <Divider borderColor="blackAlpha.500" />
                <Flex flexDirection="row" justifyContent="space-between">
                <Heading as="h3" size="sm">
                    Total Belanja
                </Heading>
                <Text>01298347983</Text>
                </Flex>
            </Stack>
        </Box>
  )
}

export default OrderDetail
