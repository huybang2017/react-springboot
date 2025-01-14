import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { DialogContent } from '@mui/material'
import ImageUpload from './ImageUpload'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import {
  postBrandApiThunk,
  putBrandApiThunk,
} from '../../../reducers/productReducer/BrandSlice'
import toast from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'

const EditBrandDialog = ({ open, handleOpen, data }) => {
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    brandId: data.brandId,
    brandName: data.brandName,
    logo: data.logo || null,
  })

  const [messageError, setMessageError] = useState({
    brandName: '',
    logo: '',
    status: true,
  })

  const onSubmit = (e) => {
    e.preventDefault()

    let hasError = false

    if (formValues.brandName === '') {
      setMessageError((prevState) => ({
        ...prevState,
        brandName: 'Tên thương hiệu không được để trống',
        status: true,
      }))
      hasError = true
    } else if (formValues.brandName.length > 50) {
      setMessageError((prevState) => ({
        ...prevState,
        brandName: 'Tên thương hiệu không được vượt quá 50 ký tự',
        status: true,
      }))
      hasError = true
    } else {
      setMessageError((prevState) => ({
        ...prevState,
        brandName: '',
        status: false,
      }))
    }

    if (!formValues.logo) {
      setMessageError((prevState) => ({
        ...prevState,
        logo: 'Logo thương hiệu không được để trống',
        status: true,
      }))
      hasError = true
    } else if (formValues.logo instanceof File) {
      const fileType = formValues.logo.name.split('.').pop().toLowerCase()

      if (!['png', 'jpg', 'gif', 'bmp', 'svg', 'webp'].includes(fileType)) {
        setMessageError((prevState) => ({
          ...prevState,
          logo: 'Chỉ chấp nhận định dạng của hình ảnh',
          status: true,
        }))
        hasError = true
      }

      if (formValues.logo.size > 4 * 1024 * 1024) {
        setMessageError((prevState) => ({
          ...prevState,
          logo: 'File không được vượt quá 4mb',
          status: true,
        }))
        hasError = true
      }
    }

    if (
      formValues.brandName === data.brandName &&
      formValues.logo === data.logo
    ) {
      setMessageError((prevState) => ({
        ...prevState,
        logo: 'Chưa có thay đổi tên hoặc logo',
        status: true,
      }))
      hasError = true
    }

    if (!hasError) {
      const newForm = new FormData()

      newForm.append('brandId', data.brandId)
      newForm.append('brandName', formValues.brandName)
      if (formValues.logo instanceof File) {
        newForm.append('logo', formValues.logo)
      }

      dispatch(putBrandApiThunk(newForm))
        .unwrap()
        .then(() => {
          toast.success('Thương hiệu đã được cập nhật thành công!')
          handleOpen()
          window.location.reload()
        })
        .catch((error) => {
          toast.error(`Cập nhật thương hiệu không thành công: ${error}`)
          console.error(error)
        })
    }
  }

  return (
    <Dialog open={open} onClose={handleOpen}>
      <div className="relative w-[35rem] space-y-2">
        <button
          className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
          onClick={handleOpen}
        >
          <CloseIcon className="text-2xl" />
        </button>
        <DialogTitle className="text-center">
          Sửa thông tin thương hiệu
        </DialogTitle>
        <DialogContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="brandName" className="font-semibold">
                  Tên thương hiệu
                </label>
                <input
                  value={formValues.brandName}
                  onChange={(e) =>
                    setFormValues({ ...formValues, brandName: e.target.value })
                  }
                  type="text"
                  className="rounded-md w-full"
                  placeholder="Nhập tên thương hiệu"
                />
                {messageError.brandName && (
                  <span className="text-rose-500 text-sm font-semibold">
                    {messageError.brandName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="brandLogo" className="font-semibold">
                  Logo thương hiệu
                </label>
                <div className="flex items-center justify-center">
                  {formValues.logo ? (
                    <div className="relative h-20 w-20">
                      <img
                        src={
                          formValues.logo instanceof File
                            ? URL.createObjectURL(formValues.logo)
                            : `${import.meta.env.VITE_API_URL}/Brand/Image/${
                                data.logo
                              }`
                        }
                        alt="BrandImage"
                        className="rounded-md w-[5rem] h-[5rem] object-cover"
                      />
                      <button
                        onClick={() =>
                          setFormValues({ ...formValues, logo: null })
                        }
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                      >
                        <IoMdClose className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <ImageUpload
                      onChangeFormValues={setFormValues}
                      formValues={formValues}
                    />
                  )}
                </div>
                {messageError.logo && (
                  <span className="text-rose-500 text-sm font-semibold">
                    {messageError.logo}
                  </span>
                )}
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white flex items-center justify-center px-4 py-2 rounded-lg">
              Cập nhật
            </button>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default EditBrandDialog
