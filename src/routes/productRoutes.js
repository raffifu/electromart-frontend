import MyProduct from '../pages/seller/MyProduct'
import AddProduct from '../pages/seller/AddProduct'
import EditProduct from '../pages/seller/EditProduct'
import ShowProduct from '../pages/global/ShowProduct'

import { ROLES } from '../constants'

const productRoutes = [
  {
    path: '/MyProduct',
    component: MyProduct,
    allowedRoles: [ROLES.SELLER],
    type: 'private'
  },
  {
    path: '/AddProduct',
    component: AddProduct,
    allowedRoles: [ROLES.SELLER],
    type: 'private'
  },
  {
    path: '/EditProduct/:id',
    component: EditProduct,
    allowedRoles: [ROLES.SELLER],
    type: 'private'
  },
  {
    path: '/product/:id',
    component: ShowProduct,
    type: 'public'
  }
]

export default productRoutes
