import { useState } from 'react'
import EditColorDialog from './EditColorDialog'
import DeleteColorDialog from './DeleteTypeDialog'
import ViewColorDialog from './ViewColorDialog'

import { FaCaretUp, FaCaretDown } from 'react-icons/fa'
import { CiEdit } from 'react-icons/ci'
import { FaRegTrashAlt } from 'react-icons/fa'

const TableColor = ({ data }) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [currentColor, setCurrentColor] = useState(null)

  const [sortConfig, setSortConfig] = useState(null)

  const handleEditOpen = () => {
    setIsEditOpen(!isEditOpen)
  }

  const handleDeleteOpen = () => {
    setIsDeleteOpen(!isDeleteOpen)
  }

  const handleViewOpen = () => {
    setIsViewOpen(!isViewOpen)
  }

  const handleSort = (key) => {
    let direction = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = sortConfig
    ? [...data?.content].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    : data?.content || []

  const renderSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === 'ascending' ? (
      <FaCaretUp size={20} />
    ) : (
      <FaCaretDown size={20} />
    )
  }

  return (
    <>
      <section className="px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                {sortedData.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 w-1/4" // Cố định chiều rộng cho cột ID
                        >
                          <div className="flex items-center gap-x-3">
                            <button
                              onClick={() => handleSort('id')}
                              className="flex items-center gap-x-2"
                            >
                              <span>ID</span>
                              {renderSortIcon('id')}
                            </button>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 w-1/2" // Cố định chiều rộng cho cột Name
                        >
                          <button
                            onClick={() => handleSort('colorName')}
                            className="flex items-center gap-x-2"
                          >
                            Name
                            {renderSortIcon('colorName')}
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400 w-1/6" // Cố định chiều rộng cho cột Sửa
                        >
                          Sửa
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 px-4 font-normal text-gray-500 dark:text-gray-400 w-1/6" // Cố định chiều rộng cho cột Xóa
                        >
                          Xóa
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {sortedData.map((color) => (
                        <tr key={color.id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <span>{color.id}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <span>{color.colorName}</span>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              <button
                                onClick={() => {
                                  setCurrentColor(color), setIsEditOpen(true)
                                }}
                                className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                              >
                                <CiEdit size={20} />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap text-center align-middle">
                            <div className="flex items-center gap-x-6 justify-center">
                              <button
                                onClick={() => {
                                  setCurrentColor(color), setIsDeleteOpen(true)
                                }}
                                className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                              >
                                <FaRegTrashAlt size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    Không có dữ liệu
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        {currentColor && (
          <div>
            <EditColorDialog
              open={isEditOpen}
              handleOpen={handleEditOpen}
              data={currentColor}
            />

            <DeleteColorDialog
              open={isDeleteOpen}
              handleClose={handleDeleteOpen}
              data={currentColor}
            />

            <ViewColorDialog
              open={isViewOpen}
              handleOpen={handleViewOpen}
              data={currentColor}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default TableColor
