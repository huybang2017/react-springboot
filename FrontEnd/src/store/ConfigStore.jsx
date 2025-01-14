import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/Index.jsx'

const store = configureStore({
  reducer: rootReducer,
})

export default store
