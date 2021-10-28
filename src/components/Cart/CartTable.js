import {
  Button,
  Center,
  Container,
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Link
} from '@chakra-ui/react'
import NoImage from '../../assets/images/no_image.png'
import { backendUrl } from '../../constants'
import { Link as RouteLink } from 'react-router-dom'

function CartTable ({ products, onUpdateQty }) {
  const getPictureUrl = pic => {
    if (pic.formats.small) return backendUrl + pic.formats.small.url
    if (pic.formats.thumbnail) return backendUrl + pic.formats.thumbnail.url
    return NoImage
  }

  return (
    <Container maxW="80vw">
      {products.length === 0
        ? (
        <Center minH="90vh">
          Your cart is empty, let&apos;s explore some of our products{' '}
          <Link color="teal.500" href="/">
            {' '}here
          </Link>
        </Center>
          )
        : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Product</Th>
                <Th isNumeric>Stock</Th>
                <Th isNumeric>Price</Th>
                <Th>Qty</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map(e => (
                <Tr key={e.id}>
                  <Td>
                    <Box maxW="100px" maxH="100px">
                      <Image src={getPictureUrl(e.product.picture[0])} />
                    </Box>
                  </Td>
                  <Td>{e.product.name}</Td>
                  <Td isNumeric>{e.product.stock}</Td>
                  <Td isNumeric>{e.product.price}</Td>
                  <Td>
                    <Flex>
                      <Box maxW="75px">
                        <NumberInput
                          defaultValue={e.quantity}
                          clampValueOnBlur={false}
                          max={e.quantity + e.product.stock}
                          onChange={ev => onUpdateQty(e.id, e.product.id, ev)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                    </Flex>
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
              to={'/checkout'}
              _hover={{
                bg: 'green.600'
              }}
            >
              Checkout
            </Button>
          </Flex>
        </>
          )}
    </Container>
  )
}

export default CartTable
