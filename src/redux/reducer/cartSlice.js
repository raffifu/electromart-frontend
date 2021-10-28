import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'
import { toast } from 'react-toastify'

export const addCart = createAsyncThunk(
  'cart/add',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/carts', data)
      toast.success('Successfully added to cart')
      return res.data
    } catch (error) {
      const messages = error.response.data.message[0].messages
      messages.forEach(message => {
        toast.error(message.message)
      })

      return rejectWithValue(error.response.data)
    }
  }
)

export const editCart = createAsyncThunk(
  'cart/edit',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(`/carts/${data.id}`, data)
      toast.success('Successfully updated cart')
      return res.data
    } catch (error) {
      const messages = error.response.data.message[0].messages
      messages.forEach(message => {
        toast.error(message.message)
      })

      return rejectWithValue(error.response.data)
    }
  }
)

export const getCartByUserId = createAsyncThunk(
  'cart/show',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/carts?users_permissions_user=${userId}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  listCarts: [],
  currentCart: {
    id: '',
    product: null,
    users_permissions_user: null,
    quantity: 0
  },
  loading: true
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: builder => {
    builder.addCase(addCart.fulfilled, (state, { payload }) => {
      state.currentCart = payload
      state.loading = false
    })

    builder.addCase(editCart.fulfilled, (state, { payload }) => {
      state.currentCart = payload
      state.loading = false
    })

    builder.addCase(getCartByUserId.fulfilled, (state, { payload }) => {
      state.currentCart = initialState.currentCart
      state.listCarts = payload
      state.loading = false
    })
  }
})

export default cartSlice.reducer
