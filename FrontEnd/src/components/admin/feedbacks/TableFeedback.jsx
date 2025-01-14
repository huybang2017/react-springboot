// TableFeedback.jsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFeedbacksApiThunk,
  deleteFeedbackApiThunk,
} from '../../../reducers/other/FeedbackSlice.jsx' // Adjust import paths as necessary
import Loader from '../../loader/Loader'
import ConfirmDeleteModal from './ConfirmDeleteModal' // Import the modal component
import DetailForm from './DetailForm' // Import the DetailForm component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons'

const TableFeedback = ({ search, isChecked, from, to }) => {
  const dispatch = useDispatch()
  const { data, status, error } = useSelector((state) => state.feedbackReducer) // Adjust according to your slice name

  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 10
  const [sort, setSort] = useState('createTime,desc') // Default sorting
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [feedbackDetails, setFeedbackDetails] = useState(null) // State for storing feedback details

  useEffect(() => {
    dispatch(
      getFeedbacksApiThunk({
        pageSize,
        pageNumber,
        sort,
        search: search || '',
        isChecked,
        from,
        to,
      }),
    )
  }, [dispatch, pageNumber, sort, search, isChecked, from, to])

  useEffect(() => {
    setPageNumber(1)
  }, [search, isChecked, from, to])

  if (status === 'loading') return <Loader />
  if (status === 'failed') return <div>Error: {error}</div>

  const handleSort = (field) => {
    setSort((prevSort) => {
      const [currentField, currentDirection] = prevSort.split(',')
      const newDirection =
        currentField === field && currentDirection === 'asc' ? 'desc' : 'asc'
      return `${field},${newDirection}`
    })
  }

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  const handleNextPage = () => {
    if (data?.totalPages && pageNumber < data.totalPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  // const handlePageClick = (page) => {
  //     setPageNumber(page);
  // };

  const handleDelete = (id) => {
    setSelectedFeedbackId(id)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedFeedbackId !== null) {
      dispatch(deleteFeedbackApiThunk(selectedFeedbackId))
      setSelectedFeedbackId(null)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedFeedbackId(null)
  }

  const handleShowDetails = (feedbackId) => {
    // Fetch details for the selected feedback
    const feedback = data.content.find((f) => f.id === feedbackId)
    setFeedbackDetails(feedbackId)
  }

  const handleCloseDetails = () => {
    setFeedbackDetails(null)
  }

  return (
    <>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      {feedbackDetails && (
        <DetailForm feedbackId={feedbackDetails} onClose={handleCloseDetails} />
      )}
      <section className="px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400 w-20"
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('id')}
                        >
                          <span>ID</span>
                          {sort.startsWith('id') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 w-60"
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('title')}
                        >
                          Tiêu đề
                          {sort.startsWith('title') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 w-48"
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('createTime')}
                        >
                          Thời gian tạo
                          {sort.startsWith('createTime') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 w-48"
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('orderId')}
                        >
                          Mã đơn hàng
                          {sort.startsWith('orderId') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 w-32"
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('isChecked')}
                        >
                          Tình trạng
                          {sort.startsWith('isChecked') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 w-32"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.content?.map((feedback) => (
                      <tr key={feedback.id}>
                        <td className="max-w-sm truncate px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {feedback.id}
                        </td>
                        <td className="max-w-sm truncate px-4 py-4 text-sm font-medium text-gray-900 dark:text-white break-all whitespace-normal">
                          {feedback.title}
                        </td>
                        <td className="max-w-sm truncate px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {feedback.createTime}
                        </td>
                        <td className="max-w-sm truncate px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {feedback.orderId}
                        </td>
                        <td className="max-w-sm truncate px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {feedback.isChecked ? 'Đã xem' : 'Chưa xem'}
                        </td>
                        <td className="max-w-sm truncate px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          <button
                            onClick={() => handleShowDetails(feedback.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <FontAwesomeIcon icon={faEye} size="lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(feedback.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                  <button
                    onClick={handlePreviousPage}
                    disabled={pageNumber === 1}
                    className={`py-2 px-4 ${pageNumber === 1 ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md`}
                  >
                    Previous
                  </button>
                  <span>
                    Page {pageNumber} of {data?.totalPages || 1}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={
                      !data?.totalPages || pageNumber >= data.totalPages
                    }
                    className={`py-2 px-4 ${!data?.totalPages || pageNumber >= data.totalPages ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-md`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TableFeedback
