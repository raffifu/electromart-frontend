
import { configureStore } from '@reduxjs/toolkit'
import initSubscriber from 'redux-subscriber'

import authReducer from './reducer/authSlice'
import productReducer from './reducer/productSlice'
import cartReducer from './reducer/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer
  }
})

export const subscribe = initSubscriber(store)
