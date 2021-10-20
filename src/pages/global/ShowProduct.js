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

import { ROLES } from '../../constants'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductDetail from '../../components/Product/ProductDetail'
import { useHistory } from 'react-router-dom'

import { getProductById, deleteProduct } from '../../redux/reducer/productSlice'

import { connect } from 'react-redux'
import { useEffect } from 'react'

const NoProductComponent = () => (
  <Center h="400px" color="grey">
    No product found
  </Center>
)

function ShowProduct ({ id, auth, product, getProductById, deleteProduct }) {
  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const SellerActions = (
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

  const CustomerActions = (
    <Box display="flex" justifyContent="flex-end">
      <Button colorScheme="teal">Add to cart</Button>
    </Box>
  )

  const generateActionComponents = () => {
    if (auth.isAuthenticated && auth.user.role === ROLES.CUSTOMER) {
      return CustomerActions
    }

    if (
      auth.isAuthenticated &&
      product.currentProduct.users_permissions_user.id === auth.user.id
    ) {
      return SellerActions
    }
    return <></>
  }

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
      {!product.loading && product.currentProduct === null
        ? (
        <NoProductComponent />
          )
        : (
        <ProductDetail
          product={product.currentProduct}
          actions={generateActionComponents()}
        />
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
              onClick={() => {
                deleteProduct(product.currentProduct.id)
                onClose()
                history.goBack()
              }}
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

export default connect(mapStateToProps, { getProductById, deleteProduct })(ShowProduct)
