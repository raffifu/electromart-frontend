import {
  Box,
  Heading,
  Flex,
  Text,
  Badge,
  Stack,
  Button,
  Divider
} from '@chakra-ui/react'

import { CheckIcon } from '@chakra-ui/icons'

function OrderItem ({ orderDetails, processOrder }) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })
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
                Paid
              </Badge>
              <Heading as="h2" size="md">
                {orderDetails.user.firstName + ' ' + orderDetails.user.lastName}
              </Heading>
            </Box>
            <Flex>
              <Heading size="sm" as="h3" fontStyle="italic">
                Total:{' '}
              </Heading>
              <Text fontSize="sm" pl={2} fontStyle="italic">
                {formatter.format(orderDetails.payment.total)}
              </Text>
            </Flex>
          </Flex>
          <Button
            variant="solid"
            size="md"
            leftIcon={<CheckIcon />}
            colorScheme="green"
            onClick={processOrder}
            disabled={orderDetails.order_status !== 'waiting'}
          >
            {orderDetails.order_status === 'waiting' ? 'Process' : 'Processed'}
          </Button>
        </Flex>
        <Divider />
      </Stack>
    </Box>
  )
}

export default OrderItem
