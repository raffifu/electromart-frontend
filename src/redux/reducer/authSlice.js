import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../service/api'
import { toast } from 'react-toastify'

export const register = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/local/register', formData)

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

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/local', formData)

      toast.success('Login Berhasil')

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const loadUser = createAsyncThunk(
  'auth/load_user',
  async (_ = null, { rejectWithValue }) => {
    try {
      const res = await api.get('/users/me')

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(loadUser.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true
      state.user = payload
    })

    builder.addCase(register.fulfilled, (state, action) => {
      state.token = action.payload.jwt
      state.user = action.payload.user
      state.isAuthenticated = true
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.jwt
      state.user = action.payload.user
      state.isAuthenticated = true
    })
  }
})

export default authSlice.reducer
