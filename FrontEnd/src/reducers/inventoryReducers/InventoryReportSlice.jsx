import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getInventoryReportsAPI,
  getInventoryReportByIdAPI,
  updateInventoryReportAPI,
} from '../../apis/inventoryAPIs/InventoryReportAPI' // Adjust import paths as necessary
import AxiosAdmin from '../../apis/AxiosAdmin'

const initialState = {
  data: null,
  reportDetails: null,
  status: 'idle',
  error: null,
}

// Fetch all inventory reports with additional filter parameters
export const getInventoryReportsApiThunk = createAsyncThunk(
  'inventoryReports/getInventoryReportsApiThunk',
  async (
    { pageSize, pageNumber, sort, from, to, search, status },
    { rejectWithValue },
  ) => {
    try {
      const params = {
        pageSize,
        pageNumber,
        sort,
        from,
        to,
        search,
        status, // Include status in API parameters
      }

      const response = await getInventoryReportsAPI(params)
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

// Fetch inventory report by ID
export const getInventoryReportByIdApiThunk = createAsyncThunk(
  'inventoryReports/getInventoryReportByIdApiThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getInventoryReportByIdAPI(id)
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

// Create a new inventory report
export const createInventoryReportApiThunk = createAsyncThunk(
  'inventoryReports/createInventoryReportApiThunk',
  async (newInventoryReport, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.post(
        `${import.meta.env.VITE_API_URL}/InventoryReport`,
        newInventoryReport,
      )
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

export const getInventoryReportDetailsApiThunk = createAsyncThunk(
  'inventoryReports/getInventoryReportDetailsApiThunk',
  async (id, { rejectWithValue }) => {
    try {
      const response = await AxiosAdmin.get(
        `${import.meta.env.VITE_API_URL}/InventoryReport/${id}`,
      )
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

// Update inventory report by ID
export const updateInventoryReportApiThunk = createAsyncThunk(
  'inventoryReports/updateInventoryReportApiThunk',
  async ({ id, updatedInventoryReport }, { rejectWithValue }) => {
    try {
      const response = await updateInventoryReportAPI(
        id,
        updatedInventoryReport,
      )
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

const inventoryReportSlice = createSlice({
  name: 'inventoryReports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInventoryReportsApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getInventoryReportsApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload // Ensure this structure matches your API response
      })
      .addCase(getInventoryReportsApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(getInventoryReportByIdApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getInventoryReportByIdApiThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.reportDetails = action.payload
      })
      .addCase(getInventoryReportByIdApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })

      .addCase(createInventoryReportApiThunk.fulfilled, (state, action) => {
        // Handle inventory report creation if needed
        if (state.data && state.data.content) {
          state.data.content.unshift(action.payload)
        }
      })

      .addCase(updateInventoryReportApiThunk.fulfilled, (state, action) => {
        // Handle inventory report update if needed
        if (state.data && state.data.content) {
          const index = state.data.content.findIndex(
            (report) => report.id === action.payload.id,
          )
          if (index !== -1) {
            state.data.content[index] = action.payload
          }
        }
      })
      .addCase(updateInventoryReportApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getInventoryReportDetailsApiThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getInventoryReportDetailsApiThunk.fulfilled, (state, action) => {
        state.reportDetails = action.payload
      })
      .addCase(getInventoryReportDetailsApiThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default inventoryReportSlice.reducer
