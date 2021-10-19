import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductForm from '../../components/Product/ProductForm'

import { addProduct } from '../../redux/reducer/productSlice'

import { connect } from 'react-redux'

function AddProduct ({ addProduct }) {
  return (
    <>
    <Navbar/>
    <ProductForm onSubmit={addProduct} />
    <Footer/>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product
})

export default connect(mapStateToProps, { addProduct })(AddProduct)
