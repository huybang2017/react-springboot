import { useDispatch } from 'react-redux'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { postShoeTypeApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice'

const AddTypeDialog = ({ open, handleOpen }) => {
  const dispatch = useDispatch()

  const [messageError, setMessageError] = useState({
    message: '',
    status: true,
  })

  const handleSubmitShoeType = async (e) => {
    e.preventDefault()

    // Giới hạn độ dài tối đa của tên loại giày
    const MAX_LENGTH = 50 // Thay đổi nếu cần
    const shoeTypeName = e.target.shoeTypeName.value.trim() // Lấy giá trị từ input

    let hasError = false
    let updatedErrors = { message: '', status: false }

    // Kiểm tra trường không trống
    if (shoeTypeName === '') {
      updatedErrors.message = 'Tên loại sản phẩm không được để trống'
      updatedErrors.status = true
      hasError = true
    }
    // Kiểm tra chiều dài tối đa
    else if (shoeTypeName.length > MAX_LENGTH) {
      updatedErrors.message = `Tên loại sản phẩm không được vượt quá ${MAX_LENGTH} ký tự`
      updatedErrors.status = true
      hasError = true
    }

    setMessageError(updatedErrors) // Cập nhật trạng thái lỗi

    if (!hasError) {
      const newForm = new FormData()
      newForm.append('shoeTypeName', shoeTypeName) // Thêm tên loại giày vào FormData

      try {
        await dispatch(postShoeTypeApiThunk(newForm)).unwrap() // Gọi API để thêm loại giày mới
        toast.success('Thêm loại mới thành công') // Hiển thị thông báo thành công
        handleOpen() // Đóng dialog
        e.target.reset() // Reset form
        location.reload() // Reload trang
      } catch (error) {
        console.error('Error:', error) // Log lỗi
        toast.error(error.message || 'Có lỗi xảy ra khi thêm loại mới') // Hiển thị thông báo lỗi
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleOpen}>
      <div className="relative w-[35rem]">
        <button
          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
          onClick={handleOpen}
        >
          <CloseIcon className="text-2xl" />
        </button>
        <DialogTitle className="text-center">Add Shoe Type</DialogTitle>
        <DialogContent>
          <form className="space-y-5" onSubmit={handleSubmitShoeType}>
            <div className="flex flex-col gap-2">
              <label htmlFor="shoeTypeName" className="font-semibold">
                Tên loại sản phẩm
              </label>
              <input
                type="text"
                placeholder="Nhập tên loại"
                className="rounded-md"
                name="shoeTypeName"
              />
              {messageError.status && (
                <span className="text-rose-500 text-sm font-semibold">
                  {messageError.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white flex items-center py-3 px-4 rounded-lg justify-center hover:bg-blue-700 transition"
            >
              <span>Add Type</span>
            </button>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default AddTypeDialog
