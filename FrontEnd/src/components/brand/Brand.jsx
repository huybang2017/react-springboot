import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsApiThunk } from '../../reducers/productReducer/BrandSlice'
import { setFilter } from '../../reducers/productReducer/ShoeSlice'
import { useNavigate } from 'react-router-dom'

const Brand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: dataBrand } = useSelector((state) => state.brandReducer)
  useEffect(() => {
    dispatch(getBrandsApiThunk({ pageSize: 8, pageNumber: 1 }))
  }, [dispatch])
  const handleClickBrand = (brandId) => {
    navigate('/products')
    dispatch(setFilter(brandId))
  }
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {dataBrand?.content?.map(
            (brand) =>
              brand.brandId !== 1 && (
                <div
                  key={brand.brandId}
                  onClick={() => handleClickBrand(brand.brandId)}
                  className="cursor-pointer flex justify-center items-center"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}/Brand/Image/${brand.logo}`}
                    alt={brand.brandName}
                    className="object-contain h-full w-full max-h-24 md:max-h-32"
                  />
                </div>
              ),
          )}
        </div>
      </div>
    </>
  )
}
export default Brand
