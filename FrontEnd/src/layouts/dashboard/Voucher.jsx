import { useEffect, useState } from 'react'
import TableVoucher from '../../components/admin/vouchers/TableVoucher'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVouchers } from '../../reducers/voucherReducer/VoucherSlice'
import VoucherConditionDialog from '../../components/admin/vouchers/VoucherConditionDialog'
import VoucherDiscountAmountDialog from '../../components/admin/vouchers/VoucherDiscountAmountDialog'
import AddVoucherDialog from '../../components/admin/vouchers/AddVoucherDialog'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
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

const Voucher = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [searchValue, setSearchValue] = useState('')
  const error = useSelector((state) => state.vouchers.error)
  let voucherData =
    useSelector((state) =>
      state.vouchers.data.content
        ? state.vouchers.data.content
        : state.vouchers.data,
    ) || []
  let status = useSelector((state) => state.vouchers.status)

  let vouchers = Array.isArray(voucherData) ? voucherData : [voucherData]

  if (error) {
    vouchers = []
  }

  const totalPages = useSelector((state) => state.vouchers.data.totalPages)
  const [filterValues, setFilterValues] = useState({
    status: '',
    isFreeShip: '',
    minCondition: '',
    maxCondition: '',
    minDiscountAmount: '',
    maxDiscountAmount: '',
    sort: '',
    search: '',
  })
  const [isConditionOpen, setIsConditionOpen] = useState(false)
  const [isDisCountAmountOpen, setIsDisCountAmountOpen] = useState(false)
  const [isAddVoucherOpen, setIsAddVoucherOpen] = useState(false)

  useEffect(() => {
    const query = buildQueryString(filterValues, currentPage, ITEM_PER_PAGE)
    dispatch(fetchVouchers(query))
  }, [dispatch, filterValues, currentPage])

  if (!vouchers) return <div>Loading...</div>

  const handleResetFilter = () => {
    setFilterValues({
      status: '',
      isFreeShip: '',
      minCondition: '',
      maxCondition: '',
      minDiscountAmount: '',
      maxDiscountAmount: '',
      sort: '',
      search: '',
    })
    setCurrentPage(DEFAULT_PAGE)
  }

  const handleConditionClickOpen = () => {
    setIsConditionOpen(!isConditionOpen)
  }
  const handleDiscountAmountClickOpen = () => {
    setIsDisCountAmountOpen(!isDisCountAmountOpen)
  }
  const handleAddVoucherClickOpen = () => {
    setIsAddVoucherOpen(!isAddVoucherOpen)
  }
  const handleChangePage = (e, p) => {
    setCurrentPage(p)
  }

  return (
    <div className="h-[90.2vh]">
      <div className="p-4 bg-white space-y-10 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Quản lý vouchers
            </h1>
          </div>
          <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div className="flex items-center mb-4 sm:mb-0 gap-4">
              <form className="flex gap-2 items-center" action="#" method="GET">
                <label htmlFor="products-search" className="sr-only">
                  Tìm
                </label>
                <div className="relative w-48 mt-6 sm:w-64 xl:w-96">
                  <input
                    type="text"
                    name="search"
                    id="voucher-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Nhập mã voucher"
                    value={filterValues.searchValue}
                    onChange={(e) =>
                      setFilterValues({
                        ...filterValues,
                        search: e.target.value,
                      })
                    }
                  />
                </div>
              </form>

              <div>
                <label htmlFor="status">Trạng thái </label>
                <select
                  name="Status"
                  id="status"
                  className="px-4 py-2 rounded-md cursor-pointer"
                  onChange={(e) =>
                    setFilterValues((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <option value="">Tất cả</option>
                  <option value="true">Công khai</option>
                  <option value="false">Ẩn</option>
                </select>
              </div>

              <div>
                <label htmlFor="isFreeShip">Freeship </label>
                <select
                  name="isFreeShip"
                  id="isFreeShip"
                  className="px-4 py-2 rounded-md cursor-pointer"
                  onChange={(e) =>
                    setFilterValues((prev) => ({
                      ...prev,
                      isFreeShip: e.target.value,
                    }))
                  }
                >
                  <option value="">Tất cả</option>
                  <option value="true">Có</option>
                  <option value="false">Không</option>
                </select>
              </div>

              <button
                onClick={() => setIsConditionOpen(true)}
                className="flex mt-6 items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
              >
                <span className="whitespace-nowrap tracking-tight font-semibold">
                  {' '}
                  Lọc điều kiện
                </span>
              </button>
              <button
                onClick={() => setIsDisCountAmountOpen(true)}
                className="flex mt-6 items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
              >
                <span className="whitespace-nowrap tracking-tight font-semibold">
                  {' '}
                  Lọc giá
                </span>
              </button>
              <button
                onClick={handleResetFilter}
                className="flex mt-6 items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
              >
                <span className="whitespace-nowrap tracking-tight font-semibold">
                  {' '}
                  Xóa bộ lọc
                </span>
              </button>
              <button
                onClick={() => setIsAddVoucherOpen(true)}
                className="flex mt-6 items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
              >
                <span className="whitespace-nowrap tracking-tight font-semibold">
                  {' '}
                  Thêm voucher
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <TableVoucher
        vouchers={vouchers}
        filterValues={filterValues}
        onChangeFilter={setFilterValues}
        totalPages={totalPages}
        status={status}
      />

      <div className="flex items-center justify-center mb-5 mt-10  pb-10">
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

      <div>
        <VoucherConditionDialog
          isOpen={isConditionOpen}
          handleOpen={handleConditionClickOpen}
          onChangeFilterValue={setFilterValues}
          filterValue={filterValues}
        />

        <VoucherDiscountAmountDialog
          isOpen={isDisCountAmountOpen}
          handleOpen={handleDiscountAmountClickOpen}
          onChangeFilterValue={setFilterValues}
          filterValue={filterValues}
        />

        <AddVoucherDialog
          isOpen={isAddVoucherOpen}
          handleOpen={handleAddVoucherClickOpen}
        />
      </div>
    </div>
  )
}

export default Voucher
