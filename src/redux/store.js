
import { configureStore } from '@reduxjs/toolkit'
import initSubscriber from 'redux-subscriber'

import authReducer from './reducer/authSlice'
import productReducer from './reducer/productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer
  }
})

export const subscribe = initSubscriber(store)
