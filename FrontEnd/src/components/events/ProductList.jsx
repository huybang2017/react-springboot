import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsInEvent } from '../../reducers/productReducer/ProductsSlice'
import { Pagination, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { Accordion, Card, Modal } from 'flowbite-react'
import { getAllShoeSizesByUser } from '../../reducers/productReducer/ShoeSizeSlice'
import './style.css'
import { getColorsNoPageApiThunk } from '../../reducers/productReducer/ColorSlice'
import { FaChevronDown } from 'react-icons/fa'
import { LuLoader2 } from 'react-icons/lu'
import { getBrandsNoPageApiThunk } from '../../reducers/productReducer/BrandSlice'
import { getShoeTypesNoPageApiThunk } from '../../reducers/productReducer/ShoeTypeSlice'
import { CiFilter } from 'react-icons/ci'
import { FormatPrice } from '../FormatPrice'

const ITEM_PER_PAGE = 10

const buildQueryString = (filters, page, itemsPerPage) => {
  const params = new URLSearchParams()

  Object.entries({
    ...filters,
    pageNumber: page || '',
    pageSize: itemsPerPage || '',
  }).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        params.append(key, val)
      })
    } else if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

const ProductList = ({ eventId, percentage }) => {
  const dispatch = useDispatch()
  const { data, status } = useSelector((state) => state.products)
  const { data: dataSize, status: statusSize } = useSelector(
    (state) => state.shoeSizeReducer || [],
  )
  const { data: dataColors, status: statusColors } = useSelector(
    (state) => state.colorReducer || [],
  )
  const { data: dataBrand } = useSelector((state) => state.brandReducer || [])
  const { data: dataShoeType } = useSelector(
    (state) => state.shoeTypeReducer || [],
  )

  const [selectedColors, setSelectedColors] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = data.totalPages || 0
  const [isColorOpen, setIsColorOpen] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const [filterValues, setFilterValues] = useState({
    size: '',
    search: '',
    specialSort: '',
    colorId: '',
    brandId: '',
    shoeTypeId: '',
  })

  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilterValues((prevFilterValues) => ({
        ...prevFilterValues,
        search: inputValue,
      }))
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [inputValue])

  useEffect(() => {
    const query = buildQueryString(filterValues, currentPage, ITEM_PER_PAGE)
    try {
      dispatch(getProductsInEvent(query))
    } catch (error) {
      console.log(error)
    }
    dispatch(getAllShoeSizesByUser())
    dispatch(getColorsNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())
    dispatch(getShoeTypesNoPageApiThunk())
  }, [eventId, currentPage, dispatch, filterValues])

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage)
  }

  if (status === 'loading' || statusSize === 'loading') {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LuLoader2 className="animate-spin" />
      </div>
    )
  }

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    if (!originalPrice || !discountPercentage) return originalPrice
    return originalPrice - originalPrice * (discountPercentage / 100)
  }

  if (!data || !dataSize) {
    return <div>No products found.</div>
  }

  const handleColorChange = (colorId) => {
    let updatedSelectedColors
    if (selectedColors.includes(colorId)) {
      updatedSelectedColors = selectedColors.filter((id) => id !== colorId)
    } else {
      updatedSelectedColors = [...selectedColors, colorId]
    }
    setSelectedColors(updatedSelectedColors)

    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      listShoeColorId: updatedSelectedColors,
    }))
  }

  return (
    <div className="container mx-auto mt-10 space-y-5">
      <div>
        <input
          className="border px-4 py-2 rounded-md focus:ring-0 focus-visible:ring-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div
        className={`flex justify-between items-center gap-0 md:gap-10  max-md:pl-10 ${filterOpen && 'max-md:border max-md:p-3'}`}
      >
        <div>
          <button
            className="flex justify-center items-center w-full p-2.5 text-white bg-blue-500 rounded-lg text-sm"
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <CiFilter />
            <span className="ml-2">Bộ lọc</span>
          </button>
        </div>
        <Modal
          className="lg:mt-10 md:mt-10 sm:mt-16 max-sm:mt-24"
          show={filterOpen}
          size="xl"
          onClose={() => setFilterOpen(false)}
        >
          <Modal.Header>
            <h2 className="text-lg font-semibold">Lọc sản phẩm</h2>
          </Modal.Header>
          <Modal.Body>
            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title>Kích thước</Accordion.Title>
                <Accordion.Content>
                  <select
                    className="font-semibold px-4 py-2 border-2 border-black rounded-md md:text-md text-sm w-full"
                    value={filterValues.size}
                    onChange={(e) =>
                      setFilterValues({ ...filterValues, size: e.target.value })
                    }
                  >
                    {!filterValues.size && (
                      <option className="font-semibold" value="">
                        Kích thước
                      </option>
                    )}
                    {Array.isArray(dataSize) &&
                      dataSize.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                  </select>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Thương hiệu</Accordion.Title>
                <Accordion.Content>
                  <select
                    className="font-semibold px-4 py-2 border-2 border-black rounded-md md:text-md text-sm w-full"
                    value={filterValues.brandId}
                    onChange={(e) =>
                      setFilterValues({
                        ...filterValues,
                        brandId: e.target.value,
                      })
                    }
                  >
                    {!filterValues.brandId && (
                      <option className="font-semibold" value="">
                        Thương hiệu
                      </option>
                    )}
                    {Array.isArray(dataBrand) &&
                      dataBrand.map((brand) => (
                        <option key={brand?.brandId} value={brand?.brandId}>
                          {brand?.brandName}
                        </option>
                      ))}
                  </select>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Loại sản phẩm</Accordion.Title>
                <Accordion.Content>
                  <select
                    className="font-semibold px-4 py-2 border-2 border-black rounded-md md:text-md text-sm w-full"
                    value={filterValues.shoeTypeId}
                    onChange={(e) =>
                      setFilterValues({
                        ...filterValues,
                        shoeTypeId: e.target.value,
                      })
                    }
                  >
                    {!filterValues.shoeTypeId && (
                      <option className="font-semibold" value="">
                        Loại sản phẩm
                      </option>
                    )}
                    {Array.isArray(dataShoeType) &&
                      dataShoeType.map((type) => (
                        <option key={type?.shoeTypeId} value={type?.shoeTypeId}>
                          {type?.shoeTypeName}
                        </option>
                      ))}
                  </select>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Chọn màu</Accordion.Title>
                <Accordion.Content>
                  <div className="px-4 py-2 font-semibold">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setIsColorOpen(!isColorOpen)}
                    >
                      <span className="md:text-md text-sm">Chọn màu</span>
                      <FaChevronDown
                        size={13}
                        className="text-zinc-500 font-bold"
                      />
                    </div>
                    {isColorOpen && (
                      <div className="colorFilter flex flex-col gap-2 p-2 border border-zinc-500 rounded-md mt-2">
                        {Array.isArray(dataColors) &&
                          dataColors.map((color) => (
                            <label
                              key={color.id}
                              className="text-sm flex items-center"
                            >
                              <input
                                type="checkbox"
                                value={color.id}
                                checked={selectedColors.includes(color.id)}
                                onChange={() => handleColorChange(color.id)}
                              />
                              <span className="ml-2">{color.colorName}</span>
                            </label>
                          ))}
                      </div>
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Sắp xếp theo</Accordion.Title>
                <Accordion.Content>
                  <select
                    className="font-semibold px-4 py-2 border-2 border-black rounded-md md:text-md text-sm w-full"
                    value={filterValues.specialSort}
                    onChange={(e) =>
                      setFilterValues({
                        ...filterValues,
                        specialSort: e.target.value,
                      })
                    }
                  >
                    {!filterValues.sort && (
                      <option className="font-semibold" value="">
                        Sắp xếp theo
                      </option>
                    )}
                    <option value="price,desc">Giá giảm dần</option>
                    <option value="price,asc">Giá tăng dần</option>
                  </select>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </Modal.Body>
        </Modal>
        <div>
          <button
            className="w-50 p-2.5 text-white bg-blue-700 rounded-lg text-sm"
            onClick={() =>
              setFilterValues({ size: '', brandId: '', shoeTypeId: '' })
            } // Cập nhật để xóa bộ lọc
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1 md:grid-cols-4">
        {data.content && data.content.length > 0 ? (
          data.content.map((product) => {
           
            return (
              <div
                key={product.shoeId}
                className="relative card-container z-10"
              >
                <Link
                  to={`/products/${product?.shoeId}`}
                  className="cursor-pointer block max-w-none rounded-none border border-black relative"
                >
                  {/* Nhãn Sale */}
                  {percentage > 0 && (
                    <div className="absolute top-2 left-2 md:top-2 md:left-2 bg-rose-500 text-white p-1 rounded-md">
                      Sale {percentage}%
                    </div>
                  )}

                  {/* Hình ảnh sản phẩm */}
                  <div className="w-full h-64">
                    <img
                      className="w-full h-full object-cover aspect-square"
                      src={`${import.meta.env.VITE_API_URL}/ShoeImage/Image/${product?.defaultImage}`}
                      alt="imageShoe"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] md:text-xs font-bold text-gray-900 dark:text-white">
                        {product?.numberOfShoeSize} sizes
                      </span>
                      <div className="flex space-x-2">
                        {product?.top3Size?.map((size) => (
                          <span
                            key={size}
                            className="text-[8px] md:text-xs font-medium bg-zinc-300 flex items-center justify-center text-gray-900 dark:text-white w-5 h-5 md:w-6 md:h-6 rounded-full"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h5 className="text-xs md:text-sm mt-2 md:mt-5 font-semibold tracking-tight text-gray-900 dark:text-white card-title">
                      {product?.shoeName}
                    </h5>

                    <div className="flex items-center justify-between card-price">
                      <p className="text-xs md:text-sm mt-2 font-bold tracking-tight">
                        <span className="line-through">
                        {FormatPrice(product?.lowestPrice || 0)}
                        </span>
                        <span className="ml-2 text-rose-500">
                        {FormatPrice(Math.round(product?.lowestPrice * (1 - product?.sale / 100))) || 0}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        ) : (
          <div>Không có sản phẩm nào.</div>
        )}
      </div>

      <div className="flex items-center justify-center mb-5 mt-10 pb-10">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  )
}

export default ProductList
