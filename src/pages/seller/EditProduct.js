import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductForm from '../../components/Product/ProductForm'
import { Center, Spinner } from '@chakra-ui/react'

import { editProduct, getProductById } from '../../redux/reducer/productSlice'

import { connect } from 'react-redux'
import { useEffect } from 'react'

function EditProduct ({ id, editProduct, getProductById, product }) {
  useEffect(() => {
    getProductById(id)
  }, [])
  return (
    <>
      <Navbar />
      {(!product.currentProduct.id || product.loading)
        ? (
        <Center w="100vw" h="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
          )
        : (
        <ProductForm onSubmit={data => editProduct({ ...data, id: id })} submitButtonText="Edit Product" />
          )}
      <Footer />
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  product: state.product
})

export default connect(mapStateToProps, { editProduct, getProductById })(
  EditProduct
)
