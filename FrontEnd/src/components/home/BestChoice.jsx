import { useDispatch, useSelector } from 'react-redux'
import { getProductsInEvent } from '../../reducers/productReducer/ProductsSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FormatPrice } from '../FormatPrice'

const BestChoice = () => {
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProductsInEvent())
  }, [dispatch])

  return (
    <div className="bg-white text-black">
      <div className="text-center py-6">
        <h1 className="text-2xl md:text-4xl font-bold text-black">
          Best Choice
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {data?.content?.slice(0, 3).map((item) => {


          return (
            <Link
              key={item.shoeId}
              to={`/products/${item.shoeId}`}
              className="cursor-pointer relative rounded-none border max-w-full border-black"
            >
              {/* Sale/New badge */}
              {item.priority ? (
                <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md">
                  Sale {Math.round((item.sale / item.lowestPrice) * 100)} %
                </div>
              ) : item.sale > 0 ? (
                <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md">
                  Sale {item.sale} %
                </div>
              ) : (
                <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-green-600 text-white p-1 rounded-md">
                  New
                </div>
              )}

              {/* Product Image */}
              <div className="w-full aspect-square">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${item.defaultImage || 'placeholder.jpg'}`}
                  alt={item.defaultImage || 'Product Image'}
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h5 className="text-left text-xs md:text-sm font-semibold tracking-tight text-gray-900 mt-2">
                  {item.shoeName}
                </h5>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[8px] md:text-xs font-bold text-gray-900">
                    Sizes: {item.top3Size.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs md:text-sm font-bold tracking-tight">
                    {item?.sale ? (
                      <div>

                        <span className="line-through">
                          {FormatPrice(item.lowestPrice)}
                        </span>
                        <span className="ml-2 text-rose-500">
                        {FormatPrice(Math.round(item?.lowestPrice * (1 - item?.sale / 100))) || 0}
                        </span>
                      </div>
                    ) : (
                      <span >
                        {FormatPrice(item.lowestPrice)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BestChoice
