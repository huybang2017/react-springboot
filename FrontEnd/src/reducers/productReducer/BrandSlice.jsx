import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getBrandsNoPageAPI,
  getBrandsAPI,
  getBrandAPI,
  postBrandAPI,
  putBrandAPI,
  deleteBrandAPI,
} from '../../apis/productAPI/Brand.jsx'
import AxiosAdmin from '../../apis/AxiosAdmin'
import AxiosClient from '../../apis/AxiosClient.jsx'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

// Async thunks
export const getBrandsNoPageApiThunk = createAsyncThunk(
  'brands/getBrandsNoPageApiThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosClient.get(
        `${import.meta.env.VITE_API_URL}/Brand/noPaging`,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const getBrandsApiThunk = createAsyncThunk(
  'brands/getBrandsApiThunk',
  async ({ pageSize, pageNumber, sort, search }, { rejectWithValue }) => {
    try {
      const response = await getBrandsAPI(pageSize, pageNumber, sort, search)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export const getBrandApiThunk = createAsyncThunk(
  'brands/getBrandApiThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBrandAPI(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const postBrandApiThunk = createAsyncThunk(
  'brands/postBrandApiThunk',
  async (brand, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.post(
        `${import.meta.env.VITE_API_URL}/Brand`,
        brand,
      )

      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.message)
    }
  },
)

export const putBrandApiThunk = createAsyncThunk(
  'brands/putBrandApiThunk',
  async (brand, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.patch(
        `${import.meta.env.VITE_API_URL}/Brand`,
        brand,
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const deleteBrandApiThunk = createAsyncThunk(
  'brands/deleteBrandApiThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.delete(
        `${import.meta.env.VITE_API_URL}/Brand/${id}`,
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    resetBrand: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrandsNoPageApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getBrandsNoPageApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededGetBrandsNoPageApiThunk'
        state.data = action.payload
      })
      .addCase(getBrandsNoPageApiThunk.rejected, (state, action) => {
        state.status = 'failedGetBrandsNoPageApiThunk'
        state.error = action.payload
      })
      .addCase(getBrandsApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getBrandsApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededGetBrandsApiThunk'
        state.data = action.payload
      })
      .addCase(getBrandsApiThunk.rejected, (state, action) => {
        state.status = 'failedGetBrandsApiThunk'
        state.error = action.payload
      })
      .addCase(getBrandApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getBrandApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.map((brand) =>
          brand.id === action.payload.id ? action.payload : brand,
        )
      })
      .addCase(getBrandApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(postBrandApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postBrandApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'

        if (Array.isArray(state.data)) {
          state.data.push(action.payload)
        } else {
          state.data = new Array(state.data).push(action.payload)
        }
      })

      .addCase(postBrandApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(putBrandApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(putBrandApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = new Array(state.data).push(action.payload)
      })
      .addCase(putBrandApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(deleteBrandApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(deleteBrandApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = new Array(state.data).filter(
          (brand) => brand.brandId === action.payload,
        )
      })
      .addCase(deleteBrandApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { resetBrand } = brandSlice.actions
export default brandSlice.reducer
