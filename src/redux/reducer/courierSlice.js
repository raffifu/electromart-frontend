import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'

export const getAllCourier = createAsyncThunk(
  'courier/all',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.get('/couriers')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  })

const initialState = {
  listCouriers: [],
  cost: 0,
  loading: true
}

export const courierSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: builder => {
    builder.addCase(getAllCourier.fulfilled, (state, { payload }) => {
      state.listCouriers = payload
      state.loading = false
    })
  }
})

export default courierSlice.reducer
