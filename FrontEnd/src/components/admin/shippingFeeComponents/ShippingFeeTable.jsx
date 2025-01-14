import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShippingFeesApiThunk } from '../../../reducers/shopping/ShippingFeeSlice.jsx'
import Loader from '../../loader/Loader.jsx'
// import DetailForm from './DetailForm'; // Import the DetailForm component if needed

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return ''
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const ShippingFeeTable = () => {
  const dispatch = useDispatch()
  const {
    data,
    status: apiStatus,
    error,
  } = useSelector((state) => state.shippingFees)

  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 5
  const [sort, setSort] = useState('id,asc')
  const [itemDetails, setItemDetails] = useState(null)
  const [notification, setNotification] = useState(null)
  useEffect(() => {
    dispatch(getShippingFeesApiThunk({ pageSize, pageNumber, sort }))
  }, [dispatch, pageNumber, sort])

  const handleSort = (field) => {
    if (['id', 'createTime', 'fee', 'destination'].includes(field)) {
      setSort((prevSort) => {
        const [currentField, currentDirection] = prevSort.split(',')
        const newDirection =
          currentField === field && currentDirection === 'asc' ? 'desc' : 'asc'
        return `${field},${newDirection}`
      })
    }
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

  const handleShowDetails = (itemId) => {
    const item = data?.content?.find((i) => i.id === itemId)
    setItemDetails(item)
    setNotification(`Showing details for item ${itemId}`) // Set notification
  }

  const handleCloseDetails = () => {
    setItemDetails(null)
    setNotification(null) // Clear notification
  }

  if (apiStatus === 'loading') return <Loader />
  if (apiStatus === 'failed') return <div>Error: {error}</div>

  const totalPages = data?.totalPages || 0

  return (
    <>
      {/* {itemDetails && (
                <DetailForm
                    item={itemDetails}
                    onClose={handleCloseDetails}
                />
            )} */}
      <section className="px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
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
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
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
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('fee')}
                        >
                          Phí vận chuyển
                          {sort.startsWith('fee') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.content?.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-center"
                        >
                          Không có dữ liệu để hiển thị
                        </td>
                      </tr>
                    ) : (
                      data?.content?.map((item) => (
                        <tr key={item.id}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                            {item.id}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {item.createTime}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {formatCurrency(item.fee)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="px-4 py-3 text-sm font-medium">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePreviousPage}
                      disabled={pageNumber === 1}
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg ${pageNumber === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Page {pageNumber} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={pageNumber === totalPages}
                      className={`inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg ${pageNumber === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    >
                      Next
                    </button>
                  </div>
                  {notification && (
                    <div className="mt-4 p-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      {notification}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShippingFeeTable
