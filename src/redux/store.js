
import { configureStore } from '@reduxjs/toolkit'
import initSubscriber from 'redux-subscriber'

import authReducer from './reducer/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export const subscribe = initSubscriber(store)
