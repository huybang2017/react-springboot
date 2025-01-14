import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getDetailOrderByAdmin,
  getDetailOrderByUser,
  getListOrderByAdmin,
  getListOrderByUser,
  postOrderByAdmin,
  postOrderByUser,
  putOrder,
} from '../../apis/shopping/Order'

export const fetchListOrderByAdmin = createAsyncThunk(
  'order/fetchListOrderByAdmin',
  async (payloadParams, { rejectWithValue }) => {
    try {
      const response = await getListOrderByAdmin(payloadParams)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch list order by admin',
      )
    }
  },
)

export const fetchListOrderByUser = createAsyncThunk(
  'order/fetchListOrderByUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListOrderByUser()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch list order by user',
      )
    }
  },
)

export const fetchDetailOrderByAdmin = createAsyncThunk(
  'order/fetchDetailOrderByAdmin',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getDetailOrderByAdmin(id)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch detail order by admin',
      )
    }
  },
)

export const fetchDetailOrderByUser = createAsyncThunk(
  'order/fetchDetailOrderByUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getDetailOrderByUser(id)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch detail order by user',
      )
    }
  },
)

export const createOrderByAdmin = createAsyncThunk(
  'order/createOrderByAdmin',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postOrderByAdmin(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to add order by admin',
      )
    }
  },
)

export const createOrderByUser = createAsyncThunk(
  'order/createOrderByUser',
  async (payload) => {
    try {
      const formData = new FormData()
      formData.append('accountId', payload.accountId)
      formData.append('type', payload.type)
      formData.append('shippingFee', payload.shippingFee)
      formData.append('note', payload.note)
      formData.append('subtotalPrice', payload.subtotalPrice)
      formData.append('totalPrice', payload.totalPrice)
      if (payload.voucherId) {
        formData.append('voucherId', payload.voucherId)
      }
      payload.listOrderDetail.forEach((item, index) => {
        formData.append(`listOrderDetail[${index}].shoeId`, item.shoeId)
        formData.append(`listOrderDetail[${index}].idSize`, item.idSize)
        formData.append(`listOrderDetail[${index}].unitPrice`, item.unitPrice)
        formData.append(`listOrderDetail[${index}].quantity`, item.quantity)
        formData.append(`listOrderDetail[${index}].total`, item.total)
      })
      const response = await postOrderByUser(formData)
      return response.data
    } catch (error) {
      console.error(error)
    }
  },
)

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await putOrder(id, payload)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to update order by admin',
      )
    }
  },
)

const initialState = {
  orders: [],
  orderDetail: null,
  status: 'idle', // Changed from loading to status
  error: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListOrderByAdmin.pending, (state) => {
        state.status = 'loading' // Changed from loading to status
      })
      .addCase(fetchListOrderByAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded' // Changed from loading to status
        state.orders = action.payload
      })
      .addCase(fetchListOrderByAdmin.rejected, (state, action) => {
        state.status = 'failed' // Changed from loading to status
        state.error = action.payload
      })
      .addCase(fetchListOrderByUser.pending, (state) => {
        state.status = 'loading' // Changed from loading to status
      })
      .addCase(fetchListOrderByUser.fulfilled, (state, action) => {
        state.status = 'succeeded' // Changed from loading to status
        state.orders = action.payload
      })
      .addCase(fetchListOrderByUser.rejected, (state, action) => {
        state.status = 'failed' // Changed from loading to status
        state.error = action.payload
      })
      .addCase(fetchDetailOrderByAdmin.pending, (state) => {
        state.status = 'loading' // Changed from loading to status
      })
      .addCase(fetchDetailOrderByAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded' // Changed from loading to status
        state.orderDetail = action.payload
      })
      .addCase(fetchDetailOrderByAdmin.rejected, (state, action) => {
        state.status = 'failed' // Changed from loading to status
        state.error = action.payload
      })
      .addCase(fetchDetailOrderByUser.pending, (state) => {
        state.status = 'loading' // Changed from loading to status
      })
      .addCase(fetchDetailOrderByUser.fulfilled, (state, action) => {
        state.status = 'succeeded' // Changed from loading to status
        state.orderDetail = action.payload
      })
      .addCase(fetchDetailOrderByUser.rejected, (state, action) => {
        state.status = 'failed' // Changed from loading to status
        state.error = action.payload
      })
      .addCase(createOrderByAdmin.pending, (state) => {
        state.status = 'loading' // Changed from loading to status
      })
      .addCase(createOrderByAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded' // Changed from loading to status
        state.orders.push(action.payload)
      })
      .addCase(createOrderByAdmin.rejected, (state, action) => {
        state.status = 'failed' // Changed from loading to status
        state.error = action.payload
      })
      .addCase(createOrderByUser.pending, (state) => {
        state.status = 'loading' // Changed from loading to status
      })
      .addCase(createOrderByUser.fulfilled, (state, action) => {
        state.status = 'succeededCreateOrderByUser' // Changed from loading to status
        state.data = action.payload
      })
      .addCase(createOrderByUser.rejected, (state, action) => {
        state.status = 'failedCreateOrderByUser' // Changed from loading to status
        state.error = action.payload
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading' // Changed from loading to status
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = 'succeeded' // Changed from loading to status
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id,
        )
        if (index !== -1) {
          state.orders[index] = action.payload
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = 'failed' // Changed from loading to status
        state.error = action.payload
      })
  },
})

export default orderSlice.reducer
