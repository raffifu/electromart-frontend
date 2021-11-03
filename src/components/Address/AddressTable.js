import {
  Button,
  Center,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Link,
  Text
} from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'

function AddressTable ({ addresses, onSetPrimary, onDelete, linkAddAddress }) {
  return (
    <Container maxW="80vw">
      {addresses.length === 0
        ? (
        <Center minH="90vh">
          You do not have any address, pleas add one
          <Link color="teal.500" href={linkAddAddress}>
            {' '}
            here
          </Link>
        </Center>
          )
        : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Detail</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {addresses.map(addr => (
                <Tr key={addr.id}>
                  <Td>{addr.detail}</Td>
                  <Td>
                    {addr.primary
                      ? (
                      <Text color="whatsapp.400">Primary</Text>
                        )
                      : (
                      <Text color="tomato">Secondary</Text>
                        )}
                  </Td>
                  <Td>
                    {!addr.primary && (
                      <Button
                        onClick={() => onSetPrimary(addr.id)}
                        color="teal"
                      >
                        Set as primary
                      </Button>
                    )}
                    <Button onClick={() => onDelete(addr.id)} color="red">
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex direction="row-reverse">
            <Button
              as={RouteLink}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'green.400'}
              to={linkAddAddress}
              _hover={{
                bg: 'green.600'
              }}
            >
              Add
            </Button>
          </Flex>
        </>
          )}
    </Container>
  )
}

export default AddressTable
