import { combineReducers } from '@reduxjs/toolkit' // Ensure you're using @reduxjs/toolkit
import brandReducer from './productReducer/BrandSlice.jsx'
import imageReducer from './productReducer/ImageSlice.jsx'
import shoeSizeReducer from './productReducer/ShoeSizeSlice.jsx'
import shoeReducer from './productReducer/ShoeSlice.jsx'
import shoeTypeReducer from './productReducer/ShoeTypeSlice.jsx'
import loginReducer from './auth/LoginSlice.jsx'
import colorReducer from './productReducer/ColorSlice.jsx'
import cartReducer from './shopping/CartSlice.jsx'
import orderReducer from './shopping/OrderSlice.jsx'
import accountReducer from './auth/AccountSlice.jsx'
import feedbackReducer from './other/FeedbackSlice.jsx'
import inventoryReportSlice from './inventoryReducers/InventoryReportSlice.jsx'
import registerReducer from './auth/RegisterReducer.jsx'
import voucherReducer from './voucherReducer/VoucherSlice.jsx'
import eventReducer from './eventReducer/EventSlice.jsx'

import shippingFeeReducer from './shopping/ShippingFeeSlice.jsx'
import logoutReducer from './auth/LogoutSlice.jsx'
import productReducer from './productReducer/ProductsSlice.jsx'
import orderStatusReducer from './shopping/OrderStatusSlice.jsx'
import NewSlice from './news/NewSlice.jsx'
import sizeSlice from './productReducer/SizeSlice.jsx' // Import sizeSlice here
const rootReducer = combineReducers({
  brandReducer,
  imageReducer,
  shoeSizeReducer,
  shoeReducer,
  shoeTypeReducer,
  loginReducer,
  colorReducer,
  cartReducer,
  orderReducer,
  accountReducer, // Add accountReducer here
  feedbackReducer,
  registerReducer,
  inventoryReportSlice,
  vouchers: voucherReducer,
  events: eventReducer,
  products: productReducer,
  news: NewSlice,
  shippingFees: shippingFeeReducer, // Note the corrected key here
  logoutReducer,
  orderStatusReducer,
  sizeSlice,
})

export default rootReducer
