import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getShoeTypesNoPageAPI,
  getShoeTypesAPI,
  getShoeTypeAPI,
  postShoeTypeAPI,
  putShoeTypeAPI,
  deleteShoeTypeAPI,
} from '../../apis/productAPI/ShoeType' // Adjust the import according to your file structure
import AxiosAdmin from '../../apis/AxiosAdmin'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

// Async thunks
export const getShoeTypesNoPageApiThunk = createAsyncThunk(
  'brands/getShoeTypesNoPageApiThunk',
  async () => {
    const response = await getShoeTypesNoPageAPI()
    return response.data
  },
)

export const getShoeTypesApiThunk = createAsyncThunk(
  'shoeTypes/getShoeTypesApiThunk',
  async ({ pageSize, pageNumber, sort, search }, { rejectWithValue }) => {
    try {
      const response = await getShoeTypesAPI(pageSize, pageNumber, sort, search)
      return response.data // Return the data from the API response
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  },
)

export const getShoeTypeApiThunk = createAsyncThunk(
  'shoeTypes/getShoeTypeApiThunk',
  async (id) => {
    const response = await getShoeTypeAPI(id)
    return response.data
  },
)

export const postShoeTypeApiThunk = createAsyncThunk(
  'shoeTypes/postShoeTypeApiThunk',
  async (values, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.post(
        `${import.meta.env.VITE_API_URL}/ShoeType`,
        values,
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  },
)

export const putShoeTypeApiThunk = createAsyncThunk(
  'shoeTypes/putShoeTypeApiThunk',
  async (values) => {
    const response = await AxiosAdmin.patch(
      `${import.meta.env.VITE_API_URL}/ShoeType`,
      values,
    )
    return response.data
  },
)

export const deleteShoeTypeApiThunk = createAsyncThunk(
  'shoeTypes/deleteShoeTypeApiThunk',
  async (id) => {
    const response = await AxiosAdmin.delete(
      `${import.meta.env.VITE_API_URL}/ShoeType/${id}`,
    )
    return response.data
  },
)

// Slice
const shoeTypeSlice = createSlice({
  name: 'shoeTypes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoeTypesNoPageApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoeTypesNoPageApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoeTypesNoPageApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getShoeTypesApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoeTypesApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoeTypesApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getShoeTypeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoeTypeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(getShoeTypeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(postShoeTypeApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postShoeTypeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = new Array(state.data).push(action.payload)
      })
      .addCase(postShoeTypeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(putShoeTypeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(putShoeTypeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = Array(state.data).push(action.payload)
      })
      .addCase(putShoeTypeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteShoeTypeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteShoeTypeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = Array(state.data).filter(
          (data) => data.id !== action.meta.arg,
        )
      })
      .addCase(deleteShoeTypeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { actions, reducer } = shoeTypeSlice
export default reducer
