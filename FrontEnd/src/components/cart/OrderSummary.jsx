import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetailOrderByUser } from '../../reducers/shopping/OrderSlice'
import { Link } from 'react-router-dom'
import ShippingActivity from '../ingredient/ShippingActivity'
import {
  postOrderStatusByUserApiThunk,
  resetStatus,
} from '../../reducers/shopping/OrderStatusSlice'
import { alertSuccess } from '../sweeetalert/sweetalert'

const OrderSummary = () => {
  const { id } = useParams()
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

  useEffect(() => {
    dispatch(fetchDetailOrderByUser(id))
  }, [dispatch, id])

  const handleUpdateStatus = async (idStatus) => {
    const orderId = id
    dispatch(postOrderStatusByUserApiThunk({ orderId, idStatus }))
  }

  useEffect(() => {
    if (
      statusUpdateStatusOrder === 'succeededPostOrderStatusByUserApiThunk' &&
      id
    ) {
      dispatch(resetStatus())
      dispatch(fetchDetailOrderByUser(id))
      alertSuccess('Cập nhật trạng thái thành công!')
    }
  }, [statusUpdateStatusOrder])
  if (orderDetail === null) {
    return (
      <div className="text-center py-6">
        <h1 className="text-2xl md:text-4xl font-bold text-black">
          Đơn hàng không tồn tại
        </h1>
      </div>
    )
  }
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Chi tiết đơn hàng
            </h2>
            <ShippingActivity
              layout="user"
              orderStatuses={orderDetail?.orderStatuses}
              onUpdateStatus={handleUpdateStatus}
            />
            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {orderDetail?.orderDetails?.map((properties) => {
                      return (
                        <tr key={properties.shoeId}>
                          <td className="whitespace-nowrap py-4 md:w-[384px]">
                            <div className="flex items-center gap-4">
                              <a
                                href="#"
                                className="flex items-center aspect-square w-10 h-10 shrink-0"
                              >
                                <img
                                  className="h-auto w-full max-h-full dark:hidden"
                                  src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${properties.defaultImage}`}
                                  alt={properties.shoeId}
                                />
                              </a>
                              <span className="hover:underline text-wrap">
                                {properties.shoeName}
                              </span>
                            </div>
                          </td>

                          <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                            x{properties.quantity}
                          </td>

                          <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                            size: {properties.size}
                          </td>

                          <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                            {properties.total.toLocaleString('vi-VN')}đ
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Hóa đơn
                </h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Phí đơn hàng
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {orderDetail?.subtotalPrice.toLocaleString('vi-VN')}đ
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Phí vận chuyển
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        {orderDetail?.voucher?.isFreeShip
                          ? 'Miễn phí vận chuyển'
                          : `${orderDetail?.shippingFee.toLocaleString('vi-VN')}đ`}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-green-500 dark:text-gray-400">
                        Voucher
                      </dt>

                      {orderDetail?.voucher ? (
                        <dd className="text-base font-medium text-green-900 dark:text-white">
                          <div>
                            {`- ${orderDetail.voucher.discountAmount.toLocaleString('vi-VN')}đ`}
                          </div>
                        </dd>
                      ) : (
                        'Không áp dụng voucher'
                      )}
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                      Tổng
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      {orderDetail?.totalPrice.toLocaleString('vi-VN')}đ
                    </dd>
                  </dl>
                </div>

                <div className="gap-4 sm:flex sm:items-center">
                  <Link
                    to="/"
                    className="text-center w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    Trở về trang chủ
                  </Link>

                  <Link
                    to="/listOrderByUser"
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mt-0"
                  >
                    Danh sách đơn hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}
export default OrderSummary
