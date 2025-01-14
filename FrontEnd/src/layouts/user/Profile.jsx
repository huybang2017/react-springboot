import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAccountAndUserInformationByIdApiThunk,
  updateAccountInformationUserApiThunk,
} from '../../reducers/auth/AccountSlice'
import { alertSuccess } from '../../components/sweeetalert/sweetalert'
const Profile = () => {
  const dispatch = useDispatch()
  const {
    data: dataAccount,
    accountDetail,
    checkEmail,
    status: statusAccount,
    error: errorAccount,
  } = useSelector((state) => state.accountReducer)
  const ACCOUNT_ID = sessionStorage.getItem('id')

  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getAccountAndUserInformationByIdApiThunk(ACCOUNT_ID))
  }, [dispatch, ACCOUNT_ID])

  const convertDateFormat = (dateStr) => {
    if (!dateStr) return ''
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  const convertDateFormatFormData = (dateStr) => {
    if (!dateStr) return ''
    const [day, month, year] = dateStr.split('-')
    return `${year}/${month}/${day}`
  }

  const [formDataInformation, setFormDataInformation] = useState({
    fullname: '',
    address: '',
    gender: '',
    birthday: '',
    phoneNumber: '',
  })

  const handleChangeInformation = (e) => {
    const { name, value } = e.target
    setFormDataInformation({ ...formDataInformation, [name]: value })
  }

  const handleSubmitInformation = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const formattedBirthday = convertDateFormatFormData(
        formDataInformation.birthday,
      )

      const payload = {
        ...formDataInformation,
        birthday: formattedBirthday,
        accountId: ACCOUNT_ID,
      }

      dispatch(updateAccountInformationUserApiThunk(payload))
    }
  }

  useEffect(() => {
    console.log('Status account:', statusAccount)
    console.log('Error account:', errorAccount)
    if (statusAccount === 'succeededUpdateAccountInformationUserApiThunk') {
      alertSuccess('Cập nhật thông tin thành công')
    }
  }, [dispatch, statusAccount, errorAccount])

  const validateForm = () => {
    const newErrors = {}

    const fullnameRegex = /^[A-Za-zÀ-ỹ\s]{3,}$/
    if (!formDataInformation.fullname) {
      newErrors.fullname = 'Vui lòng nhập tên'
    } else if (!fullnameRegex.test(formDataInformation.fullname)) {
      newErrors.fullname = 'Tên chỉ được chứa chữ cái và phải ít nhất 3 ký tự'
    }

    const phoneNumberRegex = /^[0-9]{10,11}$/
    if (!formDataInformation.phoneNumber) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại'
    } else if (!phoneNumberRegex.test(formDataInformation.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải là 10-11 chữ số'
    }

    if (!formDataInformation.address) {
      newErrors.address = 'Vui lòng nhập địa chỉ'
    }

    if (!formDataInformation.birthday) {
      newErrors.birthday = 'Vui lòng chọn ngày sinh'
    }

    if (!formDataInformation.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    if (statusAccount === 'succeeded' && accountDetail) {
      setFormDataInformation({
        fullname: accountDetail.fullname || '',
        address: accountDetail.address || '',
        gender: accountDetail.gender || '',
        birthday: convertDateFormat(accountDetail.birthday) || '',
        phoneNumber: accountDetail.phoneNumber || '',
      })
    }
  }, [accountDetail, statusAccount])

  if (!ACCOUNT_ID) {
    return (
      <div className="text-center mt-4">
        <p className="text-red-500">Bạn phải đăng nhập để tiếp tục.</p>
        <a
          href="/login"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Đăng nhập
        </a>
      </div>
    )
  }

  return (
    <div className="container grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
      <div className="col-span-full">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">
            Thông tin tài khoản
          </h3>
          <form onSubmit={handleSubmitInformation}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nhập tên người nhận hàng"
                  value={formDataInformation.fullname}
                  onChange={handleChangeInformation}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nhập số điện thoại người nhận hàng"
                  value={formDataInformation.phoneNumber}
                  onChange={handleChangeInformation}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Giới tính
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formDataInformation.gender}
                  onChange={handleChangeInformation}
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ngày sinh
                </label>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formDataInformation.birthday}
                  onChange={handleChangeInformation}
                />
                {errors.birthday && (
                  <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
                )}
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3 mt-5 mb-3">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ
              </label>
              <input
                type="textarea"
                name="address"
                id="address"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nhập địa chỉ người nhận hàng"
                value={formDataInformation.address}
                onChange={handleChangeInformation}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Lưu
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
