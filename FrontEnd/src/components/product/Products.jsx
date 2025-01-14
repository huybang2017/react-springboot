import { useDispatch, useSelector } from 'react-redux'
import FilterProduct from './FilterProduct.jsx'
import Product from './Product.jsx'
import { useEffect, useState } from 'react'
import { getShoesApiThunk } from '../../reducers/productReducer/ShoeSlice.jsx'

import Loader from '../loader/Loader.jsx'
import PagingProduct from './PagingProduct.jsx'
import { useRef } from 'react'
const Products = () => {
  const dispatch = useDispatch()
  const productSectionRef = useRef(null)
  const {
    data: dataShoeInHome,
    status: statusShoeInHome,
    error: errorShoeInHome,
    paramSearch,
    paramFilterBrand,
  } = useSelector((state) => {
    return state.shoeReducer
  })
  const [openModal, setOpenModal] = useState(false)
  const initialFilterState = {
    pageSize: 8,
    pageNumber: 1,
    sort: null,
    minPrice: null,
    maxPrice: null,
    search: '',
    brandId: paramFilterBrand,
    shoeTypeId: null,
    size: null,
    listShoeColorId: [],
  }

  const [filterSearchPagination, setFilterSearchPagination] =
    useState(initialFilterState)

  const handleFilterSearchPagination = (updatedFilters) => {
    setFilterSearchPagination((prev) => ({
      ...prev,
      ...updatedFilters,
    }))
  }

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    if (!originalPrice || !discountPercentage) return originalPrice
    return originalPrice - originalPrice * (discountPercentage / 100)
  }

  useEffect(() => {
    setFilterSearchPagination((prev) => ({
      ...prev,
      search: paramSearch,
      pageNumber: 1,
    }))
    // if (productSectionRef.current) {
    //   productSectionRef.current.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'start',
    //   })
    // }
  }, [paramSearch])

  useEffect(() => {
    setFilterSearchPagination((prev) => ({
      ...prev,
      brandId: paramFilterBrand,
      pageNumber: 1,
    }))
    // if (productSectionRef.current) {
    //   productSectionRef.current.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'start',
    //   })
    // }
  }, [dispatch, paramFilterBrand])

  useEffect(() => {
    if (statusShoeInHome === 'loading') return
    dispatch(getShoesApiThunk(filterSearchPagination))
  }, [dispatch, filterSearchPagination])
  if (statusShoeInHome === 'loading') return <Loader />
  if (errorShoeInHome) return <div>Error: {errorShoeInHome}</div>

  return (
    <>
      <div className="container mx-auto mt-5">
        <FilterProduct
          onFilterSearchPagination={handleFilterSearchPagination}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <div ref={productSectionRef}>
          {dataShoeInHome?.content && dataShoeInHome.content.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 max-sm:p-4 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {dataShoeInHome.content.map((properties) => {
                const originalPrice = parseInt(properties.lowestPrice)
                const discount = parseInt(properties.sale) || 0

                const discountedPrice = calculateDiscountedPrice(
                  originalPrice,
                  discount,
                )

                return (
                  <Product
                    key={properties.shoeId}
                    product={{
                      ...properties,
                      originalPrice,
                      discountedPrice,
                      discount,
                    }}
                  />
                )
              })}
            </div>
          ) : (
            <div className="col-span-full text-center text-lg text-gray-500">
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>
        <PagingProduct
          pageNumber={dataShoeInHome?.number}
          totalPages={dataShoeInHome?.totalPages}
          onFilterSearchPagination={handleFilterSearchPagination}
        />
      </div>
    </>
  )
}

export default Products
