import CartList from '../pages/customer/CartList'
import Checkout from '../pages/customer/Checkout'
import Payment from '../pages/customer/Payment'
import Order from '../pages/seller/Order'

import { ROLES } from '../constants'

const cartRoutes = [
  {
    path: '/carts',
    component: CartList,
    allowedRoles: [ROLES.CUSTOMER],
    type: 'private'
  },
  {
    path: '/checkout',
    component: Checkout,
    allowedRoles: [ROLES.CUSTOMER],
    type: 'private'
  },
  {
    path: '/payment/:paymentId',
    component: Payment,
    allowedRoles: [ROLES.CUSTOMER],
    type: 'private'
  },
  {
    path: '/order',
    component: Order,
    allowedRoles: [ROLES.SELLER],
    type: 'private'
  }
//   TODO: route checkout sekalian di sini (?)
]

export default cartRoutes
