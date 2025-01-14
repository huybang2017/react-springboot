import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginByAdmin, loginByUser } from '../../apis/auth/Login'
import { LoginGoogle } from '../../apis/auth/LoginGoogle'

const initialState = {
  id: null,
  email: null,
  role: null,
  token: null,
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
}

export const loginByAdminThunk = createAsyncThunk(
  'loginByAdmin/loginByAdminThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginByAdmin(payload)
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

export const loginByUserThunk = createAsyncThunk(
  'loginByUser/loginByUserThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginByUser(payload)
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

export const loginGoogleThunk = createAsyncThunk(
  'loginGoogle/loginGoogleThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await LoginGoogle()
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

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null
      state.email = null
      state.role = null
      state.token = null
      sessionStorage.removeItem('email')
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('refreshToken')
    },
    resetState: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByAdminThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginByAdminThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.email = action.payload.email
        state.token = action.payload.token
        state.role = action.payload.role
        state.refreshToken = action.payload.refreshToken
        sessionStorage.setItem('email', JSON.stringify(action.payload.email))
        sessionStorage.setItem('role', JSON.stringify(action.payload.role))
        sessionStorage.setItem('token', action.payload.token)
        sessionStorage.setItem('id', JSON.stringify(action.payload.id))
        sessionStorage.setItem(
          'refreshToken',
          JSON.stringify(action.payload.refreshToken),
        )
        if (action.payload.role === 'Admin') {
          window.location.href = '/dashboard'
        }
      })
      .addCase(loginByAdminThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(loginByUserThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginByUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload.code === 8) {
          state.error = action.payload.detailMessage
        }
        state.email = action.payload.email
        state.token = action.payload.token
        state.role = action.payload.role
        state.id = action.payload.id
        sessionStorage.setItem('email', JSON.stringify(action.payload.email))
        sessionStorage.setItem('role', JSON.stringify(action.payload.role))
        sessionStorage.setItem('token', action.payload.token)
        sessionStorage.setItem('id', JSON.stringify(action.payload.id))
        if (action.payload.role === 'User') {
          window.location.href = '/'
        }
      })
      .addCase(loginByUserThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(loginGoogleThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginGoogleThunk.fulfilled, (state, action) => {
        state.status = 'succeededLoginGoogleThunk'
        state.data = action.payload
      })
      .addCase(loginGoogleThunk.rejected, (state, action) => {
        state.status = 'failedLoginGoogleThunk'
        state.error = action.payload
      })
  },
})

export const { logout, resetState } = LoginSlice.actions

export default LoginSlice.reducer
