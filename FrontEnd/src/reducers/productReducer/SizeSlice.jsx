import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSizeMenu } from '../../apis/productAPI/Size'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const getSizeMenuThunk = createAsyncThunk(
  'sizeMenu/getSizeMenuThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSizeMenu() // Phải thêm await để chờ kết quả trả về từ API
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSizeMenuThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getSizeMenuThunk.fulfilled, (state, action) => {
        state.status = 'succeededGetSizeMenuThunk'
        state.data = action.payload
        state.error = null
      })
      .addCase(getSizeMenuThunk.rejected, (state, action) => {
        state.status = 'failedGetSizeMenuThunk'
        state.error = action.payload
      })
  },
})

export default sizeSlice.reducer
