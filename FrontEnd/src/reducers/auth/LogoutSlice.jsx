import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LogoutAPI } from '../../apis/auth/Logout.jsx' // Đảm bảo bạn có API logout
export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUserThunk',
  async (_, { rejectWithValue }) => {
    try {
      const TOKEN_ACCESS = sessionStorage.getItem('refreshToken')
      const formData = new FormData()
      if (!TOKEN_ACCESS) {
        return
      } else {
        formData.append('refreshToken', TOKEN_ACCESS)
      }
      await LogoutAPI(formData)
      return true
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)
const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.status = 'idle'
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.status = 'succeededLogoutUserThunk'
        state.error = null
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('refreshToken')
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.status = 'failedLogoutUserThunk'
        state.error = action.payload
      })
  },
})

export const { resetState } = logoutSlice.actions
export default logoutSlice.reducer
