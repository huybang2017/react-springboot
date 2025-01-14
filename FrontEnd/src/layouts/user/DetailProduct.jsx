import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getShoeApiThunk } from '../../reducers/productReducer/ShoeSlice'
import {
  addCartItem,
  getDataCartThunk,
} from '../../reducers/shopping/CartSlice'
import {
  alertError,
  alertSuccess,
} from '../../components/sweeetalert/sweetalert.jsx'
import VoucherCard from '../../components/cart/VoucherCard.jsx'
import PolicyItem from '../../components/cart/PolicyItem.jsx'
import { getVouchersClientApiThunk } from '../../reducers/voucherReducer/VoucherSlice.jsx'
import { Accordion } from 'flowbite-react'

const DetailProduct = () => {
  const [activeImg, setActiveImage] = useState('')

  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState(0)
  const [priceDiscount, setPriceDiscount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [focusedSize, setFocusedSize] = useState(0)
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => {
    return state.shoeReducer
  })
  const ACCOUNT_ID = sessionStorage.getItem('id')

  const {
    data: dataVoucher,
    status: statusVoucher,
    error: errorVoucher,
  } = useSelector((state) => state.vouchers)

  const policies = [
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Cam kết hàng đẹp chất lượng',
    },
    { icon: 'https://via.placeholder.com/24', text: 'Bảo hành 3 tháng' },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Đổi size trong vòng 7 ngày',
    },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Đổi trả một / một khi phát hiện hàng bị lỗi',
    },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Free ship đơn hàng trên 1 triệu',
    },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Không kèm với khuyến mãi khác',
    },
    {
      icon: 'https://via.placeholder.com/24',
      text: 'Hỗ trợ giao hàng 2h khi chọn hình thức giao tốc hành, áp dụng khu vực HCM T2 - T7 (giờ hành chính)',
    },
  ]

  const {
    data: dataCart,
    status: statusCart,
    error: errorCart,
  } = useSelector((state) => state.cartReducer)

  useEffect(() => {
    if (id) {
      dispatch(getShoeApiThunk(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (data?.shoeImages?.length > 0) {
      setActiveImage(data.shoeImages[0].path)
      const basePrice = data.shoeSizes[0].price
      setPrice(Math.ceil(basePrice))

      if (data.sale) {
        const discountedPrice = basePrice - (basePrice * data.sale) / 100
        setPriceDiscount(Math.ceil(discountedPrice))
      } else {
        setPriceDiscount(Math.ceil(basePrice))
      }

      setQuantity(data.shoeSizes[0].quantity)
    }
  }, [data])

  useEffect(() => {
    if (statusCart === 'succeededAddCartItem') {
      dispatch(getDataCartThunk(ACCOUNT_ID))
      alertSuccess('Thêm vào giỏ hàng thành công')
    } else if (statusCart === 'failedAddCartItem') {
      alertError(errorCart)
    }
  }, [dispatch, ACCOUNT_ID, statusCart])

  useEffect(() => {
    dispatch(getVouchersClientApiThunk())
  }, [dispatch])

  useEffect(() => {
    if (data && data.shoeImages && data.shoeImages.length > 0) {
      setActiveImage(data.shoeImages[0].path)
    } else {
      setActiveImage('defaultImagePath')
    }
  }, [data])

  const onChangePriceBySize = (index) => {
    const basePrice = data.shoeSizes[index].price
    setPrice(Math.ceil(basePrice))

    if (data.sale) {
      const discountedPrice = basePrice - (basePrice * data.sale) / 100
      setPriceDiscount(Math.ceil(discountedPrice))
    } else {
      setPriceDiscount(Math.ceil(basePrice))
    }

    setQuantity(data.shoeSizes[index].quantity)
    setFocusedSize(index)
    setAmount(1)
  }

  const onChangePriceByAmount = (amount) => {
    const basePrice = data.shoeSizes[focusedSize].price * amount
    setPrice(Math.ceil(basePrice))

    if (data.sale) {
      const discountedPrice =
        (data.shoeSizes[focusedSize].price -
          (data.shoeSizes[focusedSize].price * data.sale) / 100) *
        amount
      setPriceDiscount(Math.ceil(discountedPrice))
    } else {
      setPriceDiscount(Math.ceil(basePrice))
    }
  }

  const handleAddToCart = () => {
    if (!sessionStorage.getItem('id')) {
      window.location.href = '/login'
    }
    const payload = {
      accountId: sessionStorage.getItem('id'),
      shoeId: data.shoeId,
      idSize: data?.shoeSizes?.[focusedSize].size,
      unitPrice: data?.shoeSizes?.[focusedSize].price,
      quantity: amount,
      total: priceDiscount,
    }

    for (const key in payload) {
      if (payload[key] === undefined || payload[key] === null) {
        console.error(`Error: ${key} is ${payload[key]}`)
        return
      }
    }

    const existingCartItem = dataCart.find(
      (item) =>
        item.idShoeId === payload.shoeId && item.idSize === payload.idSize,
    )

    if (existingCartItem) {
      payload.quantity += existingCartItem.quantity
      payload.total = payload.quantity * payload.unitPrice
    }

    const formData = new FormData()
    for (const key in payload) {
      if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key])
      }
    }

    dispatch(addCartItem(formData))
  }

  useEffect(() => {
    if (statusCart === 'failed') {
      alertError(errorCart)
    }
  }, [statusCart])

  if (Object.keys(data).length === 0) {
    return (
      <p className="text-center font-bold text-lg">Không có sản phẩm này</p>
    )
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col justify-between lg:flex-row gap-16">
          <div className="flex flex-col gap-6 lg:w-2/4">
            <img
              src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${activeImg}`}
              // src="#"
              alt=""
              className="w-auto h-auto aspect-square object-cover rounded-xl"
            />
            <div className="grid grid-cols-4 gap-2">
              {data?.shoeImages?.map((image) => {
                return (
                  <img
                    key={image.shoeImageId}
                    src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${image.path}`}
                    alt={image.shoeImageId}
                    className="w-24 h-24 rounded-md cursor-pointer"
                    onClick={() => setActiveImage(image.path)}
                  />
                )
              })}
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <span className=" text-violet-600 font-semibold">
                {data?.shoeType?.shoeTypeName}
              </span>
              <h1 className="text-3xl font-bold">{data?.shoeName}</h1>
            </div>
            {data.sale ? (
              <div className="flex items-center">
                <p className="text-xs md:text-sm font-bold tracking-tight flex items-center gap-2">
                  <span className="line-through text-2xl font-semibold">
                    {price.toLocaleString('vi-VN')} VNĐ
                  </span>
                  <span className="ml-2 text-rose-500 text-2xl font-semibold">
                    {priceDiscount.toLocaleString('vi-VN')} VNĐ
                  </span>
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-xs md:text-sm font-bold tracking-tight">
                  <span className="text-2xl font-semibold">
                    {price.toLocaleString('vi-VN')} VNĐ
                  </span>
                </p>
              </div>
            )}
            <span>Số lượng còn lại: {quantity}</span>
            <div className="flex items-center">
              {data?.shoeSizes?.map((item, index) => {
                return (
                  <button
                    key={index}
                    size="xs"
                    className={`outline outline-1 outline-black mx-1 px-4 ${
                      item.quantity === 0
                        ? 'bg-gray-300 text-gray-500'
                        : focusedSize === index
                          ? 'bg-black text-white'
                          : 'bg-white text-black'
                    }`}
                    onClick={() => onChangePriceBySize(index)}
                    disabled={item.quantity === 0}
                    color={item.quantity === 0 ? 'warning' : null}
                  >
                    {item.size}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                  onClick={() => {
                    if (amount > 1) {
                      // Ensure amount is not less than 1
                      setAmount((prev) => prev - 1)
                      onChangePriceByAmount(amount - 1)
                    }
                  }}
                >
                  -
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                  onClick={() => {
                    if (amount < quantity) {
                      setAmount((prev) => prev + 1)
                      onChangePriceByAmount(amount + 1)
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-gray-700">{data?.description}</p>
            <div>
              <button
                onClick={() => {
                  handleAddToCart()
                }}
                className="bg-blue-700 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
            <div className="container mx-auto">
              <Accordion collapseAll>
                <Accordion.Panel>
                  <Accordion.Title>Khuyến mãi</Accordion.Title>
                  <Accordion.Content>
                    {dataVoucher?.map((voucher) => (
                      <VoucherCard
                        key={voucher.voucherId}
                        discount={voucher.discountAmount}
                        code={voucher.code}
                        isFreeShip={voucher.isFreeShip}
                        minOrder={voucher.condition}
                        expiryDate={voucher.expirationTime}
                      />
                    ))}
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
            <div className="max-w-sm border border-black p-4">
              {policies.map((policy, index) => (
                <PolicyItem key={index} icon={policy.icon} text={policy.text} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DetailProduct
