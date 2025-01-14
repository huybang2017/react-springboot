import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShoesFormHomeThunk } from '../../reducers/productReducer/ShoeSlice'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { FormatPrice } from '../FormatPrice'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const { dataForHome } = useSelector((state) => state.shoeReducer)

  const [currentProductIndex, setCurrentProductIndex] = useState(0)

  useEffect(() => {
    dispatch(getShoesFormHomeThunk({ pageNumber: 0, pageSize: 10 }))
  }, [dispatch])

  const handleNextProduct = () => {
    if (
      dataForHome?.content &&
      currentProductIndex < dataForHome.content.length - 1
    ) {
      setCurrentProductIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePreviousProduct = () => {
    if (currentProductIndex > 0) {
      setCurrentProductIndex((prevIndex) => prevIndex - 1)
    }
  }

  const currentProduct = dataForHome?.content?.[currentProductIndex]

  return (
    <div className="bg-black text-white relative mt-5">
      <div className="text-center py-6">
        <span className="text-2xl md:text-4xl text-gray-400 uppercase">
          BigBoy
        </span>
        <span className="text-2xl md:text-4xl font-bold uppercase">
          Sneaker
        </span>
        <br />
        <span className="text-xl md:text-3xl text-gray-400">Sneaker</span>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mt-10 lg:mt-20 px-4 lg:px-10 container mx-auto">
        {/* Left Section */}
        <div className="text-left max-w-full lg:max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold">
            {currentProduct?.shoeName || 'Loading...'}
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-400">
            {currentProduct?.description || 'Loading...'}
          </h3>
          <p className="text-gray-300 my-4">
            {currentProduct?.sale ? (
              <div className="flex items-center gap-2">
                Giá:
                <span className="line-through">
                  {FormatPrice(currentProduct?.price || 0)}
                </span>
                <span className="text-rose-500">
                  {FormatPrice(
                    Math.round(
                      currentProduct?.price * (1 - currentProduct?.sale / 100),
                    ) || 0,
                  )}
                </span>
              </div>
            ) : (
              <span>{FormatPrice(currentProduct?.price || 0)}</span>
            )}
          </p>
        </div>

        <div className="relative mt-8 lg:mt-0 ">
          <img
            src={
              `${import.meta.env.VITE_API_URL}/ShoeImage/Image/${currentProduct?.image}` ||
              'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            }
            alt={currentProduct?.image || 'Product Image'}
            className="w-64 h-auto lg:w-96"
          />
          {currentProduct?.sale && (
            <div className="absolute top-2 right-2 md:top-2 md:right-2 bg-rose-500 text-white p-1 rounded-md z-50">
              Sale {currentProduct?.sale} %
            </div>
          )}
        </div>
      </div>

      {/* Arrow Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 lg:mt-16 px-4 lg:px-10">
        {currentProductIndex > 0 && (
          <button
            onClick={handlePreviousProduct}
            className="absolute top-2 lg:top-10 right-5 lg:right-10 text-white p-2 rounded"
          >
            <FaChevronUp className="text-4xl lg:text-7xl" />
          </button>
        )}
        {currentProductIndex < (dataForHome?.content?.length || 0) - 1 && (
          <button
            onClick={handleNextProduct}
            className="absolute bottom-2 lg:bottom-10 right-5 lg:right-10 text-white p-2 rounded"
          >
            <FaChevronDown className="text-4xl lg:text-7xl" />
          </button>
        )}
      </div>

      {/* Price and Buy Button */}
      <div className="text-center py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {currentProduct?.price
            ? currentProduct.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })
            : 'Loading...'}
        </h2>

        <Link
          to={`/products/${currentProduct?.shoeId}`}
          className="bg-white text-black py-2 px-8 md:px-10 rounded-full text-lg font-bold"
        >
          Chi tiết sản phẩm
        </Link>
      </div>
    </div>
  )
}

export default ProductDetail
