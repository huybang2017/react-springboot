import { useDispatch, useSelector } from 'react-redux'
import { loginByAdminThunk, resetState } from '../../reducers/auth/LoginSlice'
import { useEffect, useState } from 'react'
import { alertError } from '../sweeetalert/sweetalert'

const SignInFormForAdmin = () => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.loginReducer)

  // State for input values and error messages
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSignInForAdmin = () => {
    let hasError = false

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validate email
    if (!email) {
      setEmailError('Vui lòng nhập email')
      hasError = true
    } else if (!emailRegex.test(email)) {
      setEmailError('Email không hợp lệ')
      hasError = true
    } else {
      setEmailError('')
    }

    // Validate password
    if (!password) {
      setPasswordError('Vui lòng nhập mật khẩu')
      hasError = true
    } else {
      setPasswordError('')
    }

    // Dispatch action if no error
    if (!hasError) {
      dispatch(loginByAdminThunk({ email, password }))
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSignInForAdmin()
      }
    }

    // Add event listener for keydown
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [email, password])

  useEffect(() => {
    if (error) {
      alertError(error?.detailMessage)
      dispatch(resetState())
    }
  }, [error, dispatch])

  return (
    <section className="flex items-center container w-full h-[100vh] max-w-md mx-auto">
      <div className="w-full bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-black">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Đăng nhập
            </h1>
          </div>

          <div className="mt-5">
            <form className="w-full">
              <div className="grid gap-y-4">
                {/* Email input */}
                <div>
                  <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    Địa chỉ email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                    placeholder="Nhập Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1">{emailError}</p>
                  )}
                </div>

                {/* Password input */}
                <div>
                  <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  onClick={handleSignInForAdmin}
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInFormForAdmin
