import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getAccountsAPI,
  getAccountAndUserInformationByIdAPI,
  updateAccountInformationUserAPI,
  getTokenUdpatePasswordAPI,
  updatePasswordAPI,
  getTokenUpdateEmailAPI,
  updateEmailAPI,
  checkEmailAPI,
} from '../../apis/user/Account.jsx'
import { RefreshTokenAPI } from '../../apis/auth/RefreshToken.jsx'
import AxiosAdmin from '../../apis/AxiosAdmin.jsx'
import { GetKeyPassword } from '../../apis/auth/GetKeyPassword.jsx'
import { ResetPassword } from '../../apis/auth/ResetPassword.jsx'

const initialState = {
  data: [],
  accountDetail: null,
  checkEmail: false,
  status: 'idle',
  error: null,
}

export const getAccountsApiThunk = createAsyncThunk(
  'getAccountsAPI/getAccountsApiThunk',
  async ({ pageSize, pageNumber, sort, search }, { rejectWithValue }) => {
    try {
      const response = await getAccountsAPI(pageSize, pageNumber, sort, search)
      return response.data
    } catch (error) {
      // Check if the error response exists and has data, otherwise return the error message
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export const getAccountAndUserInformationByIdApiThunk = createAsyncThunk(
  'getAccountAndUserInformationAPI/getAccountAndUserInformationByIdApiThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getAccountAndUserInformationByIdAPI(id)
      return response.data
    } catch (error) {
      // Check if the error response exists and has data, otherwise return the error message
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

export const updateAccountInformationUserApiThunk = createAsyncThunk(
  'updateAccountInformationAPI/updateAccountInformationUserApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()

      if (payload.accountId) formData.append('accountId', payload.accountId)
      if (payload.address) formData.append('address', payload.address)
      if (payload.fullname) formData.append('fullname', payload.fullname)
      if (payload.gender) formData.append('gender', payload.gender)
      if (payload.email) formData.append('email', payload.email)
      if (payload.birthday) formData.append('birthday', payload.birthday)
      if (payload.phoneNumber) formData.append('phone', payload.phoneNumber)
      const response = await updateAccountInformationUserAPI(formData)
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

export const getTokenUpdatePasswordApiThunk = createAsyncThunk(
  'getTokenUpdatePasswordAPI/getTokenUpdatePasswordApiThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTokenUdpatePasswordAPI()
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

export const updatePasswordApiThunk = createAsyncThunk(
  'updatePasswordAPI/updatePasswordApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('token', payload.tokenUpdatePassword)
      formData.append('newPassword', payload.newPassword)
      formData.append('oldPassword', payload.oldPassword)
      const response = await updatePasswordAPI(formData)
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

export const getTokenUpdateEmailApiThunk = createAsyncThunk(
  'getTokenUpdateEmailAPI/getTokenUpdateEmailApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getTokenUpdateEmailAPI(payload.newEmail)
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

export const updateEmailApiThunk = createAsyncThunk(
  'updateEmailAPI/updateEmailApiThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('token', payload.tokenUpdateEmail)
      formData.append('newEmail', payload.newEmail)
      const response = await updateEmailAPI(formData)
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

export const putAccountApiThunk = createAsyncThunk(
  'putAccountAPI/putAccountApiThunk',
  async (account, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.patch('/Account/ChangeStatus', account)
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

export const checkEmailApiThunk = createAsyncThunk(
  'checkEmailAPI/checkEmailApiThunk',
  async (email, { rejectWithValue }) => {
    try {
      const response = await checkEmailAPI(email)
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

export const refreshTokenApiThunk = createAsyncThunk(
  'refreshTokenAPI/refreshTokenApiThunk',
  async (_, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('refreshToken', sessionStorage.getItem('refreshToken'))
      const response = await RefreshTokenAPI(formData)
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

export const getTokenForgetPasswordThunk = createAsyncThunk(
  'getTokenForGetPasswordAPI/getTokenForGetPasswordThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await GetKeyPassword(payload)
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

export const resetPasswordThunk = createAsyncThunk(
  'resetPasswordAPI/resetPasswordThunk',
  async (payload, { rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append('email', payload.email)
      formData.append('token', payload.token)
      formData.append('newPassword', payload.newPassword)
      const response = await ResetPassword(formData)
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

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    resetStateAccount: () => {
      return initialState
    },
    resetStateCheckEmail: (state) => {
      if (state.checkEmail !== null) {
        state.checkEmail = null
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountsApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getAccountsApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(getAccountsApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(putAccountApiThunk.pending, (state) => {
        state.status = 'loadingPutAccountApiThunk'
        state.error = null
      })
      .addCase(putAccountApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededPutAccountApiThunk'
        if (Array.isArray(state.data)) {
          state.data = state.data.map((account) =>
            account.id === action.payload.id ? action.payload : account,
          )
        }
      })
      .addCase(putAccountApiThunk.rejected, (state, action) => {
        state.status = 'failedPutAccountApiThunk'
        state.error = action.payload
      })
      .addCase(getAccountAndUserInformationByIdApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        getAccountAndUserInformationByIdApiThunk.fulfilled,
        (state, action) => {
          state.status = 'succeeded'
          state.accountDetail = action.payload
        },
      )
      .addCase(
        getAccountAndUserInformationByIdApiThunk.rejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload
        },
      )
      .addCase(updateAccountInformationUserApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(
        updateAccountInformationUserApiThunk.fulfilled,
        (state, action) => {
          state.status = 'succeededUpdateAccountInformationUserApiThunk'
          // Optionally update the accountDetail if needed
          state.accountDetail = {
            ...state.accountDetail,
            ...action.payload.data,
          }
        },
      )
      .addCase(
        updateAccountInformationUserApiThunk.rejected,
        (state, action) => {
          state.status = 'failed'
          state.error = action.payload
        },
      )
      .addCase(getTokenUpdatePasswordApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getTokenUpdatePasswordApiThunk.fulfilled, (state) => {
        state.status = 'succeededGetTokenUpdatePassword'
      })
      .addCase(getTokenUpdatePasswordApiThunk.rejected, (state, action) => {
        state.status = 'failedGetTokenUpdatePassword'
        state.error = action.payload
      })
      .addCase(getTokenUpdateEmailApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getTokenUpdateEmailApiThunk.fulfilled, (state) => {
        state.status = 'succeededGetTokenUpdateEmail'
      })
      .addCase(getTokenUpdateEmailApiThunk.rejected, (state, action) => {
        state.status = 'failedGetTokenUpdateEmail'
        state.error = action.payload
      })
      .addCase(updatePasswordApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updatePasswordApiThunk.fulfilled, (state) => {
        state.status = 'succeededUpdatePassword'
      })
      .addCase(updatePasswordApiThunk.rejected, (state, action) => {
        state.status = 'failedUpdatePassword'
        state.error = action.payload
      })
      .addCase(updateEmailApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateEmailApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededUpdateEmail'
        sessionStorage.setItem('email', action.payload.email)
        sessionStorage.setItem('token', action.payload.newToken)
        state.accountDetail = action.payload
      })
      .addCase(updateEmailApiThunk.rejected, (state, action) => {
        state.status = 'failedUpdateEmail'
        state.error = action.payload
      })
      .addCase(checkEmailApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(checkEmailApiThunk.fulfilled, (state, action) => {
        state.status = 'succeededCheckEmail'
        state.checkEmail = action.payload
      })
      .addCase(checkEmailApiThunk.rejected, (state, action) => {
        state.status = 'failedCheckEmail'
        state.error = action.payload || 'Failed to check email'
      })
      .addCase(getTokenForgetPasswordThunk.pending, (state) => {
        state.status = 'loadingGetToken'
        state.error = null
      })
      .addCase(getTokenForgetPasswordThunk.fulfilled, (state, action) => {
        state.status = 'succeededGetToken'
      })
      .addCase(getTokenForgetPasswordThunk.rejected, (state, action) => {
        state.status = 'failedGetToken'
        state.error = action.payload || 'Failed to fetch token'
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.status = 'loadingResetPassword'
        state.error = null
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.status = 'succeededResetPassword'
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.status = 'failedResetPassword'
        state.error = action.payload || 'Failed to reset password'
      })
  },
})
export const { resetStateAccount, resetStateCheckEmail } = accountSlice.actions
export default accountSlice.reducer
