import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  Divider
} from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'

function Address ({ detail }) {
  return (
        <Box
            backgroundColor="#ffffff"
            borderRadius={8}
            p={4}
            boxShadow="md"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              pt={2}
              pb={2}
            >
              <Heading size="md" as="h2">
                Alamat
              </Heading>
              <Button as={RouteLink} to={'/CustomerAddress'} variant="solid" size="xs" colorScheme="linkedin" p={3}>
                Change
              </Button>
            </Flex>

            <Divider borderColor="blackAlpha.500" />

            <Text p={3} fontStyle="italic" fontSize="sm">
              {detail}
            </Text>
        </Box>
  )
}

export default Address
