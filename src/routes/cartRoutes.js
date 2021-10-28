import CartList from '../pages/customer/CartList'
import Checkout from '../pages/customer/Checkout'

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
  }
//   TODO: route checkout sekalian di sini (?)
]

export default cartRoutes
