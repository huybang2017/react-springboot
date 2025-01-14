import CloseIcon from '@mui/icons-material/Close'

import { IoMdClose } from 'react-icons/io'
import ImageUpload from './ImageUpload'
import '../style.css'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AxiosAdmin from '../../../apis/AxiosAdmin'

const EditEventDialog = ({ isOpen, handleOpen, data }) => {
  const [validate, setValidate] = useState({
    eventName: '',
    banner: null,
    percentage: 0,
    saleCreateForm: '',
  })

  const [formValues, setFormValues] = useState({
    eventId: data.eventId,
    eventName: data.eventName,
    banner: null,
    percentage: data.percentage,
    status: data.status,
  })
  const [imageBanner, setImageBanner] = useState('')
  useEffect(() => {
    if (data) {
      setFormValues({
        eventId: data.eventId,
        eventName: data.eventName,
        banner: null,
        percentage: data.percentage,
        status: data.status,
      })
      setImageBanner(data.banner)
    }
  }, [data])
  const onSubmit = async (e) => {
    e.preventDefault()

    let isValid = true
    let newValidate = {
      eventName: '',
      banner: '',
      percentage: '',
      saleCreateForm: '',
    }

    if (!formValues.eventName.trim()) {
      newValidate.eventName = 'Tên sự kiện không được để trống.'
      isValid = false
    }

    if (formValues.percentage < 0 || formValues.percentage > 100) {
      newValidate.percentage =
        'Phần trăm giảm giá phải trong khoảng từ 0 đến 100.'
      isValid = false
    }

    if (!isValid) {
      setValidate(newValidate)
      return
    }

    const formData = new FormData()
    if (formValues.eventName && formValues.eventName !== data.eventName) {
      formData.append('eventName', formValues.eventName)
    }
    if (formValues.banner && formValues.banner !== data.banner) {
      formData.append('banner', formValues.banner)
    }
    if (formValues.percentage && formValues.percentage !== data.percentage) {
      formData.append('percentage', formValues.percentage)
    }
    if (formValues.status !== data.status) {
      formData.append('status', formValues.status)
    }
    formData.append('eventId', data.eventId)

    formData.forEach((value, key) => {
      console.log(key, value)
    })

    try {
      const res = await AxiosAdmin.patch(
        `${import.meta.env.VITE_API_URL}/Event`,
        formData,
      )

      if (res.status === 200) {
        toast.success('Sửa event thành công')
        location.reload()
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.detailMessage
      ) {
        console.error(
          'Error detail message:',
          error.response.data.detailMessage,
        )
        toast.error(`Sửa event thất bại: ${error.response.data.detailMessage}`)
      } else {
        console.error('Error updating event:', error)
        toast.error('Sửa event thất bại do lỗi không xác định.')
      }
    }
  }

  return (
    <div
      className={`${isOpen ? 'fixed' : 'hidden'} w-full h-screen animate-dropdown z-50 top-0 left-0`}
    >
      <div
        className={`flex w-full h-screen relative items-center justify-center`}
      >
        <div className="relative p-5 bg-white overflow-x-hidden border rounded-md shadow-2xl ">
          <button
            className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
            onClick={() => handleOpen()}
          >
            <CloseIcon className="text-2xl" />
          </button>

          <h3 className="text-center font-semibold text-2xl">Sửa sự kiện</h3>
          <div className=" border-b-[2px] border-zinc-700 mt-2" />

          <div className="flex gap-0 overflow-x-hidden">
            <div className="w-[35rem] p-5">
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventName">Tên sự kiện</label>
                  <input
                    className={`rounded-md ${validate.eventName ? 'border-red-500' : ''}`}
                    type="text"
                    placeholder="Tên sự kiện"
                    value={formValues.eventName}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        eventName: e.target.value,
                      })
                    }
                  />
                  {validate.eventName && (
                    <p className="text-red-500 text-sm">{validate.eventName}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="banner">Hình ảnh</label>

                  {imageBanner ? (
                    <div className="relative">
                      <img
                        src={
                          imageBanner
                            ? `${import.meta.env.VITE_API_URL}/Event/Banner/${imageBanner}`
                            : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                        }
                        alt="Uploaded"
                        className="rounded-md w-[5rem] h-[5rem] object-cover"
                      />
                      <button
                        onClick={() => setImageBanner('')}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                        type="button"
                      >
                        <IoMdClose className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <ImageUpload
                      formValues={formValues}
                      onChangeFormValues={setFormValues}
                    />
                  )}

                  {validate.banner && (
                    <p className="text-red-500 text-sm">{validate.banner}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="percentage">Phần trăm giảm giá</label>
                  <input
                    className={`rounded-md ${validate.percentage ? 'border-red-500' : ''}`}
                    type="number"
                    min={0}
                    value={formValues.percentage}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        percentage: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="percentage">Trạng thái</label>
                  <select
                    className="rounded-md"
                    value={formValues.status}
                    onChange={(e) =>
                      setFormValues({ ...formValues, status: e.target.value })
                    }
                  >
                    <option value="true">Hiển thị</option>
                    <option value="false">Ẩn</option>
                  </select>
                </div>

                <div>
                  <button className="w-full py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition">
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditEventDialog
