import Swal from 'sweetalert2'
import {
  resetPasswordThunk,
  updateEmailApiThunk,
  updatePasswordApiThunk,
} from '../../reducers/auth/AccountSlice'
const alertSuccess = (message) => {
  Swal.fire({
    text: message || 'Operation successful!',
    icon: 'success',
  })
}

const alertError = (message) => {
  Swal.fire({
    text: message || 'Something went wrong!',
    icon: 'error',
  })
}

const alertSave = () => {
  return Swal.fire({
    title: 'Bạn có muốn xác nhận không?',
    showCancelButton: true,
    confirmButtonText: 'Lưu',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Đã xác nhận!', '', 'success')
      return true
    } else {
      return false
    }
  })
}

const alertDelete = () => {
  Swal.fire({
    title: 'Bạn có chắc muốn xóa không?',
    text: 'Hành động sẽ không thể quay lại!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Đã xóa!',
        text: 'Đã thực thi hành động xóa.',
        icon: 'success',
      })
    }
  })
}

const alertSubmitToken = (formData, dispatch) => {
  if (formData.action === 'updatePassword') {
    Swal.fire({
      title: 'Nhập mã xác nhận (Vui lòng kiểm tra thư email!)',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      showLoaderOnConfirm: true,
      preConfirm: async (token) => {
        try {
          formData.tokenUpdatePassword = token
          dispatch(updatePasswordApiThunk(formData))
          return
        } catch (error) {
          Swal.showValidationMessage(`Yêu cầu thất bại: ${error.message}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  } else if (formData.action === 'updateEmail') {
    Swal.fire({
      title: 'Nhập mã xác nhận (Vui lòng kiểm tra thư email!)',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      showLoaderOnConfirm: true,
      preConfirm: async (token) => {
        try {
          formData.tokenUpdateEmail = token
          dispatch(updateEmailApiThunk(formData))
          return
        } catch (error) {
          Swal.showValidationMessage(`Yêu cầu thất bại: ${error.message}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  } else if (formData.action === 'forgetPassword') {
    Swal.fire({
      title: 'Nhập mã xác nhận (Vui lòng kiểm tra thư email!)',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      showLoaderOnConfirm: true,
      preConfirm: async (token) => {
        try {
          if (!token) {
            Swal.showValidationMessage(
              `Yêu cầu thất bại: Mã xác nhận không được để trống!`,
            )
            return
          }
          formData.token = token
          dispatch(resetPasswordThunk(formData))
          return
        } catch (error) {
          Swal.showValidationMessage(`Yêu cầu thất bại: ${error.message}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }
}

export { alertSuccess, alertError, alertSave, alertDelete, alertSubmitToken }
