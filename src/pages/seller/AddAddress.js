import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AddressForm from '../../components/Address/AddressForm'

import { connect } from 'react-redux'
import { addSellerAddress } from '../../redux/reducer/sellerAddressSlice'

function AddAddress ({ addSellerAddress }) {
  return (
    <>
    <Navbar/>
    <AddressForm onSubmit={addSellerAddress} submitButtonText="Add Address" />
    <Footer/>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  address: state.address
})

export default connect(mapStateToProps, { addSellerAddress })(AddAddress)
