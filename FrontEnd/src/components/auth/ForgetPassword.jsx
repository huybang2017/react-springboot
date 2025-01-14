import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  checkEmailApiThunk,
  getTokenForgetPasswordThunk,
  resetStateAccount,
  resetStateCheckEmail,
} from '../../reducers/auth/AccountSlice'
import Loader from '../loader/Loader'
import {
  alertError,
  alertSubmitToken,
  alertSuccess,
} from '../sweeetalert/sweetalert'

const ForgetPassword = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const {
    checkEmail,
    status: statusAccount,
    error: errorAccount,
  } = useSelector((state) => state.accountReducer)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    action: 'forgetPassword',
    email: null,
    newPassword: null,
    token: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const confirmPassword = e.target.confirmPassword.value

    // // Simple email regex for validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    // if (!emailRegex.test(email)) {
    //   setError('Please include a valid email address.')
    //   return
    // }

    // if (!passwordRegex.test(password)) {
    //   setError(
    //     'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    //   )
    //   return
    // }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận chưa đúng')
      return
    }

    setError('')
    setFormData({ ...formData, email, newPassword: password })
    dispatch(getTokenForgetPasswordThunk({ email: formData.email }))
  }

  useEffect(() => {
    if (statusAccount === 'succeededGetToken') {
      alertSubmitToken(formData, dispatch)
    } else if (statusAccount === 'succeededResetPassword') {
      dispatch(resetStateAccount())
      alertSuccess('Đổi mật khẩu thành công!')
      setTimeout(() => {
        navigation('/login')
      }, 1500)
    } else if (errorAccount) {
      alertError(errorAccount.detailMessage)
      dispatch(resetStateAccount())
    }
  }, [statusAccount, errorAccount])

  return (
    <div className="container w-full max-w-md mx-auto p-6">
      {statusAccount === 'loadingGetToken' ||
      statusAccount === 'loadingResetPassword' ? (
        <Loader />
      ) : (
        <div>
          <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-black">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Quên mật khẩu
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember your password?{' '}
                  <Link
                    className="text-blue-600 decoration-2 hover:underline font-medium"
                    to="/login"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>

              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                          required
                        />
                      </div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-bold mt-2 ml-1 mb-2 dark:text-white"
                      >
                        Mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                          required
                        />
                      </div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm mt-2 font-bold ml-1 mb-2 dark:text-white"
                      >
                        Xác nhận mật khẩu mới
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                          required
                        />
                      </div>
                      {error && (
                        <p
                          className="text-xs text-red-600 mt-2"
                          id="email-error"
                        >
                          {error}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    >
                      Gửi mã xác nhận
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgetPassword
