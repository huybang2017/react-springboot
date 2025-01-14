import { useDispatch, useSelector } from 'react-redux'
import { fetchListOrderByUser } from '../../reducers/shopping/OrderSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { postOrderStatusByUserApiThunk } from '../../reducers/shopping/OrderStatusSlice'

const ListOrderUser = () => {
  const dispatch = useDispatch()
  const {
    orders: dataOrder,
    status: statusOrder,
    error: errorOrder,
  } = useSelector((state) => state.orderReducer)
  const { status } = useSelector((state) => state.orderStatusReducer)

  useEffect(() => {
    dispatch(fetchListOrderByUser())
  }, [dispatch])
  const handleConfirmReceived = (id, status) => {
    if (status === 'ChoDuyet') {
      dispatch(postOrderStatusByUserApiThunk({ orderId: id, idStatus: 'Huy' }))
    }
    // else if (status === 'DangGiao') {
    //   dispatch(
    //     postOrderStatusByUserApiThunk({
    //       orderId: id,
    //       idStatus: 'GiaoThanhCong',
    //     }),
    //   )
    // }
  }

  useEffect(() => {
    if (status === 'succeededPostOrderStatusByUserApiThunk') {
      dispatch(fetchListOrderByUser())
    }
  }, [status])

  return (
    <>
      <section className="container bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl 2xl:px-0">
          <div className="mx-auto">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Đơn hàng của bạn
              </h2>
            </div>

            {statusOrder === 'loading' && <p>Loading orders...</p>}
            {statusOrder === 'failed' && <p>Error: {errorOrder}</p>}

            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {dataOrder && dataOrder.length > 0 ? (
                  dataOrder.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-wrap items-center gap-y-4 py-6"
                    >
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Mã đơn hàng:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <a href="#" className="hover:underline">
                            {order.id}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Ngày:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white mr-2">
                          {order.orderDate}
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Tổng đơn hàng:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {order.subtotalPrice.toLocaleString('vi-VN')}đ
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Phí phải trả:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {order.totalPrice.toLocaleString('vi-VN')}đ
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Trạng thái đơn hàng:
                        </dt>

                        <dd
                          className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
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
                                  : order.status === 'GiaoThanhCong'
                                    ? 'Giao thành công'
                                    : 'Chờ duyệt'}
                        </dd>
                      </dl>

                      <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                        {order.status !== 'Huy' &&
                          order.status !== 'DangGiao' &&
                          order.status !== 'DaDuyet' &&
                          order.status !== 'GiaoThanhCong' && (
                            <button
                              type="button"
                              className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                              onClick={() =>
                                handleConfirmReceived(order.id, order.status)
                              }
                            >
                              Hủy
                            </button>
                          )}

                        {/* {order.status === 'DangGiao' && (
                          <button
                            type="button"
                            className="w-full rounded-lg border border-green-700 px-3 py-2 text-center text-sm font-medium text-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-900 lg:w-auto"
                            onClick={() =>
                              handleConfirmReceived(order.id, order.status)
                            }
                          >
                            Xác nhận đã nhận hàng
                          </button>
                        )} */}
                        <Link
                          to={`/feedback/${order.id}`}
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                        >
                          Đánh giá
                        </Link>
                        <Link
                          to={`/orders/${order.id}`}
                          className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                        >
                          Chi tiết
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No orders found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ListOrderUser
