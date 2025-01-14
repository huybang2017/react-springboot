import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getColorsNoPageApiThunk } from '../../reducers/productReducer/ColorSlice'
import {
  getBrandsNoPageApiThunk,
  resetBrand,
} from '../../reducers/productReducer/BrandSlice'
import { getShoeTypesNoPageApiThunk } from '../../reducers/productReducer/ShoeTypeSlice'
import { getSizeMenuThunk } from '../../reducers/productReducer/SizeSlice'
import { setSearch } from '../../reducers/productReducer/ShoeSlice'
import { Accordion, Modal } from 'flowbite-react'
import { CiFilter } from 'react-icons/ci'

const FilterProduct = ({
  onFilterSearchPagination,
  openModal,
  setOpenModal,
}) => {
  const dispatch = useDispatch()
  const { data: dataColor } = useSelector((state) => state.colorReducer)

  const { data: dataBrand } = useSelector((state) => state.brandReducer)

  const { data: dataShoeType } = useSelector((state) => state.shoeTypeReducer)

  const { data: dataSize } = useSelector((state) => state.sizeSlice)

  const [searchValue, setSearchValue] = useState('')
  const handleSearch = () => {
    dispatch(setSearch(searchValue))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
      handleFilterSubmit()
    }
  }

  useEffect(() => {
    dispatch(getColorsNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())
    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getSizeMenuThunk())
  }, [dispatch])

  // State for filters
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedShoeType, setSelectedShoeType] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 1000000000])
  const [isResettingFilters, setIsResettingFilters] = useState(false)

  // Handle color selection
  const handleColorChange = (colorId) => {
    setSelectedColors((prevSelectedColors) =>
      prevSelectedColors.includes(colorId)
        ? prevSelectedColors.filter((id) => id !== colorId)
        : [...prevSelectedColors, colorId],
    )
  }

  // Handle brand selection
  const handleBrandChange = (event) => {
    setSelectedBrand(+event.target.value)
  }

  const handleSizeChange = (event) => {
    setSelectedSize(+event.target.value)
  }

  // Handle shoe type selection
  const handleShoeTypeChange = (event) => {
    setSelectedShoeType(+event.target.value)
  }

  // Handle price range change
  const handlePriceChange = (event) => {
    const value = Number(event.target.value)
    if (value >= 0 && value <= priceRange[1])
      setPriceRange([value, priceRange[1]])
  }

  const handleMaxPriceChange = (event) => {
    const value = Number(event.target.value)
    if (value <= 1000000000) {
      setPriceRange([priceRange[0], value])
    }
  }

  // Handle filter submission
  const handleFilterSubmit = useCallback(() => {
    const filterData = {
      listShoeColorId: selectedColors,
      brandId: selectedBrand,
      shoeTypeId: selectedShoeType,
      size: selectedSize,
      search: searchValue,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }

    // Pass the filter data to the parent component
    onFilterSearchPagination(filterData)
    setOpenModal(false)
  }, [
    selectedColors,
    selectedBrand,
    selectedShoeType,
    selectedSize,
    searchValue,
    priceRange,
    onFilterSearchPagination,
  ])

  const handleResetFilters = () => {
    setSelectedColors([])
    setSelectedBrand(null)
    setSelectedShoeType(null)
    setSelectedSize(null)
    setSearchValue('')
    setPriceRange([0, 1000000000])

    setIsResettingFilters(true)
  }

  useEffect(() => {
    if (isResettingFilters) {
      handleFilterSubmit()
      setIsResettingFilters(false)
    }
  }, [
    selectedColors,
    selectedBrand,
    selectedShoeType,
    searchValue,
    priceRange,
    selectedSize,
    isResettingFilters,
    handleFilterSubmit,
  ])

  return (
    <>
      <div className="content p-4">
        <p className="text-center font-bold text-2xl md:text-4xl">SẢN PHẨM</p>
        <form
          className="flex justify-end mt-2 relative w-full md:w-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full md:w-64 border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="bạn cần tìm gì..."
            type="text"
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </form>
      </div>

      <div className="flex justify-between mb-5">
        <div>
          <button
            className="flex justify-center items-center w-full p-2.5 text-white bg-blue-500 rounded-lg text-sm"
            type="button"
            onClick={() => setOpenModal(!openModal)}
          >
            <CiFilter />
            <span className="ml-2">Bộ lọc</span>
          </button>
        </div>

        <button
          type="button"
          className="w-50 p-2.5 text-white bg-blue-700 rounded-lg text-sm"
          onClick={handleResetFilters}
        >
          Xóa bộ lọc
        </button>
      </div>

      <Modal
        className="lg:mt-10 md:mt-10 sm:mt-16 max-sm:mt-24"
        show={openModal}
        size="xl"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <h2 className="text-lg font-semibold">Lọc sản phẩm</h2>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Accordion collapseAll>
              <Accordion.Panel>
                <Accordion.Title>Chọn màu</Accordion.Title>
                <Accordion.Content>
                  <h6 className="mb-3 text-sm font-medium text-gray-900">
                    Màu sắc
                  </h6>
                  <ul className="space-y-2 text-sm">
                    {dataColor?.map((color) => (
                      <li className="flex items-center" key={color.id}>
                        <input
                          id={color.id}
                          type="checkbox"
                          value={color.id}
                          checked={selectedColors.includes(color.id)}
                          onChange={() => handleColorChange(color.id)}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500"
                        />
                        <label htmlFor={color.id} className="ml-2">
                          {color.colorName}
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Chọn thương hiệu</Accordion.Title>
                <Accordion.Content>
                  <select
                    id="brand"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    value={selectedBrand}
                    onChange={handleBrandChange}
                  >
                    <option value="">Chọn thương hiệu</option>
                    {Array.isArray(dataBrand) && dataBrand.length > 0
                      ? dataBrand.map((brand) => (
                          <option key={brand.brandId} value={brand.brandId}>
                            {brand.brandName}
                          </option>
                        ))
                      : null}
                  </select>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Chọn kích cỡ</Accordion.Title>
                <Accordion.Content>
                  <select
                    id="size"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    value={selectedSize}
                    onChange={handleSizeChange}
                  >
                    <option value="">Chọn size</option>
                    {dataSize?.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </Accordion.Content>
              </Accordion.Panel>

              <Accordion.Panel>
                <Accordion.Title>Chọn loại giày</Accordion.Title>
                <Accordion.Content>
                  <select
                    id="shoeType"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                    value={selectedShoeType}
                    onChange={handleShoeTypeChange}
                  >
                    <option value="">Chọn loại giày</option>
                    {dataShoeType?.map((type) => (
                      <option key={type.shoeTypeId} value={type.shoeTypeId}>
                        {type.shoeTypeName}
                      </option>
                    ))}
                  </select>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Giá</Accordion.Title>
                <Accordion.Content>
                  <div className="price-range">
                    <div className="flex justify-between">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={handlePriceChange}
                        className="w-50 p-2 border border-gray-300 rounded"
                        placeholder="Giá tối thiểu"
                      />
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={handleMaxPriceChange}
                        className="w-50 p-2 border border-gray-300 rounded"
                        placeholder="Giá tối đa"
                      />
                    </div>
                    <div className="mt-2 flex justify-between">
                      <button
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={handleFilterSubmit}
                      >
                        Áp dụng
                      </button>
                      <button
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={handleResetFilters}
                      >
                        Đặt lại
                      </button>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="w-full p-2.5 text-white bg-blue-600 rounded-lg text-sm"
            onClick={handleFilterSubmit}
          >
            Lọc
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default FilterProduct
