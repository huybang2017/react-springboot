import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getShoeSizeAPI,
  getShoeSizesAPI,
  postShoeSizeAPI,
  putShoeSizeAPI,
  deleteShoeSizeAPI,
} from '../../apis/productAPI/ShoeSize'
import AxiosAdmin from '../../apis/AxiosAdmin'
import AxiosClient from '../../apis/AxiosClient'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const getShoeSizesApiThunk = createAsyncThunk(
  'shoeSizes/getShoeSizesApiThunk',
  async (shoeId) => {
    const response = await AxiosAdmin.get(
      `${import.meta.env.VITE_API_URL}/ShoeSize/${shoeId}`,
    )
    return response.data
  },
)

export const getAllShoeSizesByUser = createAsyncThunk(
  'shoeSizes/getAllShoeSizes',
  async () => {
    const response = await AxiosClient.get('/Shoe/CommonUser/sizeFilter')
    return response.data
  },
)
export const getShoeSizeApiThunk = createAsyncThunk(
  'shoeSizes/getShoeSizeApiThunk',
  async (id) => {
    const response = await getShoeSizeAPI(id)
    return response.data
  },
)

export const postShoeSizeApiThunk = createAsyncThunk(
  'shoeSizes/postShoeSizeApiThunk',
  async (shoeSize) => {
    const response = await postShoeSizeAPI(shoeSize)
    return response.data
  },
)

export const putShoeSizeApiThunk = createAsyncThunk(
  'shoeSizes/putShoeSizeApiThunk',
  async (shoeSize) => {
    const response = await putShoeSizeAPI(shoeSize)
    return response.data
  },
)

export const deleteShoeSizeApiThunk = createAsyncThunk(
  'shoeSizes/deleteShoeSizeApiThunk',
  async (id) => {
    const response = await deleteShoeSizeAPI(id)
    return response.data
  },
)

const ShoeSizeSlice = createSlice({
  name: 'shoeSizeSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShoeSizesApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoeSizesApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoeSizesApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(postShoeSizeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postShoeSizeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data.push(action.payload)
      })
      .addCase(postShoeSizeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getShoeSizeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoeSizeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoeSizeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(putShoeSizeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(putShoeSizeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(putShoeSizeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteShoeSizeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteShoeSizeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.filter((data) => data.id !== action.payload)
      })
      .addCase(deleteShoeSizeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getAllShoeSizesByUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllShoeSizesByUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getAllShoeSizesByUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { actions, reducer } = ShoeSizeSlice
export default reducer
