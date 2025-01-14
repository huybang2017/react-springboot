import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import AxiosAdmin from '../../apis/AxiosAdmin.jsx'
import { getColorsNoPageAPI } from '../../apis/productAPI/Color.jsx'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

// Async thunks
export const getColorsNoPageApiThunk = createAsyncThunk(
  'colors/getColorsNoPageApiThunk',
  async () => {
    const response = await getColorsNoPageAPI()
    return response.data
  },
)

export const getColorsApiThunk = createAsyncThunk(
  'colors/getColorsApiThunk',
  async (query, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.get(
        `${import.meta.env.VITE_API_URL}/Color?${query}`,
      )

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      )
    }
  },
)

export const getColorApiThunk = createAsyncThunk(
  'colors/getColorApiThunk',
  async (id) => {
    const response = await getColorAPI(id)
    return response.data
  },
)

export const postColorApiThunk = createAsyncThunk(
  'colors/postColorApiThunk',
  async (color) => {
    const response = await AxiosAdmin.post(
      `${import.meta.env.VITE_API_URL}/Color`,
      color,
    )
    return response.data
  },
)

export const putColorApiThunk = createAsyncThunk(
  'colors/putColorApiThunk',
  async (color) => {
    const response = await AxiosAdmin.patch(
      `${import.meta.env.VITE_API_URL}/Color`,
      color,
    )
    return response.data
  },
)

export const deleteColorApiThunk = createAsyncThunk(
  'colors/deleteColorApiThunk',
  async (id) => {
    const response = await AxiosAdmin.delete(
      `${import.meta.env.VITE_API_URL}/Color/${id}`,
    )
    return response.data
  },
)

// Slice
const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColorsNoPageApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getColorsNoPageApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getColorsNoPageApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getColorsApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getColorsApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getColorsApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getColorApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getColorApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.map((color) =>
          color.id === action.payload.id ? action.payload : color,
        )
      })
      .addCase(getColorApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(postColorApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postColorApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = Array(state.data).push(action.payload)
      })
      .addCase(postColorApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(putColorApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(putColorApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.data = Array(state.data).map((color) =>
          color.id === action.payload.id ? action.payload : color,
        )
      })
      .addCase(putColorApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteColorApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(deleteColorApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = Array(state.data).filter(
          (color) => color.id !== action.meta.arg,
        )
      })
      .addCase(deleteColorApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default colorSlice.reducer
