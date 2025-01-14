import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getDataCartThunk,
  removeCartItem,
  updateCartItem,
  updateQuantity,
} from '../../reducers/shopping/CartSlice'
const PageCart = () => {
  const id = sessionStorage.getItem('id')
  const dispatch = useDispatch()
  const {
    data: dataCart,
    status: statusCart,
    error: errorCart,
  } = useSelector((state) => state.cartReducer)

  useEffect(() => {
    dispatch(getDataCartThunk(id))
  }, [dispatch, id])

  const handleUpdateQuantity = (
    idAccountId,
    idShoeId,
    idSize,
    quantity,
    totalQuantity,
  ) => {
    if (quantity === 0) {
      return
    }
    dispatch(
      updateQuantity({
        idAccountId,
        idShoeId,
        idSize,
        quantity,
        totalQuantity,
      }),
    )
    setTimeout(() => {
      const index = dataCart.findIndex(
        (item) =>
          item.idShoeId === idShoeId &&
          item.idSize === idSize &&
          item.idAccountId === idAccountId,
      )
      if (index !== -1) {
        const shoeSize = dataCart[index].shoeDetails.shoeSizes.find(
          (properties) => properties.size === idSize, // Assuming you meant idSize
        )
        let total
        if (dataCart[index].shoeDetails.sale) {
          total =
            quantity *
            shoeSize.price *
            (1 - dataCart[index].shoeDetails.sale / 100)
        } else {
          total = quantity * shoeSize.price
        }

        dispatch(
          updateCartItem({
            idAccountId: dataCart[index].idAccountId,
            idShoeId: dataCart[index].idShoeId,
            idSize: dataCart[index].idSize,
            unitPrice: dataCart[index].unitPrice,
            quantity: quantity,
            total: total,
          }),
        )
      } else {
        console.error('Item not found in cart')
      }
    }, 300)
  }

  const handleRemoveItem = (accountId, idShoeId, idSize) => {
    dispatch(removeCartItem({ accountId, idShoeId, idSize }))
  }

  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
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

            <li className="flex shrink-0 items-center">
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

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {errorCart && errorCart === 8 ? (
                  <div className="text-xl font-bold text-center">
                    Đăng nhập trước khi xem giỏ hàng
                  </div>
                ) : dataCart && dataCart.length === 0 ? (
                  <div className="text-xl font-bold text-center">
                    Giỏ hàng trống
                  </div>
                ) : (
                  dataCart &&
                  dataCart.map((properties, index) => {
                    const matchedItem = properties.shoeDetails.shoeSizes.find(
                      (item) => properties.idSize === item.size,
                    )
                    const totalQuantity = matchedItem ? matchedItem.quantity : 0
                    return (
                      <div
                        key={index}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                      >
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <a href="#" className="shrink-0 md:order-1">
                            <img
                              className="h-20 w-20 dark:hidden"
                              src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${properties.shoeDetails.shoeImages[0].path}`}
                              alt=""
                            />
                          </a>

                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    properties.idAccountId,
                                    properties.idShoeId,
                                    properties.idSize,
                                    properties.quantity - 1,
                                    totalQuantity,
                                  )
                                }
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <input
                                type="text"
                                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                value={properties.quantity}
                                disabled
                                required
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    properties.idAccountId,
                                    properties.idShoeId,
                                    properties.idSize,
                                    properties.quantity + 1,
                                    totalQuantity,
                                  )
                                }
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900 dark:text-white">
                                {properties.total.toLocaleString('vi-VN')} VNĐ
                              </p>
                            </div>
                          </div>

                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <a
                              href="#"
                              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                            >
                              {properties.shoeDetails.shoeName}
                            </a>

                            <div className="flex items-center gap-4">
                              <div>
                                {properties.shoeDetails.shoeSizes
                                  .filter(
                                    (item) => properties.idSize === item.size,
                                  )
                                  .map((item) => (
                                    <span key={item.size}>
                                      Số lượng còn lại: {item.quantity}
                                    </span>
                                  ))}
                              </div>
                              <div>
                                {<span>Size: {properties.idSize}</span>}
                              </div>
                              <button
                                type="button"
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                                onClick={() => {
                                  handleRemoveItem(
                                    properties.idAccountId,
                                    properties.idShoeId,
                                    properties.idSize,
                                  )
                                }}
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
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
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
            {errorCart && errorCart === 401 ? (
              <div></div>
            ) : dataCart && dataCart.length === 0 ? (
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"></div>
            ) : (
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tổng giá trị đơn hàng
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Tạm tính
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {dataCart
                            ?.reduce((acc, item) => acc + item.total, 0)
                            .toLocaleString('vi-VN')}{' '}
                          VNĐ
                        </dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Tổng cộng
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {dataCart
                          ?.reduce((acc, item) => acc + item.total, 0)
                          .toLocaleString('vi-VN')}{' '}
                        VNĐ
                      </dd>
                    </dl>
                  </div>

                  <Link
                    to="/checkout"
                    className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Thanh toán
                  </Link>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {' '}
                      or{' '}
                    </span>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"
                    >
                      Tiếp tục mua sắm
                      <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
export default PageCart
