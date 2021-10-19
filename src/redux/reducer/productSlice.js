import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'
import { toast } from 'react-toastify'

export const addProduct = createAsyncThunk(
  'product/add',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/products', formData)
      toast.success('Register Success')

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

export const getProductById = createAsyncThunk(
  'product/show',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products/${id}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getProducts = createAsyncThunk(
  'product/all',
  async (queryParameter = {}, { rejectWithValue }) => {
    try {
      const res = await api.get('/products', { params: queryParameter })

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  listProducts: [],
  currentProduct: null,
  loading: true
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.currentProduct = payload
      state.listProducts = []
      state.loading = false
    })

    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.currentProduct = null
      state.listProducts = payload
      state.loading = false
    })

    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.currentProduct = payload
      state.listProducts = []
      state.loading = false
    })
  }
})

export default productSlice.reducer
