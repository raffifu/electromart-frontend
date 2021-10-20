import {
  Box,
  Button,
  Center,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react'

import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'

import ProductCard from './ProductCard'

const NoProductComponent = () => (<Center h="400px" color="grey">
No product found
</Center>)

function ProductList (props) {
  const history = useHistory()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { onDelete, products, auth } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {auth.isAuthenticated && (
        <Box
          margin="40px"
          display="flex"
          justifyContent="flex-end"
          flexDirection="row"
        >
          <Button
            size="xs"
            colorScheme="green"
            onClick={() => {
              history.push('/AddProduct')
            }}
          >
            Add Product
          </Button>
        </Box>
      )}

      {products.length === 0 && <NoProductComponent />}

      <SimpleGrid
        minChildWidth="240px"
        spacing="40px"
        margin="40px"
      >
        {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              actions={
                <Grid>
                  <Button colorScheme="blue">Edit</Button>
                  <Button
                    onClick={e => {
                      e.stopPropagation()
                      setSelectedProduct(product.id)
                      onOpen()
                    }}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </Grid>
              }
            />
        ))}
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
                onClick={() => {
                  onDelete(selectedProduct)
                  onClose()
                }}
              >
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </SimpleGrid>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  products: ownProps.products,
  onDelete: ownProps.onDelete
})

export default connect(mapStateToProps)(ProductList)
