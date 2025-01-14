import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDataCartThunk,
  removeCartItem,
  updateQuantity,
} from '../../reducers/shopping/CartSlice'
import { Link } from 'react-router-dom'

export default function CartShow({ open, onSetOpen }) {
  const id = sessionStorage.getItem('id')
  const dispatch = useDispatch()
  const {
    data: dataCart,
    status: statusCart,
    error: errorCart,
  } = useSelector((state) => state.cartReducer)

  useEffect(() => {
    if (open) {
      dispatch(getDataCartThunk(id))
    }
  }, [dispatch, id, open])

  const handleRemoveItem = (accountId, idShoeId, idSize) => {
    dispatch(removeCartItem({ accountId, idShoeId, idSize }))
  }

  useEffect(() => {
    if (statusCart === 'succeededRemoveCartItem') {
      dispatch(getDataCartThunk(id))
    }
  }, [statusCart])

  return (
    <Dialog open={open} onClose={onSetOpen} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden h-screen">
        <div className="absolute inset-0 overflow-hidden h-full">
          <div className="pointer-events-none absolute bottom-0 right-0 flex max-w-full h-full">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 h-full"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Giỏ hàng
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => onSetOpen()}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {errorCart && errorCart === 8 ? (
                        <div className="text-center mt-3">
                          Đăng nhập trước khi xem giỏ hàng
                        </div>
                      ) : dataCart && dataCart.length === 0 ? (
                        <div className="text-center mt-3">Giỏ hàng trống</div>
                      ) : (
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {dataCart?.map((properties, index) => (
                            <li key={index} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={properties?.image || 'Default Image'}
                                  src={
                                    `${import.meta.env.VITE_API_URL}/ShoeImage/Image/${properties?.image}` ||
                                    ''
                                  }
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      {properties?.shoeDetails?.shoeName || ''}
                                    </h3>
                                    <p className="ml-4">
                                      {properties?.shoeDetails?.shoeSizes.map(
                                        (size) => {
                                          if (size.size === properties.idSize) {
                                            return new Intl.NumberFormat(
                                              'vi-VN',
                                              {
                                                style: 'currency',
                                                currency: 'VND',
                                              },
                                            ).format(size.price)
                                          }
                                        },
                                      ) || '0 VND'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Số lượng: {properties.quantity}
                                  </p>
                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        handleRemoveItem(
                                          id,
                                          properties.idShoeId,
                                          properties.idSize,
                                        )
                                      }}
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  {dataCart && dataCart.length === 0 ? null : (
                    <>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Tổng giá</p>
                        <p>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(
                            dataCart?.reduce(
                              (accumulator, item) =>
                                accumulator + (item.total || 0),
                              0,
                            ),
                          )}
                        </p>
                      </div>
                      <div className="mt-6">
                        <Link
                          to="/carts"
                          onClick={() => onSetOpen()}
                          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                        >
                          Thanh toán
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          hoặc{' '}
                          <button
                            type="button"
                            onClick={() => onSetOpen()}
                            className="font-medium text-blue-600 hover:text-blue-500"
                          >
                            Tiếp tục mua hàng
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
