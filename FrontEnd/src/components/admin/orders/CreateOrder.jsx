import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShoesApiThunk } from '../../../reducers/productReducer/ShoeSlice'
import {
  getVoucherByCodeApiThunk,
  resetStateVoucher,
} from '../../../reducers/voucherReducer/VoucherSlice'
import { Pagination, Stack } from '@mui/material'
import { Modal } from 'flowbite-react'
import AxiosAdmin from '../../../apis/AxiosAdmin'
import { alertError, alertSuccess } from '../../sweeetalert/sweetalert'
import { IoClose } from 'react-icons/io5'

const CreateOrder = () => {
  const dispatch = useDispatch()
  const {
    data: dataShoe,
    loading,
    error,
  } = useSelector((state) => state.shoeReducer)
  const { checkEmail } = useSelector((state) => state.accountReducer)
  const { data: dataVoucher } = useSelector((state) => state.vouchers)

  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageDataShoe, setPageDataShoe] = useState(1)
  const [pageUserInformation, setPageUserInformation] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [shippingFee, setShippingFee] = useState(0)
  const [voucherCode, setVoucherCode] = useState('')
  const [note, setNote] = useState('')
  const [timeoutId, setTimeoutId] = useState(null)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [dataUserInformation, setDataUserInformation] = useState([])
  const [searchSDT, setSearchSDT] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showInformationInput, setShowInformationInput] = useState(false)
  const [sizes, setSizes] = useState([])
  const [selectedSizes, setSelectedSizes] = useState({})

  const handleChangeDataShoe = (event, value) => {
    setPageDataShoe(value)
  }

  const handleChangeUserInformation = (event, value) => {
    setPageUserInformation(value)
  }

  useEffect(() => {
    dispatch(
      getShoesApiThunk({
        pageSize: 6,
        pageNumber: pageDataShoe,
        search: searchTerm,
      })
    )
  }, [dispatch, pageDataShoe, searchTerm])

  const handleAddToCart = (shoe) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.shoeId === shoe.shoeId)
      if (existingItem) {
        return prevItems.map((item) =>
          item.shoeId === shoe.shoeId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, { ...shoe, quantity: 1 }]
      }
    })
  }

  const handleRemoveFromCart = (shoeId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.shoeId !== shoeId)
    )

    setSizes((prevSizes) => {
      const updatedSizes = { ...prevSizes }
      delete updatedSizes[shoeId]
      return updatedSizes
    })

    setSelectedSizes((prevSelectedSizes) => {
      const updatedSelectedSizes = { ...prevSelectedSizes }
      delete updatedSelectedSizes[shoeId]
      return updatedSelectedSizes
    })
  }

  const handleUpdateQuantity = (shoeId, newQuantity) => {
    const selectedSize = selectedSizes[shoeId]
    const selectedSizeObject = sizes[shoeId]?.find(
      (size) => +size.size === +selectedSize
    )
    const maxQuantity = selectedSizeObject?.quantity

    if (newQuantity > maxQuantity) {
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.shoeId === shoeId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleNoteChange = (event) => {
    const value = event.target.value
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const id = setTimeout(() => {
      setNote(value)
    }, 500)
    setTimeoutId(id)
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const handleSDTChange = (e) => {
    const value = e.target.value
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const id = setTimeout(() => {
      setPageUserInformation(1)
      setSearchSDT(value)
    }, 500)
    setTimeoutId(id)
  }

  const handleSelectAccount = (accountId) => {
    if (selectedAccount === accountId) {
      setSelectedAccount(null)
    } else {
      setSelectedAccount(accountId)
    }
  }

  const handleVoucherChange = (e) => {
    const value = e.target.value
    setVoucherCode(value)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const id = setTimeout(() => {
      dispatch(getVoucherByCodeApiThunk(value))
    }, 1000)
    setTimeoutId(id)
  }

  const handleFullNameChange = (event) => {
    const value = event.target.value
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const newTimeoutId = setTimeout(() => {
      setFullName(value)
    }, 500)
    setTimeoutId(newTimeoutId)
  }

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const newTimeoutId = setTimeout(() => {
      setPhoneNumber(value)
    }, 500)
    setTimeoutId(newTimeoutId)
  }

  useEffect(() => {
    const fetchUserInformation = async (pageSize, pageNumber, search) => {
      try {
        const response = await AxiosAdmin.get(`/UserInformation`, {
          params: {
            pageSize,
            pageNumber,
            search,
          },
        })
        setDataUserInformation(response.data)
      } catch (error) {
        console.log('Failed to fetch data: ', error)
      }
    }

    fetchUserInformation(8, pageUserInformation, searchSDT)
  }, [pageUserInformation, searchSDT])

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const selectedSize = +selectedSizes[item.shoeId]
      const selectedSizeObject = sizes[item.shoeId]?.find(
        (size) => +size.size === selectedSize
      )

      const price = selectedSizeObject
        ? selectedSizeObject.price
        : item.lowestPrice
      return total + price * item.quantity
    }, 0)
  }

  const calculateDiscountAmount = () => {
    if (dataVoucher) {
      return dataVoucher.isFreeShip ? 0 : dataVoucher.discountAmount
    }
    return 0
  }

  const calculateTotal = (subtotal, discountAmount) => {
    if (dataVoucher && subtotal >= dataVoucher.condition) {
      return subtotal - discountAmount
    }
    return subtotal + shippingFee
  }

  const handleRemoveVoucher = () => {
    dispatch(resetStateVoucher())
    setVoucherCode('')
  }

  const subtotal = calculateSubtotal()
  const discountAmount = calculateDiscountAmount()
  const total = calculateTotal(subtotal, discountAmount)

  const handleOpenInformationInput = () => {
    setShowInformationInput(!showInformationInput)
  }
  const handleSave = async () => {
    if (selectedAccount) {
      alertSuccess('Lưu thông tin thành công')
    } else if (showInformationInput && fullName && phoneNumber) {
      try {
        const formData = new FormData()
        formData.append('fullname', fullName)
        formData.append('phoneNumber', phoneNumber)
        const response = await AxiosAdmin.post('UserInformation', formData)
        if (response.status === 200) {
          dataUserInformation.content.push(response.data)
          setSelectedAccount(response.data.id)
          setShowInformationInput(false)
          alertSuccess('Tạo thông tin thành công')
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alertError('Vui lòng chọn hoặc tạo thông tin')
    }

    setOpenModal(false)
  }

  const getCurrentShippingFee = async () => {
    try {
      const res = await AxiosAdmin.get('/ShippingFee/Newest')
      setShippingFee(res.data.fee)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentShippingFee()
  }, [])

  const handleSizeChange = (shoeId, selectedSize) => {
    setSelectedSizes((prevSelected) => ({
      ...prevSelected,
      [shoeId]: selectedSize,
    }))
  }

  const fetchSize = async (shoeId) => {
    try {
      const response = await AxiosAdmin.get(`/Shoe/Admin/${shoeId}`)
      const data = response.data.shoeSizes
      setSizes((prevSizes) => ({ ...prevSizes, [shoeId]: data }))
    } catch (error) {
      console.error('Lỗi khi lấy size:', error)
    }
  }

  useEffect(() => {
    cartItems.forEach((item) => {
      if (item.shoeId) {
        fetchSize(item.shoeId)
      }
    })
  }, [cartItems])

  const checkSelectedSize = (shoeId) => {
    return !!selectedSizes[shoeId]
  }
  const hasUnselectedSize = cartItems.some(
    (item) => !checkSelectedSize(item.shoeId)
  )

  const handlePayment = async () => {
    try {
      const formData = new FormData()

      if (hasUnselectedSize || cartItems.length === 0 || !selectedAccount) {
        return
      }
      if (dataVoucher.length !== 0) {
        console.log(dataVoucher)
        formData.append('voucherCode', dataVoucher.voucherId)
      }
      if (note) {
        formData.append('note', note)
      }
      if (shippingFee) {
        formData.append('shippingFee', shippingFee)
      }
      formData.append('userInformationId', selectedAccount)
      formData.append('type', 'Facebook')
      cartItems.forEach((item, index) => {
        const selectedSize = +selectedSizes[item.shoeId]

        const selectedSizeObject = sizes[item.shoeId]?.find(
          (size) => +size.size === selectedSize
        )

        const unitPrice = selectedSizeObject
          ? selectedSizeObject.price
          : item.lowestPrice
        const quantity = item.quantity

        formData.append(`listOrderDetail[${index}].shoeId`, item.shoeId)
        formData.append(`listOrderDetail[${index}].idSize`, selectedSize)
        formData.append(`listOrderDetail[${index}].unitPrice`, unitPrice)
        formData.append(`listOrderDetail[${index}].quantity`, quantity)
        formData.append(`listOrderDetail[${index}].total`, unitPrice * quantity)
      })
      formData.append('subtotalPrice', subtotal)
      formData.append('totalPrice', total)
      const res = await AxiosAdmin.post('/Order/Admin', formData)
      console.log(res)
      if (res.status === 200) {
        console.log(formData)
        alertSuccess('Thanh toán thành công')
        setCartItems([])
        setSizes([])
        setSelectedAccount(null)
        setSelectedSizes({})
      }
    } catch (error) {
      alertError('Thanh toán không thành công')
      console.log(error)
    }
  }
  return (
    <>
      <div>
        <div>
          <h1 className="text-center mb-10 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            TẠO ĐƠN HÀNG
          </h1>
        </div>
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-6">
            <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Thông tin sản phẩm
            </h1>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {dataShoe?.content?.length > 0 ? (
                dataShoe.content.map((item) => {
                  const originalPrice = item.originalPrice || item.lowestPrice
                  const discount = item.sale
                    ? Math.round((1 - item.lowestPrice / originalPrice) * 100)
                    : 0
                  const discountedPrice = item.lowestPrice

                  return (
                    <div
                      onClick={() => handleAddToCart(item)}
                      key={item.shoeId}
                      className="cursor-pointer relative rounded-none border border-black"
                    >
                      {item.sale && (
                        <div className="absolute top-1 left-1 bg-rose-500 text-white p-1 rounded-md">
                          Sale {discount}%
                        </div>
                      )}
                      <div className="w-full h-64">
                        <img
                          className="w-full h-full object-cover"
                          src={`${
                            import.meta.env.VITE_API_URL
                          }/ShoeImage/Image/${item.defaultImage}`}
                          alt={item.shoeName}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-[8px] md:text-xs font-bold text-gray-900">
                            {item.numberOfShoeSize} sizes
                          </span>
                          <div className="flex space-x-4">
                            {item.top3Size?.map((size) => (
                              <span
                                key={size}
                                className="text-[8px] md:text-xs font-medium bg-zinc-300 flex items-center justify-center text-gray-900 w-5 h-5 md:w-6 md:h-6 p-1 rounded-full"
                              >
                                {size}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button>
                          <h5 className="text-left text-xs md:text-sm font-semibold tracking-tight text-gray-900 mt-2">
                            {item.shoeName}
                          </h5>
                        </button>
                        {item.sale ? (
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs md:text-sm font-bold tracking-tight">
                              <span className="line-through">
                                {originalPrice.toLocaleString('vi-VN')} VNĐ
                              </span>
                              <span className="ml-2 text-rose-500">
                                {discountedPrice.toLocaleString('vi-VN')} VNĐ
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs md:text-sm font-bold tracking-tight">
                              {originalPrice.toLocaleString('vi-VN')} VNĐ
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="col-span-3 text-center text-gray-500 mt-5">
                  Không có sản phẩm nào.
                </div>
              )}
            </div>

            {dataShoe?.content?.length > 0 && (
              <div className="flex justify-center items-center mt-5">
                <Stack spacing={2}>
                  <Pagination
                    count={dataShoe?.totalPages}
                    page={pageDataShoe}
                    onChange={handleChangeDataShoe}
                    shape="rounded"
                    variant="outlined"
                  />
                </Stack>
              </div>
            )}
          </div>
          <div className="col-span-4">
            <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Thanh toán
            </h1>
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <p>Giỏ hàng trống</p>
              ) : (
                cartItems.map((item) => {
                  const selectedSize = +selectedSizes[item.shoeId]
                  const selectedSizeObject = sizes[item.shoeId]?.find(
                    (size) => +size.size === selectedSize
                  )

                  const price = selectedSizeObject
                    ? selectedSizeObject.price
                    : item.lowestPrice
                  return (
                    <div key={item.shoeId} className="flex justify-between">
                      <div className="flex items-center gap-5">
                        <img
                          src={`${
                            import.meta.env.VITE_API_URL
                          }/ShoeImage/Image/${item.defaultImage}`}
                          className="w-12 h-12"
                          alt="img"
                        />
                        <p>{price} VNĐ</p>
                      </div>
                      <div>
                        <select
                          value={selectedSizes[item.shoeId] || ''}
                          onChange={(e) =>
                            handleSizeChange(item.shoeId, e.target.value)
                          }
                          className="border border-gray-300 p-2 rounded"
                        >
                          <option value="" disabled>
                            Chọn size
                          </option>
                          {sizes[item.shoeId]
                            ?.filter(
                              (size) =>
                                size.quantity > 0 && size.status === true
                            )
                            .map((size) => (
                              <option key={size.size} value={size.size}>
                                {size.size}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.shoeId, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                          className="px-2 py-1 bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.shoeId, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveFromCart(item.shoeId)}
                          className="ml-4 text-red-600"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  )
                })
              )}

              {hasUnselectedSize && (
                <p className="text-red-500">Vui lòng chọn kích thước!</p>
              )}
              {!selectedAccount && (
                <p className="text-red-500">
                  Vui lòng chọn thông tin đơn hàng!
                </p>
              )}

              <div className="mt-4">
                <span className="text-xl font-bold">Giá tạm tính: </span>
                <span>{subtotal} VNĐ</span>
              </div>

              <div>
                {dataVoucher && subtotal >= dataVoucher.condition ? (
                  <>
                    <div>
                      <span className="text-xl font-bold">Giảm giá: </span>
                      <span>{discountAmount} VNĐ</span>
                      {dataVoucher.isFreeShip && <span>(Freeship)</span>}
                    </div>
                  </>
                ) : null}
              </div>

              {dataVoucher?.isFreeShip ? null : (
                <div>
                  <span className="text-xl font-bold">Phí ship: </span>
                  <span>{shippingFee} VNĐ</span>
                </div>
              )}

              <div>
                <span className="text-xl font-bold">Tổng tính: </span>
                <span>{total} VNĐ</span>
              </div>

              <div className="mb-6 flex items-end justify-center gap-5">
                <div className="w-full">
                  <label
                    htmlFor="vocher"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mã voucher
                  </label>
                  <input
                    type="text"
                    id="voucher"
                    value={voucherCode}
                    onChange={handleVoucherChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  onClick={handleRemoveVoucher}
                  className="bg-red-500 text-white p-3 rounded-full flex items-center justify-center"
                >
                  <IoClose />
                </button>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="note"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Note
                </label>
                <input
                  type="text"
                  id="note"
                  onChange={handleNoteChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex gap-5 items-center">
                <button
                  onClick={handlePayment}
                  className="w-full bg-blue-700 text-white py-2 rounded"
                >
                  Thanh toán
                </button>
                <button
                  onClick={() => setOpenModal(true)}
                  className="w-full bg-blue-700 text-white py-2 rounded"
                >
                  Thông tin đơn hàng
                </button>
              </div>
            </div>

            <Modal
              show={openModal}
              size="5xl"
              onClose={() => setOpenModal(false)}
            >
              <Modal.Header>
                <p>Thông tin đơn hàng</p>
              </Modal.Header>
              <Modal.Body>
                <div className="cursor-pointer flex justify-end mb-4">
                  <a
                    onClick={handleOpenInformationInput}
                    className="text-blue-500 py-2"
                  >
                    {showInformationInput
                      ? 'Danh sách đơn hàng'
                      : 'Tạo thông tin đơn hàng'}
                  </a>
                </div>
                {!showInformationInput ? (
                  <>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Tìm kiếm tài khoản..."
                        onChange={handleSDTChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tên
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              SĐT
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                          {dataUserInformation.content?.map((account) => (
                            <tr key={account.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <input
                                  type="checkbox"
                                  className="cursor-pointer"
                                  checked={selectedAccount === account.id}
                                  onChange={() =>
                                    handleSelectAccount(account.id)
                                  }
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {account.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {account.fullname}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {account.phoneNumber}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {dataUserInformation.content?.length > 0 && (
                      <div className="flex justify-center items-center mt-5">
                        <Stack spacing={2}>
                          <Pagination
                            count={dataUserInformation?.totalPages}
                            page={pageUserInformation}
                            onChange={handleChangeUserInformation}
                            shape="rounded"
                            variant="outlined"
                          />
                        </Stack>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Nhập tên ..."
                        onChange={handleFullNameChange}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                      />
                      <input
                        type="text"
                        placeholder="Nhập số điện thoại..."
                        onChange={handlePhoneNumberChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="w-full bg-blue-700 text-white py-2 rounded"
                  onClick={() => handleSave()}
                >
                  Lưu
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateOrder
