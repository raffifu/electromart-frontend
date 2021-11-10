import {
  Box,
  Heading,
  Flex,
  Text,
  Badge,
  Stack,
  Button
} from '@chakra-ui/react'

import { CheckIcon } from '@chakra-ui/icons'

function OrderItem () {
  return (
        <Box p={4} borderRadius={8} boxShadow="md" backgroundColor="#ffffff">
            <Stack spacing={2}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Flex flexDirection="column">
                        <Box display="flex" alignItems="center">
                             <Badge
                                variant="solid"
                                colorScheme="teal"
                                pl={2}
                                pr={2}
                                borderRadius="full"
                                mr={2}
                            >
                                Bayar
                            </Badge>
                            <Heading as="h2" size="md">
                                Raffi F U
                            </Heading>
                        </Box>
                        <Flex mt={3}>
                            <Heading size="sm" as="h3" fontStyle="italic">
                                Metode:
                            </Heading>
                            <Text fontSize="sm" pl={2} fontStyle="italic">
                                Bank BIN
                            </Text>
                        </Flex>
                        <Flex>
                            <Heading size="sm" as="h3" fontStyle="italic">
                                Total:{' '}
                            </Heading>
                            <Text fontSize="sm" pl={2} fontStyle="italic">
                                Rp. 50.000
                            </Text>
                        </Flex>
                    </Flex>
                    <Button
                        variant="solid"
                        size="md"
                        leftIcon={<CheckIcon />}
                        colorScheme="green"
                    >
                        Verifiy
                    </Button>
                </Flex>
            </Stack>
        </Box>
  )
}

export default OrderItem
