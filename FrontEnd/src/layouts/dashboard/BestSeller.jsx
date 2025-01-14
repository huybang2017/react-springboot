import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoReload } from 'react-icons/io5'
import TableProduct from '../../components/admin/statistic/TableProduct'
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getShoeTypesNoPageApiThunk } from '../../reducers/productReducer/ShoeTypeSlice'
import { getBrandsNoPageApiThunk } from '../../reducers/productReducer/BrandSlice'
import AxiosAdmin from '../../apis/AxiosAdmin'

const builderQueryString = (filters) => {
  const params = new URLSearchParams()
  Object.entries({
    ...filters,
  }).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const BestSeller = () => {
  const dispatch = useDispatch()
  const [productsData, setProductsData] = useState([])
  const [topProducts, setTopProducts] = useState([])

  const shoetypes = useSelector((state) => state.shoeTypeReducer.data) || []
  const brands = useSelector((state) => state.brandReducer.data) || []

  const [minDate, setMinDate] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const [brandId, setBrandId] = useState('')
  const [shoeTypeId, setShoeTypeId] = useState('')
  const [error, setError] = useState('')

  const [filterValues, setFilterValues] = useState({
    minDate: '',
    maxDate: '',
    brandId: '',
    shoeTypeId: '',
  })

  const validateDates = () => {
    if (!minDate && !maxDate) {
      setError('Vui lòng chọn cả ngày bắt đầu hoặc ngày kết thúc.')
      return false
    }

    if (new Date(minDate) > new Date(maxDate)) {
      setError('Ngày bắt đầu không thể lớn hơn ngày kết thúc.')
      return false
    }

    setError('')
    return true
  }

  useEffect(() => {
    const query = builderQueryString(filterValues)

    const fetchProducts = async () => {
      try {
        const response = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/Statistic/BestSeller?${query}`,
        )
        const data = response.data
        setProductsData(data)

        const sortedProducts = [...data].sort((a, b) => b.sold - a.sold)
        const top3 = sortedProducts.slice(0, 3)
        setTopProducts(top3)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm', error)
      }
    }

    fetchProducts()

    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())
  }, [dispatch, filterValues])
  console.log(shoetypes, brands)

  const handleSearch = () => {
    if (validateDates()) {
      setFilterValues({
        ...filterValues,
        minDate: formatDate(minDate),
        maxDate: formatDate(maxDate),
        brandId: brandId,
        shoeTypeId: shoeTypeId,
      })
    }
  }

  const handleReset = () => {
    setFilterValues({ minDate: '', maxDate: '' })
    setMinDate('')
    setMaxDate('')
    setError('')
    setBrandId('')
    setShoeTypeId('')
    // location.reload()
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="flex gap-4 items-center bg-[#ece9e9] p-3 rounded-md">
          <label htmlFor="from">Ngày bắt đầu</label>
          <input
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
            type="date"
            className="rounded-md"
          />
          <label htmlFor="to">Ngày kết thúc</label>
          <input
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
            type="date"
            className="rounded-md"
          />

          {/* Kiểm tra brands có phải là mảng trước khi render */}
          {Array.isArray(brands) && (
            <div className="flex items-center gap-2">
              <label>Thương hiệu</label>
              <select
                className="rounded-md"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              >
                <option value="">-- Tất cả --</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand.brandId}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Kiểm tra shoetypes có phải là mảng trước khi render */}
          {Array.isArray(shoetypes) && (
            <div className="flex items-center gap-2">
              <label>Loại</label>
              <select
                className="rounded-md"
                value={shoeTypeId}
                onChange={(e) => setShoeTypeId(e.target.value)}
              >
                <option value="">-- Tất cả --</option>
                {shoetypes.map((type, index) => (
                  <option key={index} value={type.shoeTypeId}>
                    {type.shoeTypeName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button className="bg-white p-1 rounded-md" onClick={handleSearch}>
            <CiSearch size={25} />
          </button>
          <button className="bg-white p-1 rounded-md" onClick={handleReset}>
            <IoReload size={25} />
          </button>
        </div>

        {error && <div className="text-red-500">{error}</div>}
      </div>
      <TableProduct
        key={'table-product'}
        topProducts={topProducts}
        productsData={productsData}
        minDate={formatDate(minDate)}
        maxDate={formatDate(maxDate)}
      />
    </div>
  )
}

export default BestSeller
