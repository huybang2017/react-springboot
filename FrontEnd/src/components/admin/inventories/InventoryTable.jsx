import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInventoryReportsApiThunk } from '../../../reducers/inventoryReducers/InventoryReportSlice.jsx' // Adjust import paths as necessary
import Loader from '../../loader/Loader.jsx'
import EditInventoryDialog from './EditInventoryDialog.jsx'
import ViewInventoryDialog from './ViewInventoryDialog.jsx'
import AxiosAdmin from '../../../apis/AxiosAdmin.jsx'
import { IoEyeSharp } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import toast from 'react-hot-toast'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
// import DetailForm from './DetailForm'; // Import the DetailForm component

const statusTranslations = {
  ChoNhapKho: 'Chờ nhập kho',
  DaNhapKho: 'Đã nhập kho',
  Huy: 'Đã hủy',
  // Add more status translations as needed
}

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return ''
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount)
}

const InventoryTable = ({ search, status, from, to }) => {
  const dispatch = useDispatch()
  const {
    data,
    status: apiStatus,
    error,
  } = useSelector((state) => state.inventoryReportSlice) // Adjust according to your slice name

  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 5
  const [sort, setSort] = useState('createTime,desc') // Default sorting
  const [itemDetails, setItemDetails] = useState(null) // State for storing item details
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [currentInventory, setCurrentInventory] = useState('')

  useEffect(() => {
    dispatch(
      getInventoryReportsApiThunk({
        pageSize,
        pageNumber,
        sort,
        search: search || '',
        status,
        from,
        to,
      }),
    )
  }, [dispatch, pageNumber, sort, search, status, from, to])

  useEffect(() => {
    setPageNumber(1)
  }, [search, status, from, to])

  if (apiStatus === 'loading') return <Loader />
  if (apiStatus === 'failed') return <div>Error: {error}</div>

  const handleSort = (field) => {
    // Check if the field is sortable
    if (
      ['id', 'createTime', 'totalPrice', 'supplier', 'supplierPhone'].includes(
        field,
      )
    ) {
      setSort((prevSort) => {
        const [currentField, currentDirection] = prevSort.split(',')
        const newDirection =
          currentField === field && currentDirection === 'asc' ? 'desc' : 'asc'
        return `${field},${newDirection}`
      })
    }
  }

  const handleChangePage = (e, p) => {
    setPageNumber(p)
  }

  const handleCloseDetails = () => {
    setItemDetails(null)
  }

  const handleEditClickOpen = async (id, status) => {
    const response = await AxiosAdmin.get(
      `${import.meta.env.VITE_API_URL}/InventoryReport/${id}`,
    )

    setCurrentInventory(response.data)
    if (status === 'DaNhapKho') {
      toast.error('Đã nhập kho không thể sửa')
      return
    }

    if (status === 'Huy') {
      toast.error('Đã hủy không thể sửa')
      return
    }

    setIsEditOpen(true)
  }

  const handleViewClickOpen = async (id) => {
    const response = await AxiosAdmin.get(
      `${import.meta.env.VITE_API_URL}/InventoryReport/${id}`,
    )

    setCurrentInventory(response.data)

    setIsViewOpen(true)
  }

  const handleEditOpen = () => {
    setIsEditOpen(!isEditOpen)
  }
  const handleViewOpen = () => {
    setIsViewOpen(!isViewOpen)
  }

  return (
    <>
      {itemDetails && (
        <DetailForm item={itemDetails} onClose={handleCloseDetails} />
      )}
      <section className="px-4 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle py-2 md:px-6 lg:px-8">
              <div className="border border-gray-200 dark:border-gray-700 overflow-hidden md:rounded-lg">
                {data?.content?.length === 0 ? (
                  <div className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                    Không có dữ liệu thỏa mãn yêu cầu tại thời điểm này
                  </div>
                ) : (
                  <>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400 max-w-xs"
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
                            className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 max-w-xs"
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
                            className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 max-w-xs whitespace-normal"
                          >
                            <button
                              className="flex items-center gap-x-2"
                              onClick={() => handleSort('totalPrice')}
                            >
                              Tổng giá trị
                              {sort.startsWith('totalPrice') && (
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
                            className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 max-w-xs truncate"
                          >
                            <button
                              className="flex items-center gap-x-2"
                              onClick={() => handleSort('supplier')}
                            >
                              Nhà cung cấp
                              {sort.startsWith('supplier') && (
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
                            className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 max-w-xs truncate"
                          >
                            Số điện thoại
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400 max-w-xs truncate"
                          >
                            Trạng thái
                          </th>
                          <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                            Xem
                          </th>
                          <th className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                            Sửa
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {data?.content?.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                              {item.id}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                              {item.createTime}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                              {formatCurrency(item.totalPrice)}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs whitespace-normal break-all">
                              {item.supplier}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                              {item.supplierPhone}
                            </td>
                            <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white max-w-xs truncate">
                              {statusTranslations[item.status] || item.status}
                            </td>
                            <td className="px-4 py-4 text-sm text-center align-middle">
                              <button
                                onClick={() => handleViewClickOpen(item.id)}
                                className="bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 px-4 focus:outline-none"
                              >
                                <IoEyeSharp size={20} />
                              </button>
                            </td>
                            <td className="px-4 py-4 text-sm text-center align-middle">
                              <button
                                onClick={() =>
                                  handleEditClickOpen(item.id, item.status)
                                }
                                className="bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 px-4 focus:outline-none"
                              >
                                <CiEdit size={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="py-3 flex items-center justify-center">
                      <Stack spacing={2}>
                        <Pagination
                          count={data?.totalPages}
                          page={pageNumber}
                          onChange={handleChangePage}
                          variant="outlined"
                          shape="rounded"
                        />
                      </Stack>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {currentInventory && (
        <div>
          <EditInventoryDialog
            open={isEditOpen}
            handleOpen={handleEditOpen}
            inventoryProps={currentInventory}
          />
          <ViewInventoryDialog
            open={isViewOpen}
            handleOpen={handleViewOpen}
            inventory={currentInventory}
          />
        </div>
      )}
    </>
  )
}

export default InventoryTable
