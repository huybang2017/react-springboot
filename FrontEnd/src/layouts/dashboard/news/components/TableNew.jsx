import * as React from 'react'
import { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { FaSortUp, FaSortDown, FaEdit, FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { NewsQuery } from './NewsQuery'
import { LuLoader2 } from 'react-icons/lu'

const ITEM_PER_PAGE = 10
const DEFAULT_PAGE = 1

export default function TableNew() {
  const redirect = useNavigate()
  const [inputSearch, setInputSearch] = useState('')
  const inputRef = React.useRef(null)
  const [filterValues, setFilterValues] = useState({
    status: '',
    from: '',
    to: '',
    search: '',
    sort: 'createTime,desc',
    pageNumber: DEFAULT_PAGE,
    pageSize: ITEM_PER_PAGE,
  })

  const params = Object.fromEntries(Object.entries(filterValues).filter(([_, v]) => v))

  const { data: news = { content: [], totalPages: 1 }, isLoading } = NewsQuery(params)

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilterValues((prevFilterValues) => ({
        ...prevFilterValues,
        search: inputSearch,
      }))
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [inputSearch])

  const [sortConfig, setSortConfig] = useState({ key: 'createTime', direction: 'desc' })

  const handleSort = (sortKey) => {
    setSortConfig((prevSort) => {
      const { key, direction } = prevSort
      const newDirection = key === sortKey && direction === 'asc' ? 'desc' : 'asc'
      return { key: sortKey, direction: newDirection }
    })

    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      sort: `${sortKey},${sortConfig.direction === 'asc' ? 'desc' : 'asc'}`,
    }))
  }

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? (
        <FaSortUp className="ml-2 text-blue-500" />
      ) : (
        <FaSortDown className="ml-2 text-red-500" />
      );
    }
    return null;
  };


  const handleChangePage = (e, p) => {
    setFilterValues((prev) => ({ ...prev, pageNumber: p }));
  };





  return (
    <div className="space-y-10">
      <div className="p-4 bg-white space-y-10 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Quản lý tin tức
            </h1>
          </div>
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center mb-4 sm:mb-0 gap-4">
              <form className="flex gap-2 items-center">
                <label htmlFor="products-search" className="sr-only">
                  Tìm
                </label>
                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <input
                    ref={inputRef}
                    type="text"
                    name="search"
                    id="search-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập tiêu đề"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    onFocus={() => {
                      if (inputSearch.length > 0) {
                        inputRef.current.focus()
                      }
                    }}
                  />
                </div>
              </form>
              <div>
                <label htmlFor="status">Trạng thái </label>
                <select
                  name="Status"
                  id="status"
                  className="px-4 py-2 rounded-md cursor-pointer"
                  value={filterValues.status}
                  onChange={(e) =>
                    setFilterValues({ ...filterValues, status: e.target.value })
                  }
                >
                  <option value="">Tất cả</option>
                  <option value="true">Hiển thị</option>
                  <option value="false">Ẩn</option>
                </select>
              </div>

              <button
                onClick={() => redirect('/dashboard/news/add')}
                className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
              >
                Thêm bài viết
              </button>
            </div>
          </div>
        </div>
      </div>
      <Table className="border">
        <TableHead className="bg-[#f9fafb]">
          <TableRow>
            <TableCell style={{
              width: '10%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }} className="cursor-pointer" onClick={() => handleSort('id')}>
              <span className="inline-flex items-center gap-1">
                ID
                {getSortIcon('id')}
              </span>
            </TableCell>
            <TableCell style={{
              width: '20%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }} className="cursor-pointer" onClick={() => handleSort('title')}>
              <span className="inline-flex items-center gap-1">
                Tiêu đề
                {getSortIcon('title')}
              </span>
            </TableCell>
            <TableCell style={{
              width: '10%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }}>Hình ảnh</TableCell>
            <TableCell style={{
              width: '10%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }} className="cursor-pointer" onClick={() => handleSort('createTime')}>
              <span className="inline-flex items-center gap-1">
                Thời gian tạo
                {getSortIcon('createTime')}
              </span>
            </TableCell>
            <TableCell style={{
              width: '10%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }} className="cursor-pointer" onClick={() => handleSort('status')}>
              <span className="inline-flex items-center gap-1">
                Trạng thái
                {getSortIcon('status')}
              </span>
            </TableCell>
            <TableCell style={{
              width: '10%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }} className="cursor-pointer" onClick={() => handleSort('priorityFlag')}>
              <span className="inline-flex items-center gap-1">
                Ưu tiên
                {getSortIcon('priorityFlag')}
              </span>
            </TableCell>

            <TableCell style={{
              width: '5%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }}>Sửa</TableCell>
            <TableCell style={{
              width: '5%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            }}>Xem</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
            <div className='w-full h-full flex items-center justify-center'>
              <LuLoader2 size={30} className=' animate-spin' />
            </div>
          )}

          {!isLoading && news?.content?.map((newsItem, index) => (
            <TableRow key={index} className="table-row" role="checkbox">
              <TableCell  >{newsItem.id}</TableCell>
              <TableCell  >{newsItem.title}</TableCell>
              <TableCell>
                <img
                  className="w-10 h-10 object-cover"
                  src={`${import.meta.env.VITE_API_URL}/NewsImage/${newsItem.banner}`}
                  alt="thumbnail"
                />
              </TableCell>
              <TableCell  >{newsItem.createTime}</TableCell>
              <TableCell  >{newsItem.status ? 'Hiển thị' : 'Ẩn'}</TableCell>
              <TableCell  >{newsItem.priorityFlag ? 'Có' : 'Không'}</TableCell>
              <TableCell>
                <button
                  onClick={() => redirect(`/dashboard/news/edit/${newsItem.id}`)}
                  className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4"
                >
                  <FaEdit size={20} />
                </button>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => redirect(`/dashboard/news/${newsItem.id}`)}
                  className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4"
                >
                  <FaEye size={20} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center pb-10">
        <Stack spacing={2}>
          <Pagination
            count={news.totalPages}
            page={filterValues.pageNumber}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  )
}
