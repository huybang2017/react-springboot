import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  const { shoeId, originalPrice, discountedPrice, discount, ...otherProps } =
    product

  // Làm tròn giá trị
  const roundedOriginalPrice = Math.round(originalPrice)
  const roundedDiscountedPrice = Math.round(discountedPrice)

  return (
    <Link
      to={`/products/${shoeId}`}
      className="cursor-pointer relative rounded-lg border border-black overflow-hidden shadow-lg"
    >
      {product.sale && (
        <div className="absolute top-2 left-2 md:top-5 md:left-5 bg-rose-500 text-white p-1 rounded-md">
          Sale {discount}%
        </div>
      )}
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover rounded-t-lg"
          src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${product?.defaultImage}`}
          alt="imageShoe"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mt-3">
          <span className="text-[8px] md:text-xs font-bold text-gray-900">
            {product?.numberOfShoeSize} sizes
          </span>
          <div className="flex space-x-2">
            {product?.top3Size?.map((size) => (
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
            {product?.shoeName}
          </h5>
        </button>
        {product.sale ? (
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs md:text-sm font-bold tracking-tight">
              <span className="line-through">
                {roundedOriginalPrice.toLocaleString('vi-VN')} VNĐ
              </span>
              <span className="ml-2 text-rose-500">
                {roundedDiscountedPrice.toLocaleString('vi-VN')} VNĐ
              </span>
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs md:text-sm font-bold tracking-tight">
              {roundedOriginalPrice.toLocaleString('vi-VN')} VNĐ
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default Product
