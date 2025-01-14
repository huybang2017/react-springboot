// DetailForm.jsx
import React, { useEffect, useState } from 'react'
import ImageGallery from './ImageGallery' // Import the ImageGallery component
import AxiosAdmin from '../../../apis/AxiosAdmin'

const DetailForm = ({ feedbackId, onClose }) => {
  if (!feedbackId) return null

  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    const getFeedbackById = async () => {
      try {
        const response = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/Feedback/${feedbackId}`,
        )

        setFeedback(response.data)
      } catch (error) {
        console.error('Error fetching feedback:', error)
      }
    }

    getFeedbackById()
  }, [feedbackId])

  if (!feedback) return null

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-[35rem] p-8 rounded-lg shadow-lg max-w-lg mx-4 sm:mx-auto">
        <h3 className="text-xl text-center font-semibold mb-6 border-b pb-2 border-gray-300">
          Thông tin feedback
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">ID</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.id}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Tiêu đề</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md break-words">
              {feedback.title}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium break-words">Nội dung</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.content}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Thời gian tạo</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.createTime}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Đơn hàng ID</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.orderId}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Họ va tên</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.fullname}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Sđt</label>
            <p className="text-gray-800 px-4 py-2 border rounded-md">
              {feedback.phoneNumber}
            </p>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium">Ảnh</label>
            <ImageGallery images={feedback.feedbackImageDTOSList} />
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default DetailForm
