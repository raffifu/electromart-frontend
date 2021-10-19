import {
  Button,
  Box,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useDisclosure
} from '@chakra-ui/react'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductDetail from '../../components/Product/ProductDetail'

import { getProductById } from '../../redux/reducer/productSlice'

import { connect } from 'react-redux'
import { useEffect } from 'react'

const NoProductComponent = () => (
  <Center h="400px" color="grey">
    No product found
  </Center>
)

function ShowProduct ({ id, auth, product, getProductById }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const actions = (
    <Box display="flex" justifyContent="flex-end">
      <Button colorScheme="blue">Edit</Button>
      <Button
        onClick={() => {
          onOpen()
        }}
        colorScheme="red"
      >
        Delete
      </Button>
    </Box>
  )

  useEffect(() => {
    if (id) getProductById(id)
  }, [id])

  return (
    <>
      <Navbar />
      {product.loading && (
        <Center w="100vw" h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      {product.currentProduct === null
        ? (
        <NoProductComponent />
          )
        : (
        <ProductDetail product={product.currentProduct} actions={actions} />
          )}
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
              onClick={() => console.log(`TODO ${product.currentProduct}`)}
            >
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Footer />
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  auth: state.auth,
  product: state.product
})

export default connect(mapStateToProps, { getProductById })(ShowProduct)
