import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { registerUser } from '../../apis/auth/Register'

const initialState = {
  data: [],
  token: null,
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
}

export const registerUserThunk = createAsyncThunk(
  'register/registerUserThunk',
  async (payload, { rejectWithValue }) => {
    try {
      if (payload.confirmPassword !== payload.password) {
        return rejectWithValue('Passwords do not match')
      }
      const formData = new FormData()
      formData.append('email', payload.email)
      formData.append('password', payload.password)

      const response = await registerUser(formData)
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

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Redirect user based on role
        if (action.payload) {
          window.location.href = '/login'
        }
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default registerSlice.reducer
