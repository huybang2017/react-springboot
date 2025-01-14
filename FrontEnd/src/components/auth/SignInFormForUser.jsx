import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginByUserThunk } from '../../reducers/auth/LoginSlice'
import { Link } from 'react-router-dom'
import { alertError } from '../sweeetalert/sweetalert'
import './SignInFormForUser.css' // Import file CSS
import { Toast } from 'flowbite-react'
import { HiCheck } from 'react-icons/hi'

const SignInFormForUser = () => {
  const emailInputRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { status, error } = useSelector((state) => state.loginReducer)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginByUserThunk({ email, password }))
  }

  const LoginWithGoogle = () => {
    const authUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`
    window.location.href = authUrl
  }

  const LoginWithFacebook = () => {
    const authUrl = `${import.meta.env.VITE_API_URL}/oauth2/authorization/facebook`
    window.location.href = authUrl
  }

  useEffect(() => {
    if (status === 'failed') {
      if (error) {
        alertError(error.detailMessage)
      }
    }
  }, [status, error])

  return (
    <section className="container w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-black">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Đăng nhập
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Chưa có tài khoản?{' '}
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium"
                to="/signup"
              >
                Đăng ký
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                {/* Email input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    ref={emailInputRef}
                    type="email"
                    id="email"
                    name="email"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-black focus:ring-black shadow-sm"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Remember me and forgot password */}
                <div className="flex justify-between">
                  <Link
                    to="/forgetPassword"
                    className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  Đăng nhập
                </button>

                {/* Divider */}
                <div className="my-4 flex items-center">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <p className="mx-4 mb-0 text-center font-semibold">OR</p>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Social login buttons */}
                <button
                  onClick={() => LoginWithFacebook()}
                  className="mb-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{ backgroundColor: '#3b5998' }}
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  Đăng nhập bằng Facebook
                </button>
                <button
                  type="button"
                  onClick={() => {
                    LoginWithGoogle()
                  }}
                  className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55"
                >
                  <svg
                    className="w-4 h-4 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Đăng nhập bằng Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInFormForUser
