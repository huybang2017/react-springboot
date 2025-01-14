import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../reducers/productReducer/ProductsSlice.jsx'
import { Pagination, Stack } from '@mui/material'
import { getShoeTypesNoPageApiThunk } from '../../reducers/productReducer/ShoeTypeSlice.jsx'
import { getBrandsNoPageApiThunk } from '../../reducers/productReducer/BrandSlice.jsx'
import FilterByDateDialog from '../../components/admin/product/FilterByDateDialog.jsx'
import AddProductDialog from '../../components/admin/product/AddProductDialog.jsx'
import { getColorsNoPageApiThunk } from '../../reducers/productReducer/ColorSlice.jsx'

import { FiLoader } from 'react-icons/fi'

const builderQueryString = (filters, page, itemsPerPage) => {
  const params = new URLSearchParams()
  Object.entries({
    ...filters,
    pageNumber: page || ' ',
    pageSize: itemsPerPage || ' ',
  }).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

const ITEM_PER_PAGE = 10
const DEFAULT_PAGE = 1

const Products = () => {
  const dispatch = useDispatch()

  const products = useSelector((state) => state.products)
  const shoetype = useSelector((state) => state.shoeTypeReducer)
  const brands = useSelector((state) => state.brandReducer) || []
  const colors = useSelector((state) => state.colorReducer)
  const totalPages = products.data.totalPages

  if (!products || !shoetype || !brands) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader size={30} className=" animate-spin" />
      </div>
    )
  }

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [isFilterDateOpen, setIsFilterDateOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const [filterValues, setFilterValues] = useState({
    search: '',
    brandId: '',
    shoeTypeId: '',
    priority: '',
    minCreateDate: '',
    maxCreateDate: '',
    sort: '',
  })

  useEffect(() => {
    const query = builderQueryString(filterValues, currentPage, ITEM_PER_PAGE)

    dispatch(getProducts(query))
    dispatch(getShoeTypesNoPageApiThunk())
    dispatch(getBrandsNoPageApiThunk())
    dispatch(getColorsNoPageApiThunk())
  }, [dispatch, filterValues, currentPage])

  const handleFilterDateOpen = () => {
    setIsFilterDateOpen(!isFilterDateOpen)
  }

  const handleAddOpen = () => {
    setIsAddOpen(!isAddOpen)
  }

  const handlePageChange = (e, p) => {
    setCurrentPage(p)
  }

  return (
    <>
      <div className="h-[90.2vh]">
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Quản lý sản phẩm
              </h1>
            </div>
            <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div className="flex items-center mb-4 sm:mb-0">
                <form className="sm:pr-3" action="#" method="GET">
                  <label htmlFor="products-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                      type="text"
                      name="email"
                      id="products-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Tìm sản phẩm ... "
                      onChange={(e) =>
                        setFilterValues({
                          ...filterValues,
                          search: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
              </div>

              <div className="flex items-center gap-2">
                <label>Thương hiệu</label>
                <select
                  className="rounded-md"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      brandId: e.target.value,
                    })
                  }
                >
                  <option value="">-- Tất cả --</option>
                  {brands &&
                    brands?.data.map &&
                    brands?.data.map((brand, index) => (
                      <option key={index} value={brand.brandId}>
                        {brand.brandName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label>Loại</label>
                <select
                  className="rounded-md"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      brandId: e.target.value,
                    })
                  }
                >
                  <option value="">-- Tất cả --</option>
                  {shoetype &&
                    shoetype.data.map &&
                    shoetype.data.map((type, index) => (
                      <option key={index} value={type.shoeTypeId}>
                        {type.shoeTypeName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label>Ưu tiên</label>
                <select
                  className="rounded-md"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="">-- Tất cả --</option>
                  <option value="true">Cao</option>
                  <option value="false">Thấp</option>
                </select>
              </div>

              <div className="ml-1 sm:ml-2">
                <button
                  onClick={() => setIsAddOpen(true)}
                  className="bg-blue-600 text-white flex items-center py-2 px-4 rounded-lg"
                >
                  <i className="fa-solid fa-plus text-center mr-2"></i>
                  <span>Thêm sản phẩm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <TableProduct key={1} data={products.data.content || []} types={shoetype.data} brands={brands.data} colors={colors.data} filterValues={filterValues} onChangeFilter={setFilterValues} /> */}

        <div className="flex items-center justify-center mt-10 pb-10">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>

      <div>
        <FilterByDateDialog
          open={isFilterDateOpen}
          handleOpen={handleFilterDateOpen}
          filterValues={filterValues}
          onchangeFilter={setFilterValues}
        />

        <AddProductDialog
          open={isAddOpen}
          setOpenModal={setIsAddOpen}
          handleOpen={handleAddOpen}
          types={shoetype.data}
          brands={brands.data}
          colors={colors.data}
        />
      </div>
    </>
  )
}

export default Products
