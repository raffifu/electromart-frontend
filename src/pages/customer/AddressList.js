import Navbar from '../../components/Navbar'
import {
  getCustomerAddressByUserId,
  editCustomerAddress,
  deleteCustomerAddress
} from '../../redux/reducer/customerAddressSlice'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

import AddressTable from '../../components/Address/AddressTable'

const AddressList = ({
  auth,
  customerAddress,
  getCustomerAddressByUserId,
  editCustomerAddress,
  deleteCustomerAddress
}) => {
  const [togglerFetchData, setTogglerFetchData] = useState(false)

  useEffect(async () => {
    await getCustomerAddressByUserId(auth.user.id)
  }, [togglerFetchData])
  return (
    <>
      <Navbar />
      <AddressTable
        addresses={customerAddress.listCustomerAddresss}
        linkAddAddress='/AddCustomerAddress'
        onSetPrimary={async id => {
          await editCustomerAddress({
            id: id,
            users_permissions_user: auth.user.id,
            primary: true
          })
          setTogglerFetchData(!togglerFetchData)
        }}
        onDelete={async id => {
          await deleteCustomerAddress({ id })
          setTogglerFetchData(!togglerFetchData)
        }}
      />
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  auth: state.auth,
  customerAddress: state.customerAddress
})

export default connect(mapStateToProps, {
  getCustomerAddressByUserId,
  editCustomerAddress,
  deleteCustomerAddress
})(AddressList)
