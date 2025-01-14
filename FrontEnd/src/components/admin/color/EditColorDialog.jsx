import { useDispatch } from 'react-redux'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { putColorApiThunk } from '../../../reducers/productReducer/ColorSlice'

const EditColorDialog = ({ open, handleOpen, data }) => {
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    id: '',
    colorName: '',
  })

  useEffect(() => {
    setFormValues({
      id: data.id,
      colorName: data.colorName,
    })
  }, [data])

  const [messageError, setMessageError] = useState({
    message: '',
    status: true,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValid = true

    if (formValues.colorName.trim() === '') {
      isValid = false
      setMessageError({
        message: 'Tên màu mới không được để trống',
        status: true,
      })
    } else if (formValues.colorName.length > 50) {
      isValid = false
      setMessageError({
        message: 'Tên màu mới không được vượt quá 50 ký tự',
        status: true,
      })
    } else {
      setMessageError({ message: '', status: false })
    }

    if (formValues.colorName === data.colorName) {
      isValid = false
      setMessageError({
        message: 'Tên màu mới chưa được thay đổi',
        status: true,
      })
    }

    const newForm = new FormData()
    newForm.append('id', data.id)
    newForm.append('colorName', formValues.colorName)

    if (isValid) {
      try {
        await dispatch(putColorApiThunk(newForm)).unwrap()
        toast.success('Thêm màu mới thành công')
        handleOpen()
        e.target.reset()

        location.reload()
      } catch (error) {
        console.error('Error:', error)
        toast.error(error.message || 'Có lỗi xảy ra khi thêm màu mới')
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
        <DialogTitle className="text-center">
          Sửa màu sản phẩm {data.colorName}
        </DialogTitle>
        <DialogContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="colorName" className="font-semibold">
                Tên màu{' '}
              </label>
              <input
                type="text"
                placeholder="Nhập tên màu"
                className="rounded-md"
                name="colorName"
                value={formValues.colorName}
                onChange={(e) =>
                  setFormValues({ ...formValues, colorName: e.target.value })
                }
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
              <span>Lưu</span>
            </button>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default EditColorDialog
