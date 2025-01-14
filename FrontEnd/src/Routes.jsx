import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import IncomeStatistics from './layouts/dashboard/IncomeSatistics.jsx'
import PageEvent from './layouts/user/PageEvent.jsx'
import ProductsPage from './layouts/dashboard/products/ProductsPage.jsx'
import ProductIdPage from './layouts/dashboard/products/productId/ProductIdPage.jsx'
import AddProductPage from './layouts/dashboard/products/new/AddProductPage.jsx'
import EditProductPage from './layouts/dashboard/products/edit/EditProductPage.jsx'
import AddNewPage from './layouts/dashboard/news/new/AddNewPage.jsx'
import EditNewPage from './layouts/dashboard/news/edit/EditNewPage.jsx'
import ViewIdPage from './layouts/dashboard/news/newId/NewIdPage.jsx'

const PageProduct = lazy(() => import('./layouts/user/PageProduct.jsx'))
const SignInForUser = lazy(() => import('./layouts/auth/SignInForUser.jsx'))
const SignUpForUser = lazy(() => import('./layouts/auth/SignUpForUser.jsx'))
const SignInForAdmin = lazy(() => import('./layouts/auth/SignInForAdmin'))
const ErrorPage = lazy(() => import('./layouts/ErrorPage'))
const DetailProduct = lazy(() => import('./layouts/user/DetailProduct.jsx'))
const DashBoard = lazy(() => import('./layouts/dashboard/Dashboard.jsx'))
const Checkout = lazy(() => import('./layouts/user/CheckOut.jsx'))
const OrderSummary = lazy(() => import('./layouts/user/OrderSummaryLayout.jsx'))
const PageCart = lazy(() => import('./layouts/user/PageCartLayout.jsx'))
const NewDashboard = lazy(() => import('./layouts/dashboard/news/NewsPage.jsx'))

const FeedbackDashBoard = lazy(
  () => import('./layouts/dashboard/Feedbacks.jsx'),
)

const VoucherDashboard = lazy(() => import('./layouts/dashboard/Voucher.jsx'))
const EventDashboard = lazy(() => import('./layouts/dashboard/Event.jsx'))

const InventoryDashBoard = lazy(
  () => import('./layouts/dashboard/Inventories.jsx'),
)
const ShippingFeeDashBoard = lazy(
  () => import('./layouts/dashboard/ShippingFees.jsx'),
)
const BaseLayoutUser = lazy(() => import('./layouts/user/BaseLayoutUser.jsx'))

const BaseLayoutDashBoard = lazy(
  () => import('./layouts/dashboard/BaseLayoutDashboard.jsx'),
)
const Profile = lazy(() => import('./layouts/user/Profile.jsx'))
const OrderDashboard = lazy(() => import('./layouts/dashboard/Orders.jsx'))
const BrandDashboard = lazy(() => import('./layouts/dashboard/Brand.jsx'))
const TypeDashboard = lazy(() => import('./layouts/dashboard/Type.jsx'))
const UsersDashBoard = lazy(() => import('./layouts/dashboard/Users.jsx'))
const ListOrderByUser = lazy(() => import('./layouts/user/ListOrderByUser.jsx'))
const ColorDashboard = lazy(() => import('./layouts/dashboard/Color.jsx'))
const PageBrand = lazy(() => import('./layouts/user/PageBrand.jsx'))
const PageContactUs = lazy(() => import('./layouts/user/PageContactUs.jsx'))
const PageNews = lazy(() => import('./layouts/user/PageNews.jsx'))
const PageDetailNew = lazy(() => import('./layouts/user/PageDetailNew.jsx'))
const PageFeedBack = lazy(() => import('./layouts/user/PageFeedBack.jsx'))
const PageForgetPassword = lazy(
  () => import('./layouts/auth/PageForgetPassword.jsx'),
)
const PageCreateOrder = lazy(
  () => import('./layouts/dashboard/PageCreateOrder.jsx'),
)
const PageSignInGoogle = lazy(
  () => import('./layouts/user/PageSignInGoogle.jsx'),
)
const PageHome = lazy(() => import('./layouts/user/PageHome.jsx'))
const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayoutUser />,
    children: [
      { path: '/', element: <PageHome />, index: true },
      { path: '/products', element: <PageProduct /> },
      { path: '/products/:id', element: <DetailProduct /> },
      { path: '/login', element: <SignInForUser /> },
      { path: '/signup', element: <SignUpForUser /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/orders/:id', element: <OrderSummary /> },
      { path: '/carts', element: <PageCart /> },
      { path: '/profile', element: <Profile /> },
      { path: '/orders', element: <ListOrderByUser /> },
      { path: '/brands', element: <PageBrand /> },
      { path: '/contact-us', element: <PageContactUs /> },
      { path: '/news', element: <PageNews /> },
      { path: '/news/:id', element: <PageDetailNew /> },
      { path: '/feedback/:id', element: <PageFeedBack /> },
      { path: '/events', element: <PageEvent /> },
      { path: '/forgetpassword', element: <PageForgetPassword /> },
      { path: '/login/google', element: <PageSignInGoogle /> },
    ],
  },
  { path: '/admin', element: <SignInForAdmin /> },
  {
    path: '/dashboard',
    element: <BaseLayoutDashBoard />,
    children: [
      { element: <DashBoard />, index: true },
      { path: '/dashboard/products', element: <ProductsPage /> },
      { path: '/dashboard/products/:id', element: <ProductIdPage /> },
      { path: '/dashboard/products/new', element: <AddProductPage /> },
      { path: '/dashboard/products/edit/:id', element: <EditProductPage /> },
      { path: '/dashboard/orders', element: <OrderDashboard /> },
      { path: '/dashboard/brands', element: <BrandDashboard /> },
      { path: '/dashboard/type', element: <TypeDashboard /> },
      { path: '/dashboard/users', element: <UsersDashBoard /> },
      { path: '/dashboard/feedback', element: <FeedbackDashBoard /> },
      { path: '/dashboard/vouchers', element: <VoucherDashboard /> },
      { path: '/dashboard/events', element: <EventDashboard /> },
      { path: '/dashboard/inventory', element: <InventoryDashBoard /> },
      { path: '/dashboard/shippingfee', element: <ShippingFeeDashBoard /> },
      { path: '/dashboard/color', element: <ColorDashboard /> },
      { path: '/dashboard/news', element: <NewDashboard /> },
      { path: '/dashboard/news/add', element: <AddNewPage /> },
      { path: '/dashboard/news/edit/:id', element: <EditNewPage /> },
      { path: '/dashboard/news/:id', element: <ViewIdPage /> },
      { path: '/dashboard/income', element: <IncomeStatistics /> },
      { path: '/dashboard/orders/create', element: <PageCreateOrder /> },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />, 
  },
])

export default router
