import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAccountsApiThunk,
  putAccountApiThunk,
} from '../../../reducers/auth/AccountSlice.jsx'
import Loader from '../../loader/Loader'
import toast from 'react-hot-toast'
import { Pagination, Stack } from '@mui/material'

const TableUser = ({ search }) => {
  const dispatch = useDispatch()
  const { data, status, error } = useSelector((state) => state.accountReducer)

  const [pageNumber, setPageNumber] = useState(1)
  const pageSize = 10
  const [sort, setSort] = useState('id,asc')

  useEffect(() => {
    dispatch(getAccountsApiThunk({ pageSize, pageNumber, sort, search }))
  }, [dispatch, pageNumber, sort, search])

  useEffect(() => {
    if (status === 'succeededPutAccountApiThunk') {
      dispatch(getAccountsApiThunk({ pageSize, pageNumber, sort, search }))
    }
  }, [status])

  if (status === 'loading') return <Loader />
  if (status === 'failed') return <div>Error: {error}</div>

  const handleToggleStatus = async (accountId, currentStatus) => {
    try {
      const formData = new FormData()
      formData.append('accountId', accountId)
      formData.append('status', !currentStatus)
      dispatch(putAccountApiThunk(formData))
      toast.success('Sửa trạng thái thành công')
    } catch (error) {
      toast.error('Sửa trạng thái thất bại')
      console.error(error)
    }
  }

  const handleSort = (field) => {
    setSort((prevSort) => {
      const [currentField, currentDirection] = prevSort.split(',')
      const newDirection =
        currentField === field && currentDirection === 'asc' ? 'desc' : 'asc'
      return `${field},${newDirection}`
    })
  }

  const handleChangePage = (e, page) => {
    setPageNumber(page)
  }

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
                        style={{ width: '100px' }} // Fixed width for ID column
                      >
                        <div className="flex items-center gap-x-3">
                          <button
                            className="flex items-center gap-x-2"
                            onClick={() => handleSort('id')}
                          >
                            <span>ID</span>
                            {sort.startsWith('id') && (
                              <span
                                className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                              >
                                {sort.endsWith('asc') ? '▲' : '▼'}
                              </span>
                            )}
                          </button>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        style={{ width: '200px' }} // Fixed width for Email column
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('userInformation.email')}
                        >
                          Email
                          {sort.startsWith('userInformation.email') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        style={{ width: '150px' }} // Fixed width for Ngày tạo column
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('createAt')}
                        >
                          Ngày tạo
                          {sort.startsWith('createAt') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        style={{ width: '200px' }} // Fixed width for Trạng thái column
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('status')}
                        >
                          Trạng thái
                          {sort.startsWith('status') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        style={{ width: '150px' }} // Fixed width for Quyền column
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('role')}
                        >
                          Quyền
                          {sort.startsWith('role') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        style={{ width: '200px' }} // Fixed width for Loại tài khoản column
                      >
                        <button
                          className="flex items-center gap-x-2"
                          onClick={() => handleSort('type')}
                        >
                          Loại tài khoản
                          {sort.startsWith('type') && (
                            <span
                              className={`ml-2 ${sort.endsWith('asc') ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {sort.endsWith('asc') ? '▲' : '▼'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data?.content?.map((account) => (
                      <tr key={account.id}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <span>{account.id}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{account.email}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{account.createAt}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>
                            {account.status ? 'Hoạt động' : 'Đang khóa'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{account.role}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                          <span>{account.type}</span>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            {account.role !== 'Admin' && (
                              <>
                                {account.status ? (
                                  <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
                                    onClick={() =>
                                      handleToggleStatus(
                                        account.id,
                                        account.status,
                                      )
                                    }
                                  >
                                    Khóa
                                  </button>
                                ) : (
                                  <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none"
                                    onClick={() =>
                                      handleToggleStatus(
                                        account.id,
                                        account.status,
                                      )
                                    }
                                  >
                                    Mở khóa
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {data.totalPages === 0 && (
                  <div className="flex items-center justify-center p-10">
                    Không tìm thấy thông tin user
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-10 ">
            {data.totalPages > 0 && (
              <Stack spacing={2}>
                <Pagination
                  count={data.totalPages}
                  page={pageNumber}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default TableUser
