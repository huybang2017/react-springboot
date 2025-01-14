import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../loader/Loader'
import { getShoeTypesApiThunk } from '../../../reducers/productReducer/ShoeTypeSlice.jsx'

import DeleteTypeDialog from './DeleteTypeDialog.jsx'
import EditTypeDialog from './EditTypeDialog.jsx'
import { CiEdit } from 'react-icons/ci'
import { FaRegTrashAlt } from 'react-icons/fa'
import ViewTypeDialog from './ViewTypeDialog.jsx'
import { Pagination, Stack } from '@mui/material'

const TableType = ({ search }) => {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.shoeTypeReducer)

  const [currentType, setCurrentType] = useState()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

  const PAGE_SIZE = 10
  const [sort, setSort] = useState('shoeTypeId,asc')
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    dispatch(
      getShoeTypesApiThunk({
        pageSize: PAGE_SIZE,
        pageNumber: pageNumber,
        sort: sort,
        search: search,
      }),
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
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <button
                            onClick={() => handleSort('shoeTypeId')}
                            className="flex items-center gap-x-2"
                          >
                            <span>ID</span>
                            {sort.startsWith('shoeTypeId') && (
                              <span>
                                {sort.split(',')[1] === 'desc' ? '▲' : '▼'}
                              </span>
                            )}
                          </button>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button
                          onClick={() => handleSort('shoeTypeName')}
                          className="flex items-center gap-x-2"
                        >
                          Tên
                          {sort.startsWith('shoeTypeName') && (
                            <span>
                              {sort.split(',')[1] === 'desc' ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400"
                      >
                        Sửa
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400"
                      >
                        Xóa
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.content?.length > 0 ? (
                      data.content.map((properties) => (
                        <tr key={properties.shoeTypeId}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <span>{properties.shoeTypeId}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{properties.shoeTypeName}</span>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              {properties.shoeTypeId !== 1 && (
                                <button
                                  onClick={() => {
                                    setCurrentType(properties),
                                      setIsEditOpen(true)
                                  }}
                                  className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                                >
                                  <CiEdit size={20} />
                                </button>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              {properties.shoeTypeId !== 1 && (
                                <button
                                  onClick={() => {
                                    setCurrentType(properties),
                                      setIsDeleteOpen(true)
                                  }}
                                  className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
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
                          colSpan={4}
                          className="text-center py-4 text-gray-500"
                        >
                          Không có dữ liệu
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
        {currentType && (
          <div>
            <DeleteTypeDialog
              open={isDeleteOpen}
              handleClose={handleDeleteOpen}
              data={currentType}
            />

            <EditTypeDialog
              open={isEditOpen}
              handleOpen={handleEditOpen}
              data={currentType}
            />
            <ViewTypeDialog
              open={isViewOpen}
              handleOpen={handleViewOpen}
              data={currentType}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default TableType
