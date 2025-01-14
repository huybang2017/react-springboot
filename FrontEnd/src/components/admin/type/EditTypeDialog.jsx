import { useDispatch } from 'react-redux'
import { putShoeTypeApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'

const EditTypeDialog = ({ open, handleOpen, data }) => {
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    shoeTypeId: '',
    shoeTypeName: '',
  })

  useEffect(() => {
    setFormValues({
      shoeTypeId: data.shoeTypeId,
      shoeTypeName: data.shoeTypeName,
    })
  }, [data])

  const [messageError, setMessageError] = useState({
    message: '',
    status: true,
  })

  const handleSubmitShoeType = async (e) => {
    e.preventDefault()

    let hasError = false

    if (formValues.shoeTypeName.trim() === '') {
      setMessageError({
        message: 'Tên loại mới không được để trống',
        status: true,
      })
      hasError = true
    } else if (formValues.shoeTypeName.length > 50) {
      setMessageError({
        message: 'Tên loại mới không được vượt quá 50 ký tự',
        status: true,
      })
      hasError = true
    } else if (formValues.shoeTypeName === data.shoeTypeName) {
      setMessageError({
        message: 'Tên loại mới chưa được thay đổi',
        status: true,
      })
      hasError = true
    } else {
      setMessageError({ message: '', status: false })
    }

    if (!hasError) {
      const newForm = new FormData()
      newForm.append('shoeTypeName', formValues.shoeTypeName)
      newForm.append('shoeTypeId', formValues.shoeTypeId)

      try {
        await dispatch(putShoeTypeApiThunk(newForm)).unwrap()
        toast.success('Sửa thành công')
        handleOpen()
        e.target.reset()
        location.reload()
      } catch (error) {
        console.error('Error:', error)
        toast.error(error.message || 'Có lỗi xảy ra khi sửa')
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
          Sửa loại sản phẩm {data.shoeTypeName}
        </DialogTitle>
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
                value={formValues.shoeTypeName}
                onChange={(e) =>
                  setFormValues({ ...formValues, shoeTypeName: e.target.value })
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

export default EditTypeDialog
