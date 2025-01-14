import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListOrderByAdmin } from '../../../reducers/shopping/OrderSlice'
import { useState } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import {
  postOrderStatusByAdminApiThunk,
  resetStatus,
} from '../../../reducers/shopping/OrderStatusSlice'
import {
  alertError,
  alertSave,
  alertSuccess,
} from '../../../components/sweeetalert/sweetalert.jsx'
import Loader from '../../loader/Loader.jsx'
const TableOrder = ({ setOpenModalOrderDetail, setId, params, setParams }) => {
  const dispatch = useDispatch()
  const {
    orders: dataOrder,
    orderDetail,
    status: statusOrder,
    error: errorOrder,
  } = useSelector((state) => state.orderReducer)
  const {
    data: dataOrderStatus,
    status: statusUpdateStatusOrder,
    error: errorStatusOrder,
  } = useSelector((state) => state.orderStatusReducer)

  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: '',
  })

  const handleUpdateStatus = async (id, idStatus) => {
    if (idStatus === 'Huy') {
      const flagCheck = await alertSave()
      if (!flagCheck) {
        return
      } else {
        dispatch(postOrderStatusByAdminApiThunk({ id, idStatus }))
      }
    } else {
      dispatch(postOrderStatusByAdminApiThunk({ id, idStatus }))
    }
  }

  useEffect(() => {
    dispatch(fetchListOrderByAdmin(params))
  }, [dispatch, params])

  useEffect(() => {
    if (statusUpdateStatusOrder === 'succeededPostOrderStatusByAdminApiThunk') {
      dispatch(fetchListOrderByAdmin(params))
      alertSuccess('Cập nhật trạng thái đơn hàng thành công!')
      dispatch(resetStatus())
    } else if (
      statusUpdateStatusOrder === 'failedPostOrderStatusByAdminApiThunk'
    ) {
      alertError(errorStatusOrder.detailMessage)
      dispatch(resetStatus())
    }
  }, [statusUpdateStatusOrder])

  const handlePageChange = (event, pageNumber) => {
    setParams((prevParams) => ({
      ...prevParams,
      pageNumber: pageNumber,
    }))
    setCurrentPage(pageNumber)
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    setParams((prevParams) => ({
      ...prevParams,
      sort: `${key},${direction}`,
    }))
  }

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '▲' : '▼'
    }
    return null
  }

  return (
    <>
      <section className="bg-white antialiased dark:bg-gray-900">
        <div className="mx-auto h-full">
          <div className="mx-auto">
            {statusOrder === 'loading' && <Loader />}
            {statusOrder === 'failed' && <p>Error: {errorOrder}</p>}

            <div className="flow-root">
              <div className="overflow-x-auto">
                {dataOrder?.content && dataOrder?.content.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer"
                          onClick={() => handleSort('id')}
                        >
                          Mã đơn hàng {getSortIcon('id')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer"
                          onClick={() => handleSort('orderDate')}
                        >
                          Ngày {getSortIcon('orderDate')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer"
                          onClick={() => handleSort('userInformationFullname')}
                        >
                          Họ và tên {getSortIcon('fullname')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer"
                          onClick={() =>
                            handleSort('userInformationPhoneNumber')
                          }
                        >
                          SĐT {getSortIcon('phoneNumber')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 cursor-pointer"
                          onClick={() => handleSort('totalPrice')}
                        >
                          Phí phải trả {getSortIcon('totalPrice')}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                        >
                          Trạng thái đơn hàng
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                        >
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                      {dataOrder?.content?.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">
                              {order.id}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {order.orderDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {order.fullname}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {order.phoneNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {order.totalPrice.toLocaleString('vi-VN')} VNĐ
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex rounded px-2.5 py-0.5 text-xs font-medium ${
                                order.status === 'Huy'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                  : order.status === 'ChoDuyet'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                    : order.status === 'DaDuyet'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                      : order.status === 'DangGiao'
                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                        : order.status === 'GiaoThanhCong'
                                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                              }`}
                            >
                              {order.status === 'Huy'
                                ? 'Hủy'
                                : order.status === 'ChoDuyet'
                                  ? 'Chờ duyệt'
                                  : order.status === 'DaDuyet'
                                    ? 'Đã duyệt'
                                    : order.status === 'DangGiao'
                                      ? 'Đang giao'
                                      : 'Giao thành công'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <div className="space-x-2">
                              {order.status !== 'Huy' &&
                                order.status !== 'DangGiao' &&
                                order.status !== 'DaDuyet' &&
                                order.status !== 'GiaoThanhCong' && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleUpdateStatus(order.id, 'Huy')
                                    }
                                    className="w-full rounded-lg border px-3 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto 
                                                  border-red-700 text-red-700 hover:bg-red-700 hover:text-white focus:ring-red-300 
                                                  dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                  >
                                    Hủy đơn hàng
                                  </button>
                                )}

                              {order.status === 'ChoDuyet' && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateStatus(order.id, 'DaDuyet')
                                  }
                                  className="w-full rounded-lg border px-3 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto 
    border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-blue-300 
    dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-900"
                                >
                                  Duyệt đơn hàng
                                </button>
                              )}

                              {order.status === 'DaDuyet' && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateStatus(order.id, 'DangGiao')
                                  }
                                  className="w-full rounded-lg border px-3 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto 
    border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-white focus:ring-yellow-300 
    dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-600 dark:hover:text-white dark:focus:ring-yellow-900"
                                >
                                  Giao cho shipper
                                </button>
                              )}

                              {order.status === 'DangGiao' && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateStatus(
                                      order.id,
                                      'GiaoThanhCong',
                                    )
                                  }
                                  className="w-full rounded-lg border px-3 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto 
    border-green-700 text-green-700 hover:bg-green-700 hover:text-white focus:ring-green-300 
    dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-900"
                                >
                                  Hoàn tất đơn hàng
                                </button>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenModalOrderDetail(true)
                                  setId(order.id)
                                }}
                                className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                              >
                                Chi tiết
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Không có đơn hàng nào.</p>
                )}
              </div>
              <div className="flex items-center justify-center mt-10 pb-10">
                <Stack spacing={2}>
                  <Pagination
                    count={dataOrder?.totalPages}
                    page={params.pageNumber}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default TableOrder
