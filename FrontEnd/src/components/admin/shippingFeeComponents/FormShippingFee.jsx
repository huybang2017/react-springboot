import { Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createShippingFeeApiThunk } from '../../../reducers/shopping/ShippingFeeSlice.jsx'
import { alertSuccess } from '../../sweeetalert/sweetalert.jsx'
const FomrShippingFee = ({ openModal, setOpenModal }) => {
  const [fee, setFee] = useState('')
  const dispatch = useDispatch()
  const {
    data,
    status: apiStatus,
    error,
  } = useSelector((state) => state.shippingFees)

  const handleSubmitShippingFee = (event) => {
    event.preventDefault()
    dispatch(createShippingFeeApiThunk({ fee }))
    setOpenModal(false)
  }

  useEffect(() => {
    if (apiStatus === 'succeededCreateShippingFeeApiThunk') {
      alertSuccess('Tạo thành công')
    }
  }, [apiStatus])

  return (
    <>
      <Modal
        show={openModal}
        size="4xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <h3 className="p-4 text-xl font-medium text-gray-900 dark:text-white">
            Thêm Shipping Fee
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form
            className="max-w-none mx-auto"
            onSubmit={handleSubmitShippingFee}
          >
            <div className="py-2 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="fee"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fee
                  </label>
                  <input
                    type="number"
                    id="fee"
                    name="fee"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="50000"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center pt-5">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
                >
                  <span>Add Fee</span>
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FomrShippingFee
