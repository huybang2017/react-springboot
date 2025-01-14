import { Modal } from 'flowbite-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailOrderByAdmin } from '../../../reducers/shopping/OrderSlice'
import ShippingActivity from '../../ingredient/ShippingActivity'
import {
  postOrderStatusByAdminApiThunk,
  resetStatus,
} from '../../../reducers/shopping/OrderStatusSlice'
import { alertSuccess } from '../../sweeetalert/sweetalert'

const OrderDetail = ({ openModalOrderDetail, setOpenModalOrderDetail, id }) => {
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

  const handleUpdateStatus = async (idStatus) => {
    dispatch(postOrderStatusByAdminApiThunk({ id, idStatus }))
  }
  useEffect(() => {
    if (id) {
      dispatch(fetchDetailOrderByAdmin(id))
    }
  }, [id])

  useEffect(() => {
    if (
      statusUpdateStatusOrder === 'succeededPostOrderStatusByAdminApiThunk' &&
      id
    ) {
      dispatch(resetStatus())
      dispatch(fetchDetailOrderByAdmin(id))
      alertSuccess('Cập nhật trạng thái thành công!')
    }
  }, [statusUpdateStatusOrder])
  return (
    <>
      <Modal
        size="5xl"
        show={openModalOrderDetail}
        onClose={() => {
          setOpenModalOrderDetail(false)
        }}
      >
        <Modal.Header>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Chi tiết đơn hàng
          </h2>
        </Modal.Header>
        <Modal.Body>
          <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mx-auto max-w-3xl">
                <ShippingActivity
                  layout="admin"
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

                              <td className="text-right text-base font-bold text-gray-900 dark:text-white">
                                {properties.total.toLocaleString('vi-VN')} VNĐ
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Thông tin khách hàng
                    </h4>
                    <div className="mt-4 space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Tên khách hàng
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {orderDetail?.userInformation?.fullname ||
                            'Không có dữ liệu'}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Ngày sinh
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {orderDetail?.userInformation?.birthday ||
                            'Không có dữ liệu'}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Số điện thoại
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {orderDetail?.userInformation?.phoneNumber ||
                            'Không có dữ liệu'}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Giới tính
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {orderDetail?.userInformation?.gender ||
                            'Không có dữ liệu'}
                        </dd>
                      </dl>
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-gray-500 dark:text-gray-400">
                          Địa chỉ giao hàng
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {orderDetail?.userInformation?.address ||
                            'Không có dữ liệu'}
                        </dd>
                      </dl>
                    </div>
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
                            {orderDetail?.subtotalPrice.toLocaleString('vi-VN')}{' '}
                            VNĐ
                          </dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-gray-500 dark:text-gray-400">
                            Phí vận chuyển
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            {orderDetail?.voucher?.isFreeShip
                              ? 'Miễn phí vận chuyển'
                              : `${orderDetail?.shippingFee.toLocaleString(
                                  'vi-VN',
                                )} VNĐ`}
                          </dd>
                        </dl>

                        {orderDetail?.note && (
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-gray-500 dark:text-gray-400">
                              Note
                            </dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">
                              {orderDetail.note}
                            </dd>
                          </dl>
                        )}

                        <dl className="flex items-center justify-between gap-4">
                          <dt className="text-green-500 dark:text-gray-400">
                            Voucher
                          </dt>
                          <dd className="text-base font-medium text-green-900 dark:text-white">
                            <div>
                              {orderDetail && orderDetail?.voucher ? (
                                <>
                                  <br />
                                  {orderDetail?.voucher.discountAmount
                                    ? `- ${orderDetail?.voucher.discountAmount.toLocaleString('vi-VN')} VNĐ`
                                    : ''}
                                </>
                              ) : (
                                'Không áp dụng voucher'
                              )}
                            </div>
                          </dd>
                        </dl>
                      </div>

                      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-lg font-bold text-gray-900 dark:text-white">
                          Tổng
                        </dt>
                        <dd className="text-lg font-bold text-gray-900 dark:text-white">
                          {orderDetail?.totalPrice.toLocaleString('vi-VN')} VNĐ
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default OrderDetail
