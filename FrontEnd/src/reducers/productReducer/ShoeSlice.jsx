import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getShoesAPI,
  getShoeAPI,
  postShoeAPI,
  putShoeAPI,
  deleteShoeAPI,
  getShoesAdminAPI,
  getShoesForHomeAPI,
} from '../../apis/productAPI/Shoe'

const initialState = {
  data: {},
  dataForHome: {},
  status: 'idle',
  error: null,
  paramSearch: '',
  paramFilterBrand: null,
}

export const getShoesApiThunk = createAsyncThunk(
  'shoes/getShoes', // Action type
  async (params, { rejectWithValue }) => {
    try {
      let search = params.search

      const response = await getShoesAPI(
        params.pageSize,
        params.pageNumber,
        params.sort,
        params.minPrice,
        search,
        params.maxPrice,
        params.brandId,
        params.shoeTypeId,
        params.size,
        params.listShoeColorId,
      )
      return response.data // Ensure you return the data property
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const getShoesAdminApiThunk = createAsyncThunk(
  'shoes/getShoesAdmin', // Action type
  async (
    {
      pageNumber,
      pageSize,
      sort,
      status,
      brandId,
      shoeTypeId,
      priority,
      search,
      minCreateDate,
      maxCreateDate,
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await getShoesAdminAPI(
        pageNumber,
        pageSize,
        sort,
        status,
        brandId,
        shoeTypeId,
        priority,
        search,
        minCreateDate,
        maxCreateDate,
      )
      return response.data // Ensure you return the data property
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const getShoeApiThunk = createAsyncThunk(
  'shoes/getShoeApiThunk',
  async (id) => {
    const response = await getShoeAPI(id)
    return response.data
  },
)

export const getShoesFormHomeThunk = createAsyncThunk(
  'shoes/getShoesFormHomeThunk',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getShoesForHomeAPI(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const postShoeApiThunk = createAsyncThunk(
  'shoes/postShoeApiThunk',
  async (shoe) => {
    const response = await postShoeAPI(shoe)
    return response.data
  },
)

export const putShoeApiThunk = createAsyncThunk(
  'shoes/putShoeApiThunk',
  async (shoe) => {
    const response = await putShoeAPI(shoe)
    return response.data
  },
)

export const deleteShoeApiThunk = createAsyncThunk(
  'shoes/deleteShoeApiThunk',
  async (id) => {
    const response = await deleteShoeAPI(id)
    return response.data
  },
)

const ShoeSlice = createSlice({
  name: 'shoeSlice',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.paramSearch = action.payload
    },
    setFilter(state, action) {
      state.paramFilterBrand = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShoesApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoesApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoesApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getShoesAdminApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoesAdminApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoesAdminApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(postShoeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(postShoeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = [...state.data, action.payload]
      })
      .addCase(postShoeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getShoeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShoeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getShoeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(putShoeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(putShoeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.data.findIndex(
          (data) => data.id === action.payload.id,
        )
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
      .addCase(putShoeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteShoeApiThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteShoeApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = state.data.filter((data) => data.id !== action.payload)
      })
      .addCase(deleteShoeApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getShoesFormHomeThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getShoesFormHomeThunk.fulfilled, (state, action) => {
        state.status = 'succeededGetShoesFormHomeThunk'
        state.dataForHome = action.payload
      })
      .addCase(getShoesFormHomeThunk.rejected, (state, action) => {
        state.status = 'failedGetShoesFormHomeThunk'
        state.error = action.payload || 'An error occurred while fetching shoes'
      })
  },
})

export const { setSearch, setFilter } = ShoeSlice.actions
export default ShoeSlice.reducer
