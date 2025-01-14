import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaBars, FaHome, FaRegUserCircle } from 'react-icons/fa'
import { getCurrentEvent } from '../../reducers/eventReducer/EventSlice'

const Header = ({ onSetOpen }) => {
  const [descriptionSale, setDescriptionSale] = useState(null)
  const [isOpenDropdown, setOpenDropdown] = useState(false)
  const [flagCheckAccount, setFlagCheckAccount] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const dispatch = useDispatch()
  const { status: statusLogout, error: errorLogout } = useSelector(
    (state) => state.logoutReducer,
  )
  const { data } = useSelector((state) => state.events)

  useEffect(() => {
    setDescriptionSale(data?.eventName)
  }, [data])

  useEffect(() => {
    dispatch(getCurrentEvent())
  }, [dispatch])

  const handleLogout = () => {
    sessionStorage.clear()
    setFlagCheckAccount(false)
  }

  useEffect(() => {
    if (statusLogout === 'succeededLogoutUserThunk') {
      setFlagCheckAccount(false)
    } else if (sessionStorage.getItem('token')) {
      setFlagCheckAccount(true)
    }
  }, [statusLogout, sessionStorage.getItem('token')])

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-black">
            <Link to="/">
              <img
                className="w-20 h-20 cursor-pointer"
                src="/image/logo/LOGO.svg"
                alt="logo"
              />
            </Link>
          </div>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-800 hover:text-black">
              Trang chủ
            </Link>
            <Link to="/news" className="text-gray-800 hover:text-black">
              Tin tức
            </Link>
            <Link to="/events" className="text-gray-800 hover:text-black">
              Khuyến mãi
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-black">
              Sản phẩm
            </Link>
            <Link to="/brands" className="text-gray-800 hover:text-black">
              Thương hiệu
            </Link>
          </nav>

          <div className="flex justify-center items-center gap-5">
            <p className="cursor-pointer" onClick={onSetOpen}>
              [Cart]
            </p>

            {flagCheckAccount ? (
              <div className="relative ml-4">
                <FaRegUserCircle
                  onClick={() => setOpenDropdown(!isOpenDropdown)}
                  className="cursor-pointer w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                ></FaRegUserCircle>
                {isOpenDropdown && (
                  <div className="absolute -right-32 z-10 mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Tài khoản
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/carts"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Giỏ hàng
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Danh sách đơn hàng
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">[Sign in]</Link>
            )}

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu}>
                <FaBars className="text-black text-2xl" />
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg border-r border-gray-200 z-50 transition-transform transform">
            <nav className="flex flex-col space-y-2 p-4">
              <button
                onClick={toggleMenu}
                className="text-black text-xl self-end mb-4"
              >
                &times;
              </button>
              <Link to="/news" className="text-gray-800 hover:text-black">
                Trang chủ
              </Link>
              <Link to="/news" className="text-gray-800 hover:text-black">
                Tin tức
              </Link>
              <Link to="/events" className="text-gray-800 hover:text-black">
                Khuyến mãi
              </Link>
              <Link to="/products" className="text-gray-800 hover:text-black">
                Sản phẩm
              </Link>
              <Link to="/brands" className="text-gray-800 hover:text-black">
                Thương hiệu
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

export default Header
{
  /* <div className="bg-black fixed w-full" style={{ zIndex: 100000000000 }}> */
}
{
  /*   <div className="container mx-auto flex items-center justify-between py-4 flex-col sm:flex-row"> */
}
{
  /*     <div className="mb-2 sm:mb-0"> */
}
{
  /*       <span className="self-center whitespace-nowrap text-xl font-semibold text-white"> */
}
{
  /*         Hotline: 0704.411.832 */
}
{
  /*       </span> */
}
{
  /*     </div> */
}
{
  /*     <div className="mb-2 sm:mb-0 text-center"> */
}
{
  /*       <h1 className="text-red-500 text-shadow-3d-white-left-up text-2xl sm:text-4xl font-bold uppercase"> */
}
{
  /*         {descriptionSale} */
}
{
  /*       </h1> */
}
{
  /*     </div> */
}
{
  /*     <div className="flex items-center justify-center w-full sm:w-auto"> */
}
{
  /*       {!flagCheckAccount ? ( */
}
{
  /*         <Link to="/login"> */
}
{
  /*           <svg */
}
{
  /*             xmlns="http://www.w3.org/2000/svg" */
}
{
  /*             viewBox="0 0 448 512" */
}
{
  /*             className="w-8 h-auto ml-4 cursor-pointer fill-current text-white" */
}
{
  /*           > */
}
{
  /*             <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /> */
}
{
  /*           </svg> */
}
{
  /*         </Link> */
}
{
  /*       ) : ( */
}
{
  /*         <div className="relative ml-4"> */
}
{
  /*           <FaRegUserCircle */
}
{
  /*             onClick={() => setOpenDropdown(!isOpenDropdown)} */
}
{
  /*             className="cursor-pointer w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" */
}
{
  /*           ></FaRegUserCircle> */
}
{
  /*           {isOpenDropdown && ( */
}
{
  /*             <div className="absolute -right-32 z-10 mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"> */
}
{
  /*               <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"> */
}
{
  /*                 <li> */
}
{
  /*                   <Link */
}
{
  /*                     to="/profile" */
}
{
  /*                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" */
}
{
  /*                   > */
}
{
  /*                     Tài khoản */
}
{
  /*                   </Link> */
}
{
  /*                 </li> */
}
{
  /*                 <li> */
}
{
  /*                   <Link */
}
{
  /*                     to="/carts" */
}
{
  /*                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" */
}
{
  /*                   > */
}
{
  /*                     Giỏ hàng */
}
{
  /*                   </Link> */
}
{
  /*                 </li> */
}
{
  /*                 <li> */
}
{
  /*                   <Link */
}
{
  /*                     to="/orders" */
}
{
  /*                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" */
}
{
  /*                   > */
}
{
  /*                     Danh sách đơn hàng */
}
{
  /*                   </Link> */
}
{
  /*                 </li> */
}
{
  /*                 <li> */
}
{
  /*                   <Link */
}
{
  /*                     onClick={handleLogout} */
}
{
  /*                     className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" */
}
{
  /*                   > */
}
{
  /*                     Đăng xuất */
}
{
  /*                   </Link> */
}
{
  /*                 </li> */
}
{
  /*               </ul> */
}
{
  /*             </div> */
}
{
  /*           )} */
}
{
  /*         </div> */
}
{
  /*       )} */
}
{
  /*       <Link to="/" className="ml-4"> */
}
{
  /*         <FaHome className="cursor-pointer w-10 h-10 overflow-hidden text-white" /> */
}
{
  /*       </Link> */
}
{
  /*     </div> */
}
{
  /*   </div> */
}
{
  /* </div> */
}
