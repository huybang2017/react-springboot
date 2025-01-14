import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteAllCartItemApiThunk,
  getDataCartThunk,
} from '../../reducers/shopping/CartSlice'
import {
  getAccountAndUserInformationByIdApiThunk,
  updateAccountInformationUserApiThunk,
} from '../../reducers/auth/AccountSlice'
import { getNewestShippingFeesApiThunk } from '../../reducers/shopping/ShippingFeeSlice'
import {
  getVoucherByCodeApiThunk,
  resetStateVoucher,
} from '../../reducers/voucherReducer/VoucherSlice'
import { alertError, alertSave, alertSuccess } from '../sweeetalert/sweetalert'
import { createOrderByUser } from '../../reducers/shopping/OrderSlice'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: dataCartItem, status: statusCartItem } = useSelector(
    (state) => state.cartReducer,
  )
  const { accountDetail } = useSelector((state) => state.accountReducer)
  const { data: shippingFee } = useSelector((state) => state.shippingFees)
  const { data: dataVoucher, status: statusVoucher } = useSelector(
    (state) => state.vouchers,
  )
  const { data: dataOrder, status: statusOrder } = useSelector(
    (state) => state.orderReducer,
  )

  const ACCOUNT_ID = sessionStorage.getItem('id')

  const [selectedVoucher, setSelectedVoucher] = useState(null)

  useEffect(() => {
    dispatch(getDataCartThunk(ACCOUNT_ID))
  }, [dispatch, ACCOUNT_ID])

  useEffect(() => {
    dispatch(getDataCartThunk(ACCOUNT_ID))
    dispatch(getAccountAndUserInformationByIdApiThunk(ACCOUNT_ID))
  }, [dispatch, ACCOUNT_ID])

  useEffect(() => {
    dispatch(getNewestShippingFeesApiThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    accountId: ACCOUNT_ID,
    fullname: '',
    address: '',
    phoneNumber: '',
  })

  const [errors, setErrors] = useState({
    fullname: '',
    address: '',
    phoneNumber: '',
  })

  const timeoutRef = useRef(null) // Tham chiếu để lưu trữ timeout

  useEffect(() => {
    if (accountDetail) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fullname: accountDetail.fullname || '',
        // email: accountDetail.email || '',
        address: accountDetail.address || '',
        phoneNumber: accountDetail.phoneNumber || '',
      }))
    }
  }, [accountDetail])

  const handleInputChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    if (value.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        [name]: 'Trường này là bắt buộc.',
      }))
    } else {
      // Kiểm tra số điện thoại
      if (name === 'phoneNumber') {
        const phoneRegex = /^[0-9]{10,}$/ // Chỉ cho phép số có 10 chữ số trở lên
        if (!phoneRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [name]: 'Số điện thoại không hợp lệ. Vui lòng nhập lại.',
          }))
        } else {
          setErrors((prev) => ({
            ...prev,
            [name]: '',
          }))
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }))
      }
    }

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        dispatch(updateAccountInformationUserApiThunk(updatedFormData))
      }, 1000)

      return updatedFormData
    })
  }

  const handleSubmitAddOrder = async (e) => {
    e.preventDefault()
    const voucherId = selectedVoucher ? selectedVoucher.voucherId : null

    const payload = {
      accountId: ACCOUNT_ID,
      type: 'Web',
      shippingFee: shippingFee?.fee || 0,
      voucherId: voucherId,
      note: e.target.note.value,
      subtotalPrice: dataCartItem.reduce((acc, item) => acc + item.total, 0),
      totalPrice: calculateTotalPrice(),
      listOrderDetail: dataCartItem.map(
        ({ idShoeId: shoeId, idSize, unitPrice, quantity, total }) => ({
          shoeId,
          idSize,
          unitPrice,
          quantity,
          total,
        }),
      ),
    }
    const result = await alertSave()
    if (result) {
      dispatch(createOrderByUser(payload))
    } else {
      return
    }
  }

  const [idDataOrder, setIdDataOrder] = useState(null)
  const [orderCreated, setOrderCreated] = useState(false)

  useEffect(() => {
    if (statusOrder === 'succeededCreateOrderByUser' && !orderCreated) {
      setIdDataOrder(dataOrder.id)
      setOrderCreated(true) // Đánh dấu đã tạo order thành công
      dispatch(deleteAllCartItemApiThunk(ACCOUNT_ID))
    } else if (statusOrder === 'failedCreateOrderByUser') {
      alertError('Lỗi hệ thống')
    }
  }, [statusOrder, ACCOUNT_ID, orderCreated])

  useEffect(() => {
    if (
      statusCartItem === 'succeededDeleteAllCartItemApiThunk' &&
      orderCreated
    ) {
      navigate(`/orders/${idDataOrder}`, { replace: true })
      setOrderCreated(false) // Reset trạng thái để không gọi lại
    }
  }, [statusCartItem, idDataOrder, orderCreated])

  const calculateTotalPrice = () => {
    let total = dataCartItem.reduce((acc, item) => acc + item.total, 0)
    if (selectedVoucher) {
      const currentDate = new Date()
      const expirationTime = selectedVoucher.expirationTime
      if (expirationTime) {
        const [time, date] = expirationTime.split(' ')
        const [day, month, year] = date.split('/')
        const formattedDate = `${year}-${month}-${day}T${time}`
        const expirationDate = new Date(formattedDate)

        if (currentDate <= expirationDate) {
          if (total >= selectedVoucher.condition) {
            total -= selectedVoucher.discountAmount
          }
          if (selectedVoucher.isFreeShip) {
            // Không tính phí vận chuyển
          } else if (shippingFee?.fee) {
            total += shippingFee.fee
          }
        } else if (shippingFee?.fee) {
          total += shippingFee.fee
        }
      }
    } else if (shippingFee?.fee) {
      total += shippingFee.fee
    }

    if (total < 0) {
      total = 0
    }

    return total
  }

  const handleSubmitCodeVoucher = (e) => {
    e.preventDefault()
    const code = document.getElementById('voucher').value
    dispatch(getVoucherByCodeApiThunk(code))
  }
  const parseExpirationTime = (expirationTime) => {
    // Chia nhỏ chuỗi "22:46:00 31/10/2024" thành các phần riêng biệt
    const [time, date] = expirationTime.split(' ')
    const [day, month, year] = date.split('/')

    // Tạo lại chuỗi theo định dạng hợp lệ: "YYYY-MM-DDTHH:mm:ss"
    return new Date(`${year}-${month}-${day}T${time}`)
  }

  useEffect(() => {
    if (dataVoucher && statusVoucher === 'succeededGetVoucherByCodeApiThunk') {
      if (dataVoucher.code === 1) {
        alertError('Không có voucher này')
        return
      }
      if (
        dataCartItem.reduce((acc, item) => acc + item.total, 0) >=
        dataVoucher.condition
      ) {
        if (parseExpirationTime(dataVoucher.expirationTime) < new Date()) {
          alertError('Voucher đã hết hạn')
          return
        }
        setSelectedVoucher(dataVoucher)
        dispatch(resetStateVoucher())
        alertSuccess('Áp dụng voucher thành công')
      } else {
        alertError('Không đủ điều kiện để áp dụng voucher')
      }
    } else if (
      dataVoucher &&
      statusVoucher === 'failedGetVoucherByCodeApiThunk'
    ) {
      alertError('Voucher không tồn tại')
    }
  }, [dispatch, dataVoucher, statusVoucher])

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <form
          onSubmit={handleSubmitAddOrder}
          className="mx-auto max-w-screen-xl px-4 2xl:px-0"
        >
          <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-blue-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
              <span className="w-32 flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Giỏ hàng
              </span>
            </li>

            <li className="flex shrink-0 items-center text-blue-700 dark:text-blue-500">
              <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg
                  className="me-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Thanh toán
              </span>
            </li>
          </ol>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sản phẩm trong giỏ hàng
                </h2>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {dataCartItem.map((item) => (
                    <li key={item.idShoeId} className="flex py-4">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${item.image}`}
                        // src="../../../public/image/images.jpg"
                        alt={item.image}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.shoeDetails.shoeName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Số lượng: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Giá: {item.total.toLocaleString()} VNĐ
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Thông tin giao hàng
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="fullname"
                      className={`block w-full rounded-lg border ${
                        errors.fullname ? 'border-red-500' : 'border-gray-300'
                      } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      placeholder="Hãy nhập họ tên người nhận hàng"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.fullname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullname}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <label
                        htmlFor="select-country-input-3"
                        className="block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Địa chỉ*
                      </label>
                    </div>
                    <input
                      name="address"
                      placeholder="Hãy nhập địa chỉ giao hàng"
                      className={`block w-full rounded-lg border ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone-input-3"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số điện thoại*
                    </label>
                    <div className="flex items-center relative">
                      <div className="relative w-full">
                        <input
                          type="number"
                          name="phoneNumber"
                          id="phone-input"
                          className={`block w-full rounded-lg border ${
                            errors.phoneNumber
                              ? 'border-red-500'
                              : 'border-gray-300'
                          } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Hãy nhập số điện thoại"
                          required
                        />
                        {errors.phoneNumber && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="space-y-4"> */}
              {/*   <h3 className="text-xl font-semibold text-gray-900 dark:text-white"> */}
              {/*     Phương thức vận chuyển */}
              {/*   </h3> */}
              {/**/}
              {/*   <div className="grid grid-cols-1 gap-4 md:grid-cols-3"> */}
              {/*     <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"> */}
              {/*       <div className="flex items-start"> */}
              {/*         <div className="flex h-5 items-center"> */}
              {/*           <input */}
              {/*             id="dhl" */}
              {/*             aria-describedby="dhl-text" */}
              {/*             type="checkbox" */}
              {/*             name="delivery-method" */}
              {/*             value={shippingFee?.id} */}
              {/*             className="h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600" */}
              {/*             checked */}
              {/*           /> */}
              {/*         </div> */}
              {/**/}
              {/*         <div className="ms-4 text-sm"> */}
              {/*           <label */}
              {/*             htmlFor="dhl" */}
              {/*             className="font-medium leading-none text-gray-900 dark:text-white" */}
              {/*           > */}
              {/*             {shippingFee?.fee} VNĐ */}
              {/*           </label> */}
              {/*           <p */}
              {/*             id="dhl-text" */}
              {/*             className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400" */}
              {/*           > */}
              {/*             Phí vận chuyển */}
              {/*           </p> */}
              {/*         </div> */}
              {/*       </div> */}
              {/*     </div> */}
              {/*   </div> */}
              {/* </div> */}

              <div className="space-y-4">
                <dl className="py-3">
                  <label
                    htmlFor="note"
                    className="text-base font-normal text-gray-500 dark:text-gray-400"
                  >
                    Note
                  </label>
                  <input
                    type="textare"
                    id="note"
                    name="note"
                    className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Ghi chú về đơn hàng"
                  />
                </dl>
              </div>
            </div>

            <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="my-3 divide-y divide-gray-200 dark:divide-gray-800">
                  <div>
                    <div className="flex max-w-md items-center gap-4 my-3">
                      <input
                        type="text"
                        id="voucher"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Code voucher"
                      />
                      <button
                        type="button"
                        onClick={(e) => handleSubmitCodeVoucher(e)}
                        className="flex items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tạm tính
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {dataCartItem
                        .reduce((acc, item) => acc + item.total, 0)
                        .toLocaleString()}{' '}
                      VNĐ
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Tiền vận chuyển
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {shippingFee?.fee && !selectedVoucher?.isFreeShip
                        ? `${shippingFee.fee.toLocaleString()} VNĐ`
                        : 'Miễn phí'}
                    </dd>
                  </dl>

                  {selectedVoucher ? (
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400 mr-5">
                        Voucher
                      </dt>
                      <dd className="flex text-base font-medium text-gray-900 dark:text-white">
                        {dataCartItem.reduce(
                          (acc, item) => acc + item.total,
                          0,
                        ) >= selectedVoucher.condition
                          ? `- ${selectedVoucher.discountAmount.toLocaleString()} VNĐ`
                          : `Không đủ điều kiện (Cần tối thiểu ${selectedVoucher.condition.toLocaleString()} VNĐ)`}
                      </dd>
                    </dl>
                  ) : null}

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      {(() => {
                        const currentDate = new Date()

                        let total = dataCartItem.reduce(
                          (acc, item) => acc + item.total,
                          0,
                        )

                        if (selectedVoucher) {
                          const expirationTime = selectedVoucher?.expirationTime

                          // Kiểm tra nếu expirationTime tồn tại
                          if (expirationTime) {
                            // Tách expirationTime thành ngày và giờ
                            const [time, date] = expirationTime.split(' ')

                            // Tách ngày thành [ngày, tháng, năm]
                            const [day, month, year] = date.split('/')

                            // Tạo lại chuỗi ngày theo định dạng YYYY-MM-DD
                            const formattedDate = `${year}-${month}-${day}T${time}`

                            // Tạo đối tượng Date từ chuỗi đã format
                            const expirationDate = new Date(formattedDate)

                            // Kiểm tra nếu voucher còn hạn
                            if (currentDate <= expirationDate) {
                              // Kiểm tra điều kiện tổng tiền để áp dụng giảm giá
                              if (total >= selectedVoucher.condition) {
                                total -= selectedVoucher.discountAmount
                              }

                              // Kiểm tra điều kiện miễn phí vận chuyển
                              if (selectedVoucher.isFreeShip) {
                                total += 0 // Không tính phí vận chuyển
                              } else if (shippingFee?.fee) {
                                total += shippingFee.fee
                              }
                            } else if (shippingFee?.fee) {
                              total += shippingFee.fee
                            }
                          }
                        } else if (shippingFee?.fee) {
                          total += shippingFee.fee
                        }

                        if (total < 0) {
                          total = 0
                        }

                        return `${total.toLocaleString()} VNĐ`
                      })()}
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}
export default Checkout
