import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getFeedbacksAPI,
  getFeedbackByIdAPI,
  createFeedbackAPI,
  deleteFeedbackAPI,
} from '../../apis/other/Feedback' // Adjust import paths as necessary

const initialState = {
  data: null,
  status: 'idle',
  error: null,
}

// Fetch all feedbacks with additional filter parameters
export const getFeedbacksApiThunk = createAsyncThunk(
  'feedbacks/getAll',
  async (
    { pageSize, pageNumber, sort, search, isChecked, from, to },
    { rejectWithValue },
  ) => {
    try {
      const params = {
        pageSize,
        pageNumber,
        sort,
        search,
        isChecked,
        from,
        to,
      }

      const response = await getFeedbacksAPI(params)
      return response
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

// Fetch feedback by ID
export const getFeedbackByIdApiThunk = createAsyncThunk(
  'feedbacks/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getFeedbackByIdAPI(id)
      return response
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

// Create a new feedback
export const createFeedbackApiThunk = createAsyncThunk(
  'feedbacks/create',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('orderId', payload.orderId)
      formData.append('title', payload.title)
      formData.append('content', payload.content)
      payload.files.forEach((file, index) => {
        formData.append(`multipartFileList[${index}]`, file)
      })
      const response = await createFeedbackAPI(formData)
      return response
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

// Delete feedback by ID
export const deleteFeedbackApiThunk = createAsyncThunk(
  'feedbacks/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteFeedbackAPI(id)
      return id
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)
const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    clearFeedbacks: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbacksApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getFeedbacksApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload // Ensure this structure matches your API response
      })
      .addCase(getFeedbacksApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(getFeedbackByIdApiThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getFeedbackByIdApiThunk.fulfilled, (state, action) => {
        state.loading = false
        state.feedbackDetails = action.payload.feedbackDetails
        state.feedbackImages = action.payload.feedbackImages
      })
      .addCase(getFeedbackByIdApiThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createFeedbackApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(createFeedbackApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededCreateFeedbackApiThunk'
        state.data = action.payload
      })
      .addCase(createFeedbackApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to submit feedback'
      })
      .addCase(deleteFeedbackApiThunk.fulfilled, (state, action) => {
        if (state.data && state.data.content) {
          state.data.content = state.data.content.filter(
            (feedback) => feedback.id !== action.payload,
          )
        }
      })
      .addCase(deleteFeedbackApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})
export const { clearFeedbacks } = feedbackSlice.actions
export default feedbackSlice.reducer
