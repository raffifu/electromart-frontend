import {
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'

function ProductTable (props) {
  const history = useHistory()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { products, auth } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Product</Th>
          <Th>Description</Th>
          <Th isNumeric>Stock</Th>
          <Th isNumeric>Price</Th>
          <Th>
            {auth.isAuthenticated && (
              <Button
              colorScheme="green"
              onClick={() => {
                history.push('/products/add')
              }}
              >
                Add Products
              </Button>
            )}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map(e => (
          <Tr key={e.id}>
            <Td>
              <Box height={50} width={50}>
                <Image src={e.image} />
              </Box>
            </Td>
            <Td>{e.name}</Td>
            <Td>{e.description}</Td>
            <Td isNumeric>{e.stock}</Td>
            <Td isNumeric>{e.price}</Td>
            <Td>
              {auth.isAuthenticated && auth.user.id === e.users_permissions_user.id && (
                <Grid>
                    <Button colorScheme="blue">Edit</Button>
                    <Button
                    onClick={() => {
                      setSelectedProduct(e.id)
                      onOpen()
                    }}
                    colorScheme="red"
                    >
                    Delete
                    </Button>
                </Grid>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p>Are you sure you want to delete this item?</p>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => (console.log(`TODO ${selectedProduct}`))}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Table>
  )
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  products: ownProps.products
})

export default connect(mapStateToProps)(ProductTable)
