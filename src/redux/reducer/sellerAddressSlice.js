import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'
import { toast } from 'react-toastify'

export const addSellerAddress = createAsyncThunk(
  'seller_addresses/add',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/seller-addresses', data)
      toast.success('Successfully added to seller_addresses')
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

export const editSellerAddress = createAsyncThunk(
  'seller_addresses/edit',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(`/seller-addresses/${data.id}`, data)
      toast.success('Successfully updated seller_addresses')
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

export const getSellerAddressByUserId = createAsyncThunk(
  'seller_addresses/show',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/seller-addresses?users_permissions_user=${userId}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteSellerAddress = createAsyncThunk(
  'seller_addresses/delete',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/seller-addresses/${data.id}`, data)
      toast.success('Successfully deleted seller_addresses')
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

const initialState = {
  listSellerAddresss: [],
  currentSellerAddress: {
    id: '',
    detail: '',
    latitude: null,
    longitude: null,
    primary: false
  },
  loading: true
}

export const SellerAddressSlice = createSlice({
  name: 'seller_addresses',
  initialState,
  extraReducers: builder => {
    builder.addCase(addSellerAddress.fulfilled, (state, { payload }) => {
      state.currentSellerAddress = payload
      state.loading = false
    })

    builder.addCase(editSellerAddress.fulfilled, (state, { payload }) => {
      state.currentSellerAddress = payload
      state.loading = false
    })

    builder.addCase(getSellerAddressByUserId.fulfilled, (state, { payload }) => {
      state.currentSellerAddress = initialState.currentSellerAddress
      state.listSellerAddresss = payload
      state.loading = false
    })
  }
})

export default SellerAddressSlice.reducer
