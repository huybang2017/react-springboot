import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getShippingFeesAPI,
  getNewestShippingFeesAPI,
  createShippingFeeAPI,
} from '../../apis/shopping/ShippingFeeAPI' // Adjust import paths as necessary

const initialState = {
  data: null,
  status: 'idle',
  error: null,
}

// Fetch all shipping fees with optional pagination and sorting
export const getShippingFeesApiThunk = createAsyncThunk(
  'shippingFees/getShippingFeesApiThunk',
  async ({ pageSize, pageNumber, sort }, { rejectWithValue }) => {
    try {
      const params = {
        pageSize,
        pageNumber,
        sort,
      }

      const response = await getShippingFeesAPI(params)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

// Fetch the newest shipping fees
export const getNewestShippingFeesApiThunk = createAsyncThunk(
  'shippingFees/getNewestShippingFeesApiThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNewestShippingFeesAPI()
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

// Create a new shipping fee
export const createShippingFeeApiThunk = createAsyncThunk(
  'shippingFees/createShippingFeeApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('fee', payload.fee)
      const response = await createShippingFeeAPI(formData)
      return response.data // Ensure this structure matches your API response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  },
)

const shippingFeeSlice = createSlice({
  name: 'shippingFees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShippingFeesApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getShippingFeesApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShippingFeesApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(getNewestShippingFeesApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getNewestShippingFeesApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getNewestShippingFeesApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(createShippingFeeApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createShippingFeeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededCreateShippingFeeApiThunk'
      })
      .addCase(createShippingFeeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default shippingFeeSlice.reducer
