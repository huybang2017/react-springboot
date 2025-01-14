import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBrandsApiThunk } from '../../reducers/productReducer/BrandSlice'

const BrandDisplay = () => {
  const dispatch = useDispatch()
  const { data: dataBrand } = useSelector((state) => state.brandReducer)

  useEffect(() => {
    dispatch(getBrandsApiThunk({ pageSize: 6, pageNumber: 1 }))
  }, [dispatch])

  return (
    <div className="container mx-auto text-center py-10 bg-white">
      <h6 className="text-4xl mb-8 font-semibold text-brown-900">
        THƯƠNG HIỆU
      </h6>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mb-8">
        {dataBrand?.content?.map(
          (brand) =>
            brand.brandId !== 1 && ( // Kiểm tra nếu brandId khác 1
              <div key={brand.brandId} className="flex justify-center">
                <img
                  src={`${import.meta.env.VITE_API_URL}/Brand/Image/${brand.logo}`}
                  alt={brand.brandName}
                  className="h-16 w-auto transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            ),
        )}
      </div>
      <Link to="/brands" className="text-black hover:underline">
        Xem thêm thương hiệu →
      </Link>
    </div>
  )
}

export default BrandDisplay
