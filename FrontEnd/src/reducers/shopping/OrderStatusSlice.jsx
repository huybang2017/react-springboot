import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createOrderStatusCartByAdmin,
  createOrderStatusCartByUser,
} from '../../apis/shopping/OrderStatusAPI'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const postOrderStatusByAdminApiThunk = createAsyncThunk(
  'orderStatus/postOrderStatusByAdminApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('orderId', payload.id)
      formData.append('idStatus', payload.idStatus)
      const response = await createOrderStatusCartByAdmin(formData)
      return response.data
    } catch (error) {
      console.error('Failed to post order status by admin: ', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

export const postOrderStatusByUserApiThunk = createAsyncThunk(
  'orderStatus/postOrderStatusByUserApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('orderId', payload.orderId)
      formData.append('idStatus', payload.idStatus)
      const response = await createOrderStatusCartByUser(formData)
      return response
    } catch (error) {
      console.error('Failed to post order status by user: ', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const orderStatusSlice = createSlice({
  name: 'orderStatus',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderStatusByAdminApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postOrderStatusByAdminApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededPostOrderStatusByAdminApiThunk'
        state.data = action.payload
      })
      .addCase(postOrderStatusByAdminApiThunk.rejected, (state, action) => {
        state.status = 'failedPostOrderStatusByAdminApiThunk'
        state.error = action.payload
      })
      .addCase(postOrderStatusByUserApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postOrderStatusByUserApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededPostOrderStatusByUserApiThunk'
        state.data = action.payload
      })
      .addCase(postOrderStatusByUserApiThunk.rejected, (state, action) => {
        state.status = 'failedPostOrderStatusByUserApiThunk'
        state.error = action.payload
      })
  },
})
export const { resetStatus } = orderStatusSlice.actions
export default orderStatusSlice.reducer
