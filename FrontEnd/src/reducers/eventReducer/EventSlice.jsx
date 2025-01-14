import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AxiosAdmin from '../../apis/AxiosAdmin'
import AxiosClient from '../../apis/AxiosClient'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (query, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.get(
        `${import.meta.env.VITE_API_URL}/Event/Admin?${query}`,
      )
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.message)
    }
  },
)

export const getCurrentEvent = createAsyncThunk(
  'events/getCurrentEvent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosClient.get(
        `${import.meta.env.VITE_API_URL}/Event/Current`,
      )
      return response.data
    } catch (error) {
      console.error(error)
      return rejectWithValue(error.message)
    }
  },
)

export const addEvents = createAsyncThunk(
  'events/addEvents',
  async (newEvent) => {
    try {
      const response = await AxiosAdmin.post(
        `${import.meta.env.VITE_API_URL}/Event`,
        newEvent,
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)

export const updateEvents = createAsyncThunk(
  'events/updateEvents',
  async (updatedEvent) => {
    try {
      const response = await AxiosAdmin.patch(
        `${import.meta.env.VITE_API_URL}/Event`,
        updatedEvent,
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addEvents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = Array(state.data).push(action.payload)
      })
      .addCase(addEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateEvents.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'

        const updatedEvent = action.payload
        state.data = Array(state.data).map((event) =>
          event.eventId === updatedEvent.eventId ? updatedEvent : event,
        )
      })
      .addCase(updateEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getCurrentEvent.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCurrentEvent.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getCurrentEvent.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default eventSlice.reducer
