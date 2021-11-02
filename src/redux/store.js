
import { configureStore } from '@reduxjs/toolkit'
import initSubscriber from 'redux-subscriber'

import authReducer from './reducer/authSlice'
import productReducer from './reducer/productSlice'
import cartReducer from './reducer/cartSlice'
import customerAddressReducer from './reducer/customerAddressSlice'
import sellerAddressReducer from './reducer/sellerAddressSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    customerAddress: customerAddressReducer,
    sellerAddress: sellerAddressReducer
  }
})

export const subscribe = initSubscriber(store)
