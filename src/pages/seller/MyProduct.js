import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ProductTable from '../../components/ProductTable'

import { getProducts } from '../../redux/reducer/productSlice'

import { connect } from 'react-redux'
import { useEffect } from 'react'
import { Center, Spinner } from '@chakra-ui/react'

function MyProduct ({ auth, product, getProducts }) {
  useEffect(() => {
    getProducts({ users_permissions_user: auth.user.id })
  }, [])
  return (
    <>
    <Navbar/>
    {
      product.loading
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
        : <ProductTable products={product.listProducts} />
    }
    <Footer/>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product
})

export default connect(mapStateToProps, { getProducts })(MyProduct)
