import {
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

import ProductCard from './ProductCard'

function ProductTable (props) {
  const history = useHistory()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { products, auth } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
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
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            actions={(
              <Grid>
                <Button colorScheme="blue">Edit</Button>
                <Button
                onClick={() => {
                  setSelectedProduct(product.id)
                  onOpen()
                }}
                colorScheme="red"
                >
                Delete
                </Button>
              </Grid>
            )}
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
                onClick={() => (console.log(`TODO ${selectedProduct}`))}
              >
                Delete
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Grid>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  products: ownProps.products
})

export default connect(mapStateToProps)(ProductTable)
