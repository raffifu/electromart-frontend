import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'
import { toast } from 'react-toastify'

export const addProduct = createAsyncThunk(
  'product/add',
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      const jsonData = JSON.stringify(data)
      console.log(jsonData)
      formData.append('data', jsonData)
      console.log('formdata', formData)
      //   files.map(file => formData.append('files.picture', file.selectedFile, file.selectedFile.name))

      const res = await api.post('/products', formData)
      toast.success('Successfully added new product')
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
  currentProduct: {
    name: '',
    price: 0,
    weightInGrams: 0,
    condition: 'new',
    users_permissions_user: '',
    stock: 0,
    description: ''
  },
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
      state.currentProduct = initialState.currentProduct
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
