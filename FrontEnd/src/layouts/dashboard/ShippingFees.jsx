import { useState } from 'react'
import ShippingFeeTable from '../../components/admin/shippingFeeComponents/ShippingFeeTable.jsx'
import FormShippingFee from '../../components/admin/shippingFeeComponents/FormShippingFee.jsx'
const ShippingFees = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="h-[90.2vh]">
      <div className="p-4 bg-white border-b border-gray-200 lg:mt-1.5 dark:bg-gray-700 dark:border-gray-700">
        <div className="mb-4 flex">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Quản lý phí vận chuyển
          </h1>
        </div> 
        <div className="ml-1 sm:ml-2">
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
            >
            <i className="fa-solid fa-plus text-center mr-2"></i>
            <span>Thêm phí ship</span>
          </button>
        </div>
      </div>
      <ShippingFeeTable />
      <FormShippingFee openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  )
}

export default ShippingFees
