import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBrandsApiThunk } from '../../../reducers/productReducer/BrandSlice.jsx'
import Loader from '../../loader/Loader'
import EditBrandDialog from './EditBrandDialog.jsx'
import ViewBrandDialog from './ViewBrandDialog.jsx'
import DeleteBrandDialog from './DeleteBrandDialog.jsx'
import { CiEdit } from 'react-icons/ci'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Pagination, Stack } from '@mui/material'
const TableBrand = ({ search }) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.brandReducer)
  const PAGE_SIZE = 10
  const [sort, setSort] = useState('brandId')
  const [pageNumber, setPageNumber] = useState(1)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [currentBrand, setCurrentBrand] = useState(false)

  useEffect(() => {
    dispatch(
      getBrandsApiThunk({ pageSize: PAGE_SIZE, pageNumber, sort, search }),
    )
  }, [dispatch, pageNumber, sort, search])

  const handleSort = (sortKey) => {
    setSort((prevSort) => {
      const [key, order] = prevSort.split(',')
      return key === sortKey && order === 'asc'
        ? `${sortKey},desc`
        : `${sortKey},asc`
    })
  }

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage)
  }

  const handleEditOpen = () => {
    setIsEditOpen(!isEditOpen)
  }
  const handleDeleteOpen = () => {
    setIsDeleteOpen(!isDeleteOpen)
  }
  const handleViewOpen = () => {
    setIsViewOpen(!isViewOpen)
  }

  if (loading) return <Loader />
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <section className="px-4 mx-auto">
        <div className="flex flex-col mt-4">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="w-1/12 py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-x-3">
                          <button
                            onClick={() => handleSort('brandId')}
                            className="flex items-center gap-x-2"
                          >
                            <span>ID</span>
                            {sort.startsWith('brandId') && (
                              <span>
                                {sort.split(',')[1] === 'asc' ? '▲' : '▼'}
                              </span>
                            )}
                          </button>
                        </div>
                      </th>
                      <th className="w-1/12 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Logo
                      </th>
                      <th className="w-4/12 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => handleSort('brandName')}
                          className="flex items-center gap-x-2"
                        >
                          Name
                          {sort.startsWith('brandName') && (
                            <span>
                              {sort.split(',')[1] === 'asc' ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="relative w-1/12 py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Sửa
                      </th>
                      <th className="relative w-1/12 py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400">
                        Xóa
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.content?.length > 0 ? (
                      data.content.map((brand) => (
                        <tr key={brand.brandId}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <span>{brand.brandId}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <img
                              src={`${import.meta.env.VITE_API_URL}/Brand/Image/${brand.logo}`}
                              alt=""
                              className="h-12 w-12 object-cover rounded"
                            />
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{brand.brandName}</span>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              {brand.brandId !== 1 && (
                                <button
                                  onClick={() => {
                                    setCurrentBrand(brand), setIsEditOpen(true)
                                  }}
                                  className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                                >
                                  <CiEdit size={20} />
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              {brand.brandId !== 1 && (
                                <button
                                  onClick={() => {
                                    setCurrentBrand(brand),
                                      setIsDeleteOpen(true)
                                  }}
                                  className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                                >
                                  <FaRegTrashAlt size={20} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300"
                        >
                          Không có dữ liệu.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-10 pb-10">
          <Stack spacing={2}>
            <Pagination
              count={data.totalPages}
              page={pageNumber}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </section>

      <div>
        {currentBrand && (
          <div>
            <EditBrandDialog
              open={isEditOpen}
              handleOpen={handleEditOpen}
              data={currentBrand}
            />

            <ViewBrandDialog
              open={isViewOpen}
              handleOpen={handleViewOpen}
              data={currentBrand}
            />

            <DeleteBrandDialog
              open={isDeleteOpen}
              handleClose={handleDeleteOpen}
              data={currentBrand}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default TableBrand
