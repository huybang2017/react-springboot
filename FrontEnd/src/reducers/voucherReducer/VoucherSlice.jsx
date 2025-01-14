import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AxiosAdmin from '../../apis/AxiosAdmin'
import {
  GetAllVochersClientAPI,
  GetVoucherByCodeAPI,
} from '../../apis/vouchers/GetAllVouchers'

export const fetchVouchers = createAsyncThunk(
  'voucher/fetchVouchers',
  async (query) => {
    const response = await AxiosAdmin.get(
      `${import.meta.env.VITE_API_URL}/Voucher/Admin?${query}`,
    )
    return response.data
  },
)

export const addVoucher = createAsyncThunk(
  'voucher/addVoucher',
  async (newVoucher) => {
    const response = await AxiosAdmin.post(
      `${import.meta.env.VITE_API_URL}/Voucher`,
      newVoucher,
    )
    return response.data
  },
)

export const deleteVoucher = createAsyncThunk(
  'voucher/deleteVoucher',
  async (id) => {
    await AxiosAdmin.delete(`${import.meta.env.VITE_API_URL}/Voucher/${id}`)
    return id
  },
)

export const editVoucher = createAsyncThunk(
  'voucher/editVoucher',
  async (updatedVoucher) => {
    const response = await AxiosAdmin.patch(
      `${import.meta.env.VITE_API_URL}/Voucher`,
      updatedVoucher,
    )

    return response.data
  },
)

export const getVouchersClientApiThunk = createAsyncThunk(
  'voucher/getVouchersClientApiThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllVochersClientAPI()
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.message)
    }
  },
)

export const getVoucherByCodeApiThunk = createAsyncThunk(
  'voucher/getVoucherByCodeApiThunk',
  async (code, { rejectWithValue }) => {
    try {
      const response = await GetVoucherByCodeAPI(code)
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.message)
    }
  },
)

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

const voucherSlice = createSlice({
  name: 'vouchers',
  initialState,
  reducers: {
    resetStateVoucher: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addVoucher.fulfilled, (state, action) => {
        state.data.content.push(action.payload)
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (voucher) => voucher.id !== action.payload,
        )
      })
      .addCase(editVoucher.fulfilled, (state, action) => {
        const index = Array(state.data).findIndex(
          (voucher) => voucher.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(getVouchersClientApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getVouchersClientApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getVouchersClientApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getVoucherByCodeApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getVoucherByCodeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededGetVoucherByCodeApiThunk'
        state.data = action.payload
      })
      .addCase(getVoucherByCodeApiThunk.rejected, (state, action) => {
        state.status = 'failedGetVoucherByCodeApiThunk'
        state.error = action.payload
      })
  },
})
export const { resetStateVoucher } = voucherSlice.actions
export default voucherSlice.reducer
