import AddressList from '../pages/customer/AddressList'
import AddAddress from '../pages/customer/AddAddress'
import SellerAddressList from '../pages/seller/AddressList'
import SellerAddAddress from '../pages/seller/AddAddress'

import { ROLES } from '../constants'

const addressRoutes = [
  {
    path: '/CustomerAddress',
    component: AddressList,
    allowedRoles: [ROLES.CUSTOMER],
    type: 'private'
  },
  {
    path: '/AddCustomerAddress',
    component: AddAddress,
    allowedRoles: [ROLES.CUSTOMER],
    type: 'private'
  },
  {
    path: '/SellerAddress',
    component: SellerAddressList,
    allowedRoles: [ROLES.SELLER],
    type: 'private'
  },
  {
    path: '/AddSellerAddress',
    component: SellerAddAddress,
    allowedRoles: [ROLES.SELLER],
    type: 'private'
  }
]

export default addressRoutes
