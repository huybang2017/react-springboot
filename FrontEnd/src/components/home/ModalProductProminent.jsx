import { Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShoesFormHomeThunk } from '../../reducers/productReducer/ShoeSlice'
import { FormatPrice } from '../FormatPrice'
import { Link } from 'react-router-dom'

export function ModalProductProminent() {
  const dispatch = useDispatch()
  const { dataForHome } = useSelector((state) => state.shoeReducer)

  const [openModal, setOpenModal] = useState(true)

  useEffect(() => {
    dispatch(getShoesFormHomeThunk({ pageNumber: 0, pageSize: 10 }))
  }, [dispatch])

  return (
    <Modal
      size="7xl"
      show={openModal}
      onClose={() => setOpenModal(false)}
      className="modal"
    >
      <Modal.Header>Sản phẩm nổi bật</Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-sm:gap-2">
          {dataForHome?.content?.slice(0, 9).map((product) => {
            return (
              <Link
                key={product?.shoeId}
                to={`/products/${product?.shoeId}`}
                className="cursor-pointer relative max-w-full rounded-lg border border-gray-300 pb-5 shadow-md hover:shadow-lg transition-shadow duration-200"
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                <div className="w-full aspect-square">
                  <img
                    className="w-full h-full object-cover rounded-t-lg rounded-b-lg"
                    src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${product.image}`}
                    alt={`imageShoe_${product?.shoeId}`}
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product?.shoeName}
                  </h5>
                  <p className="text-sm font-bold text-gray-700 mt-2">
                    {product?.sale ? (
                      <div>
                        <div className="absolute top-2 left-2 md:top-2 md:left-2 bg-rose-500 text-white p-1 rounded-md">
                          Sale {product?.sale} %
                        </div>
                        <span className="line-through">
                          {FormatPrice(product.price)}
                        </span>
                        <span className="ml-2 text-rose-500">
                          {FormatPrice(
                            Math.round(
                              product.price * (1 - product.sale / 100),
                            ),
                          )}
                        </span>
                      </div>
                    ) : (
                      <span>{FormatPrice(product.price)}</span>
                    )}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </Modal.Body>
    </Modal>
  )
}
