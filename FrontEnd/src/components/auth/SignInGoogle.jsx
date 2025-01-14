import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { alertError } from '../sweeetalert/sweetalert'

const SignInGoogle = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')
    const email = queryParams.get('email')
    const token = queryParams.get('token')
    const refreshToken = queryParams.get('refreshToken')

    // Lưu vào local storage
    if (id && email && token && refreshToken) {
      sessionStorage.setItem('id', id)
      sessionStorage.setItem('email', email)
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('role', 'User')
      window.location.href = '/'
    } else {
      alertError('Lỗi hệ thống')
    }
  }, [location.search, navigate])

  return <></>
}
export default SignInGoogle
