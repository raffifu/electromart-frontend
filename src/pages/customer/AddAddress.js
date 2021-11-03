import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AddressForm from '../../components/Address/AddressForm'

import { addCustomerAddress } from '../../redux/reducer/customerAddressSlice'

import { connect } from 'react-redux'

function AddAddress ({ addCustomerAddress }) {
  return (
    <>
    <Navbar/>
    <AddressForm onSubmit={addCustomerAddress} submitButtonText="Add Address" />
    <Footer/>
    </>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  address: state.address
})

export default connect(mapStateToProps, { addCustomerAddress })(AddAddress)
