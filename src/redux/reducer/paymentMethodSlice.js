import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'

export const getPaymentMethods = createAsyncThunk(
  'paymentMethod/index',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get('/payment-methods')

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getPaymentDetails = createAsyncThunk(
  'paymentMethod/show',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/payments/${id}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const pay = createAsyncThunk(
  'paymentMethod/pay',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.put(`/payments/${id}`, {
        status: 'paid'
      })

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  listPaymentMethods: [],
  currentPaymentMethod: null,
  paymentDetail: null,
  loading: true
}

export const cartSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPaymentMethods.fulfilled, (state, { payload }) => {
      state.listPaymentMethods = payload
      state.loading = false
    })

    builder.addCase(getPaymentDetails.fulfilled, (state, { payload }) => {
      state.paymentDetail = payload
      state.loading = false
    })

    builder.addCase(pay.fulfilled, (state, { payload }) => {
      state.paymentDetail = payload
      state.loading = false
    })
  }
})

export default cartSlice.reducer
