import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'
import { toast } from 'react-toastify'

export const addCustomerAddress = createAsyncThunk(
  'customer_addresses/add',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/customer-addresses', data)
      toast.success('Successfully added to customer_addresses')
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

export const editCustomerAddress = createAsyncThunk(
  'customer_addresses/edit',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(`/customer-addresses/${data.id}`, data)
      toast.success('Successfully updated customer_addresses')
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

export const getCustomerAddressByUserId = createAsyncThunk(
  'customer_addresses/show',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/customer-addresses?users_permissions_user=${userId}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteCustomerAddress = createAsyncThunk(
  'customer_addresses/delete',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/customer-addresses/${data.id}`, data)
      toast.success('Successfully deleted customer_addresses')
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
  listCustomerAddresss: [],
  currentCustomerAddress: {
    id: '',
    detail: '',
    latitude: null,
    longitude: null,
    primary: false
  },
  loading: true
}

export const customerAddressSlice = createSlice({
  name: 'customer_addresses',
  initialState,
  extraReducers: builder => {
    builder.addCase(addCustomerAddress.fulfilled, (state, { payload }) => {
      state.currentCustomerAddress = payload
      state.loading = false
    })

    builder.addCase(editCustomerAddress.fulfilled, (state, { payload }) => {
      state.currentCustomerAddress = payload
      state.loading = false
    })

    builder.addCase(getCustomerAddressByUserId.fulfilled, (state, { payload }) => {
      state.currentCustomerAddress = initialState.currentCustomerAddress
      state.listCustomerAddresss = payload
      state.loading = false
    })
  }
})

export default customerAddressSlice.reducer
