import { useState, useEffect } from 'react'
import TableColor from '../../components/admin/color/TableColor'
import { useDispatch, useSelector } from 'react-redux'
import { getColorsApiThunk } from '../../reducers/productReducer/ColorSlice'
import AddColorDialog from '../../components/admin/color/AddColorDialog'
import EditColorDialog from '../../components/admin/color/EditColorDialog'
import { Pagination, Stack } from '@mui/material'

const ITEM_PER_PAGE = 10
const DEFAULT_PAGE = 1

const buildQueryString = (filters, page, itemsPerPage) => {
  const params = new URLSearchParams()

  Object.entries({
    ...filters,
    pageNumber: page || '',
    pageSize: itemsPerPage || '',
  }).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

const Color = () => {
  const dispatch = useDispatch()

  const { data } = useSelector((state) => state.colorReducer)

  const totalPages = data.totalPages

  const [isAddOpen, setIsAddOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const [filterValues, setFilterValues] = useState({
    search: '',
  })

  const handlePageChange = (e, p) => {
    setCurrentPage(p)
  }

  useEffect(() => {
    const query = buildQueryString(filterValues, currentPage, ITEM_PER_PAGE)
    dispatch(getColorsApiThunk(query))
  }, [dispatch, filterValues, currentPage])

  const handleAddOpen = () => {
    setIsAddOpen(!isAddOpen)
  }

  return (
    <>
      <div className="h-[90.2vh]">
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Quản lý màu sắc sản phẩm
              </h1>
            </div>
            <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div className="flex items-center mb-4 sm:mb-0">
                <form className="sm:pr-3" action="#" method="GET">
                  <label htmlFor="colors-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                      type="text"
                      name="search"
                      id="colors-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search..."
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
              <div className="ml-1 sm:ml-2">
                <button
                  onClick={() => setIsAddOpen(true)}
                  className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                >
                  <i className="fa-solid fa-plus text-center mr-2"></i>
                  <span>Thêm màu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <TableColor search={search} data={data} />

        <div className="flex items-center justify-center mt-10">
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
        <AddColorDialog open={isAddOpen} handleOpen={handleAddOpen} />
      </div>
    </>
  )
}

export default Color
