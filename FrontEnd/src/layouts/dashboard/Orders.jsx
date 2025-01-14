import { useState } from 'react'
import OrderDetail from '../../components/admin/orders/OrderDetail.jsx'
import TableOrder from '../../components/admin/orders/TableOrder.jsx'
import { Link } from 'react-router-dom'
import DetailShipping from '../../components/admin/orders/DetailShipping.jsx'
import CreateShipping from '../../components/admin/orders/CreateShipping.jsx'

const Orders = () => {
  const [openModalOrderDetail, setOpenModalOrderDetail] = useState(false)
  const [openModalDetailShipping, setOpenModalDetailShipping] = useState(false)
  const [openModalCreateShipping, setOpenModalCreateShipping] = useState(false)
  const [id, setId] = useState(null)
  const [params, setParams] = useState({
    pageSize: 8,
    pageNumber: 1,
    status: null,
    sort: 'orderDate,desc',
    search: null,
    type: null,
    from: null,
    to: null,
  })

  const handleChangeSearchParams = (e) => {
    const { name, value } = e.target
    setParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }))
  }

  const handleResetParams = () => {
    setParams({
      pageSize: 8,
      pageNumber: 1,
      status: null,
      sort: null,
      search: null,
      type: null,
      from: null,
      to: null,
    })
  }

  return (
    <>
      <div className="h-[90.2vh]">
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Quản lý đơn hàng
              </h1>
            </div>
            <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div className="flex items-center mb-4 sm:mb-0">
                <div>
                  <label htmlFor="products-search">Tìm kiếm mã đơn hàng:</label>
                  <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={params.search || ''}
                      onChange={handleChangeSearchParams}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
              <div className="ml-1 sm:ml-2">
                <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                  <div>
                    <label htmlFor="order-type">Trạng thái:</label>
                    <select
                      id="status"
                      name="status"
                      value={params.status || ''}
                      onChange={handleChangeSearchParams}
                      className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    >
                      <option selected>Tất cả</option>
                      <option value="ChoDuyet">Chờ duyệt</option>
                      <option value="DaDuyet">Đã duyệt</option>
                      <option value="DangGiao">Đang giao</option>
                      <option value="GiaoThanhCong">Giao thành công</option>
                      <option value="Huy">Hủy</option>
                    </select>
                  </div>
                  <div>
                    <label>Từ ngày:</label>
                    <input
                      type="date"
                      name="from"
                      value={params.from || ''}
                      onChange={handleChangeSearchParams}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label>Đến ngày:</label>
                    <input
                      type="date"
                      name="to"
                      value={params.to || ''}
                      onChange={handleChangeSearchParams}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div className="flex justify-center gap-5">
                    <button
                      type="button"
                      onClick={handleResetParams}
                      className=" mt-6 flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                    >
                      Xóa tìm kiếm
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenModalDetailShipping(true)}
                      className=" mt-6 flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                    >
                      Xem phí ship
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenModalCreateShipping(true)}
                      className="mt-6 flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                    >
                      Tạo phí ship
                    </button>
                    <Link
                      to="/dashboard/orders/create"
                      className="mt-6 flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none text-center"
                    >
                      Tạo sản phẩm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TableOrder
          setOpenModalOrderDetail={setOpenModalOrderDetail}
          setId={setId}
          params={params}
          setParams={setParams}
        />
        <OrderDetail
          openModalOrderDetail={openModalOrderDetail}
          setOpenModalOrderDetail={setOpenModalOrderDetail}
          id={id}
        />
        <DetailShipping
          openModalDetailShipping={openModalDetailShipping}
          setOpenModalDetailShipping={setOpenModalDetailShipping}
        />
        <CreateShipping
          openModalCreateShipping={openModalCreateShipping}
          setOpenModalCreateShipping={setOpenModalCreateShipping}
        />
      </div>
    </>
  )
}
export default Orders
