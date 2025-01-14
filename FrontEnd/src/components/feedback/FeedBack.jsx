import { Modal } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'
import WebcamComponent from './WebCamComponent'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  clearFeedbacks,
  createFeedbackApiThunk,
} from '../../reducers/other/FeedbackSlice'
import { alertError, alertSuccess } from '../sweeetalert/sweetalert'
const FeedBack = () => {
  const { id } = useParams()
  const [openModal, setOpenModal] = useState(false)
  const [files, setFiles] = useState([])
  const webcamRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    data: dataFeedback,
    status: statusFeedback,
    error: errorFeedback,
  } = useSelector((state) => state.feedbackReducer)

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setFiles([...files, ...newFiles])
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()

    const byteString = atob(imageSrc.split(',')[1])
    const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0]

    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    const random = Math.floor(Math.random() * 1000000000000000)
    const blob = new Blob([ab], { type: mimeString })
    const file = new File([blob], `${random}.png`, { type: mimeString })
    setFiles([...files, file])

    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(file)
    link.download = `${random}.png`
    link.click()
  }, [webcamRef, files])

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmitFeedBack = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const content = e.target.content.value
    const payload = {
      orderId: id,
      title: title,
      content: content,
      files: files,
    }
    dispatch(createFeedbackApiThunk(payload))
  }

  useEffect(() => {
    if (statusFeedback === 'succeededCreateFeedbackApiThunk') {
      if (dataFeedback.code === 1) {
        alertError(dataFeedback.detailMessage)
        dispatch(clearFeedbacks())
        setTimeout(() => {
          navigate('/orders') // Thay đổi "/trang-mong-muon" thành đường dẫn bạn muốn điều hướng tới
        }, 1000)
      } else {
        alertSuccess('Gửi đánh giá thành công')
        dispatch(clearFeedbacks())
        setTimeout(() => {
          navigate('/orders') // Thay đổi "/trang-mong-muon" thành đường dẫn bạn muốn điều hướng tới
        }, 1000)
      }
    }
  }, [statusFeedback])
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Đánh giá sản phẩm
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Xin hãy để lại đánh giá của bạn về sản phẩm, chúng tôi sẽ cố gắng
            cải thiện sản phẩm
          </p>
          <form onSubmit={handleSubmitFeedBack} className="space-y-8">
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tiêu đề
              </label>
              <input
                type="text"
                id="title"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Nội dung
              </label>
              <textarea
                id="content"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                onChange={handleFileChange}
                multiple
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
            {/* Open Webcam Modal */}
            {/* <div> */}
            {/*   <button */}
            {/*     type="button" */}
            {/*     onClick={() => setOpenModal(true)} */}
            {/*     className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" */}
            {/*   > */}
            {/*     Chụp ảnh */}
            {/*   </button> */}
            {/*   <Modal */}
            {/*     show={openModal} */}
            {/*     size="2xl" */}
            {/*     popup */}
            {/*     onClose={() => setOpenModal(false)} */}
            {/*   > */}
            {/*     <Modal.Header /> */}
            {/*     <Modal.Body> */}
            {/*       <div className="space-y-6"> */}
            {/*         <WebcamComponent webcamRef={webcamRef} /> */}
            {/*       </div> */}
            {/*       <div className="flex justify-center items-center mt-5"> */}
            {/*         <button */}
            {/*           type="button" */}
            {/*           onClick={capture} */}
            {/*           className="w-20 h-20 bg-gray-300 rounded-full border-4 border-gray-400 hover:bg-gray-400  */}
            {/*       focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50" */}
            {/*         ></button> */}
            {/*       </div> */}
            {/*     </Modal.Body> */}
            {/*   </Modal> */}
            {/* </div> */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    className="w-full h-36 object-cover"
                    src={URL.createObjectURL(file)}
                    alt={`Selected ${index}`}
                  />
                  <button
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => removeFile(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Gửi
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
export default FeedBack
