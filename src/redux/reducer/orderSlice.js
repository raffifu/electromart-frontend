import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'

export const getListOfOrdersBySellerId = createAsyncThunk(
  'order/seller',
  async (sellerId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/orders?seller=${sellerId}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getListOfOrdersByCustomerId = createAsyncThunk(
  'order/customer',
  async (customer, { rejectWithValue }) => {
    try {
      const res = await api.get(`/orders?seller=${customer}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const processOrder = createAsyncThunk(
  'order/process',
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.put(`/orders/${id}`, {
        order_status: 'processed'
      })

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  listOrders: [],
  loading: true
}

export const cartSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  extraReducers: builder => {
    builder.addCase(getListOfOrdersBySellerId.fulfilled, (state, { payload }) => {
      state.listOrders = payload
      state.loading = false
    })

    builder.addCase(getListOfOrdersByCustomerId.fulfilled, (state, { payload }) => {
      state.listOrders = payload
      state.loading = false
    })

    builder.addCase(processOrder.fulfilled, (state, { payload }) => {
      state.loading = false
    })
  }
})

export default cartSlice.reducer
