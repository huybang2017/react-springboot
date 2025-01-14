import { Checkbox } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import _ from 'lodash'

import '../style.css'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const ProductSelected = ({
  isOpen,
  products,
  handleOpen,
  productTypes,
  filterValues,
  onFilterSelect,
  totalPages,
  currentPage,
  setCurrentPage,
  ProductBrands,
  selectedProducts,
  setSelectedProducts,
}) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSelectionChange = (value) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((product) => product !== value)
      } else {
        return [...prevSelected, value]
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    onFilterSelect({ ...filterValues, search: searchValue })
  }

  const handleChangePage = (e, p) => {
    setCurrentPage(p)
  }

  if (!products || !productTypes || !ProductBrands) {
    return null
  }

  const handleChecked = (array, object) => {
    const exists = array.some((item) => _.isEqual(item.shoeId, object.shoeId))
    return exists
  }

  return (
    <div
      className={`${isOpen ? 'fixed' : 'hidden'} animate-dropdown top-0 left-0 w-full h-full animate-dropdown flex items-center justify-center`}
    >
      <div className="flex items-center justify-center bg-white shadow-2xl border rounded-md">
        <div className="relative w-[75rem] p-5 h-[40rem] overflow-y-auto space-y-5">
          <button
            className="absolute  top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
            onClick={handleOpen}
          >
            <CloseIcon className="text-2xl" />
          </button>

          <h3 className="font-semibold text-xl text-center ">
            Chọn sản phẩm để nhập kho
          </h3>

          <div>
            <div className="flex items-center gap-10">
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm"
                  className="rounded-md"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                 <button
                    type="button"
                    className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                                    >
                    Tìm
                  </button>
              </form>
              <div className="block border-r border-zinc-500 h-8" />
              <div className="flex gap-2 items-center">
                <label htmlFor="shoeType">Loại</label>
                <select
                  name="shoeType"
                  id="shoeType"
                  className="rounded-md"
                  onChange={(e) =>
                    onFilterSelect({
                      ...filterValues,
                      shoeTypeId: e.target.value,
                    })
                  }
                >
                  <option value="">Tất cả</option>
                  {productTypes.length > 0 &&
                    productTypes.map((type) => (
                      <option key={type.shoeTypeId} value={type.shoeTypeId}>
                        {type.shoeTypeName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="block border-r border-zinc-500 h-8" />

              <div className="flex gap-2 items-center">
                <label htmlFor="shoeType">thương hiệu</label>
                <select
                  name="brand"
                  id="brand"
                  className="rounded-md"
                  onChange={(e) =>
                    onFilterSelect({ ...filterValues, brandId: e.target.value })
                  }
                >
                  <option value="">Tất cả</option>
                  {ProductBrands.length > 0 &&
                    ProductBrands.map((brand) => (
                      <option key={brand.brandId} value={brand.brandId}>
                        {brand.brandName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {products.length === 0 && (
            <p className="text-center text-sm">Không tìm thấy sản phẩm nào.</p>
          )}

          {products.length > 0 && (
            <div>
              <div className="flex flex-col gap-4">
                {products.map((product) => (
                  <div
                    key={String(product.shoeId ? product.shoeId : '')}
                    className="flex items-center space-x-2 border rounded-md gap-5 p-2"
                  >
                    <Checkbox
                      id={product.shoeId ? `${product.shoeId}` : ''}
                      value={product}
                      checked={handleChecked(selectedProducts, product)}
                      onChange={(e) => handleSelectionChange(product)}
                    />

                    <img
                      src={
                        product.defaultImage
                          ? `${import.meta.env.VITE_API_URL}/ShoeImage/Image/` +
                            product?.defaultImage
                          : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                      }
                      className=" object-cover rounded-md w-20 h-20 "
                      alt="ShoeImage"
                    />
                    <label className="text-sm" htmlFor={product.shoeId}>
                      {product.shoeName}
                    </label>
                  </div>
                ))}
              </div>

              <div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductSelected
