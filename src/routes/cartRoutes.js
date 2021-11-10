import CartList from '../pages/customer/CartList'
import Checkout from '../pages/customer/Checkout'
import Payment from '../pages/customer/Payment'

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
    path: '/payment',
    component: Payment,
    allowedRoles: [ROLES.CUSTOMER],
    type: 'private'
  }
//   TODO: route checkout sekalian di sini (?)
]

export default cartRoutes
