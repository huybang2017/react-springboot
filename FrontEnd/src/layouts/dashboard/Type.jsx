import { useState } from 'react'
import TableType from '../../components/admin/type/TableType'
import AddTypeDialog from '../../components/admin/type/AddTypeDialog'


const Type = () => {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

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
                Quản lý loại sản phẩm
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
                      placeholder="Search..."
                      onChange={handleSearch}
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
                  <span>Thêm loại mới</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <TableType search={search} />

      </div>

      <div>
        <AddTypeDialog
          open={isAddOpen}
          handleOpen={handleAddOpen}
        />
      </div>
    </>
  )
}

export default Type
