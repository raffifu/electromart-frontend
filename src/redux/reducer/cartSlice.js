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

export const getSellerByIds = createAsyncThunk(
  'cart/sellers',
  async (sellerIds, { rejectWithValue }) => {
    try {
      let queryString = ''
      sellerIds.forEach(sellerId => {
        queryString += `id_in=${sellerId}&`
      })
      const res = await api.get(`/users?${queryString}`)

      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const checkout = createAsyncThunk(
  'cart/checkout',
  async (data, { rejectWithValue }) => {
    try {
      // create payment
      const paymentRes = await api.post('/payments', {
        payment_method: data.payment_method,
        status: 'unpaid',
        total: data.grand_total
      })
      // foreach seller, create order
      for (let i = 0; i < data.sellers.length; i++) {
        const orderRes = await api.post('/orders', {
          total_price: data.sellers[i].total_price,
          shipping_cost: data.sellers[i].shipping_cost,
          user: data.user.id,
          seller: data.sellers[i].id,
          customer_address: data.user.address,
          payment: paymentRes.data.id
        })

        for (let j = 0; j < data.sellers[i].products.length; j++) {
          await api.post('/order-details', {
            order: orderRes.data.id,
            product: data.sellers[i].products[j].id
          })
        }
      }

      // delete user cart
      for (let i = 0; i < data.cart.length; i++) {
        await api.delete(`/carts/${data.cart[i]}`)
      }

      return paymentRes.data
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
  listCarts: [],
  currentCart: {
    id: '',
    product: null,
    users_permissions_user: null,
    quantity: 0
  },
  sellerList: [],
  paymentId: null,
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

    builder.addCase(getSellerByIds.fulfilled, (state, { payload }) => {
      state.sellerList = payload
      state.loading = false
    })

    builder.addCase(checkout.fulfilled, (state, { payload }) => {
      state.currentCart = []
      state.sellerList = []
      state.paymentId = payload.id
      state.loading = false
    })
  }
})

export default cartSlice.reducer
