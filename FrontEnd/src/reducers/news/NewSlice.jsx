import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getNewsByAdminAPI,
  getNewsByUserAPI,
  getDetailNewByAdminAPI,
  getDetailNewByUserAPI,
  getHotNewsAPI,
  postNewAPI,
  updateNewAPI,
} from '../../apis/news/NewApi'
import AxiosAdmin from '../../apis/AxiosAdmin'

const initialState = {
  data: [],
  hotNews: null,
  detailNew: null,
  status: 'idle',
  error: null,
  editId: null,
}

export const getNewsByAdmin = createAsyncThunk(
  'news/getNewsByAdminThunk',
  async (query, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.get(`/News/Admin?${query}`)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch news by admin',
      )
    }
  },
)

export const getNewsByUser = createAsyncThunk(
  'news/getNewsByUserThunk',
  async (query, { rejectWithValue }) => {
    try {
      const response = await getNewsByUserAPI(query)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch news by user',
      )
    }
  },
)

export const getNewByAdmin = createAsyncThunk(
  'news/getNewByAdminThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getDetailNewByAdminAPI(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch news details by admin',
      )
    }
  },
)

export const getNewByUser = createAsyncThunk(
  'news/getNewByUserThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getDetailNewByUserAPI(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Failed to fetch news details by user',
      )
    }
  },
)

export const getHotNews = createAsyncThunk(
  'news/getHotNews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHotNewsAPI()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch hot news')
    }
  },
)

export const postNew = createAsyncThunk(
  'news/postNewThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.post('/News', payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to post news')
    }
  },
)

export const udpateNew = createAsyncThunk(
  'news/udpateNewThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await updateNewAPI(payload)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update news')
    }
  },
)

const newSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload
    },
    clearEditId: (state) => {
      state.editId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsByAdmin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getNewsByAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getNewsByAdmin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getNewsByUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getNewsByUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getNewsByUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Handle getNewByAdmin
      .addCase(getNewByAdmin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getNewByAdmin.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getNewByAdmin.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Handle getNewByUser
      .addCase(getNewByUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getNewByUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.detailNew = action.payload
      })
      .addCase(getNewByUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Handle getHotNews
      .addCase(getHotNews.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getHotNews.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.hotNews = action.payload
      })
      .addCase(getHotNews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Handle postNew
      .addCase(postNew.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(postNew.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = [...state.data, action.payload]
      })
      .addCase(postNew.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Handle updateNew
      .addCase(udpateNew.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(udpateNew.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const updatedData = state.data.map((newsItem) =>
          newsItem.id === action.payload.id ? action.payload : newsItem,
        )
        state.data = updatedData
      })
      .addCase(udpateNew.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { setEditId, clearEditId } = newSlice.actions

export default newSlice.reducer
