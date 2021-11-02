import Navbar from '../../components/Navbar'
import {
  getSellerAddressByUserId,
  editSellerAddress,
  deleteSellerAddress
} from '../../redux/reducer/sellerAddressSlice'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

import AddressTable from '../../components/Address/AddressTable'

const AddressList = ({
  auth,
  sellerAddress,
  getSellerAddressByUserId,
  editSellerAddress,
  deleteSellerAddress
}) => {
  const [togglerFetchData, setTogglerFetchData] = useState(false)

  useEffect(async () => {
    await getSellerAddressByUserId(auth.user.id)
  }, [togglerFetchData])
  return (
    <>
      <Navbar />
      <AddressTable
        addresses={sellerAddress.listSellerAddresss}
        linkAddAddress='/AddSellerAddress'
        onSetPrimary={async id => {
          await editSellerAddress({
            id: id,
            users_permissions_user: auth.user.id,
            primary: true
          })
          setTogglerFetchData(!togglerFetchData)
        }}
        onDelete={async id => {
          await deleteSellerAddress({ id })
          setTogglerFetchData(!togglerFetchData)
        }}
      />
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  auth: state.auth,
  sellerAddress: state.sellerAddress
})

export default connect(mapStateToProps, {
  getSellerAddressByUserId,
  editSellerAddress,
  deleteSellerAddress
})(AddressList)
