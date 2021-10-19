import MyProduct from '../pages/seller/MyProduct'
import AddProduct from '../pages/seller/AddProduct'

import { ROLES } from '../constants'

const productRoutes = [
  {
    path: '/MyProduct',
    component: MyProduct,
    allowedRoles: [ROLES.SELLER]

  },
  {
    path: '/AddProduct',
    component: AddProduct,
    allowedRoles: [ROLES.SELLER]
  }
]

export default productRoutes
