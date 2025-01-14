import { Modal } from 'flowbite-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createShippingFeeApiThunk } from '../../../reducers/shopping/ShippingFeeSlice'
import { useEffect } from 'react'
import { alertError, alertSuccess } from '../../sweeetalert/sweetalert'
// import your createShippingFee action here
// import { createShippingFee } from './yourReduxSlice'

export default function CreateShipping({
  openModalCreateShipping,
  setOpenModalCreateShipping,
}) {
  const dispatch = useDispatch()
  const { status, error } = useSelector((state) => state.shippingFees)
  const [fee, setFee] = useState('')
  const [errorMessages, setErrorMessages] = useState([])

  const handleCreateShippingFee = () => {
    if (fee.trim() === '') {
      setErrorMessages(['Vui lòng nhập phí ship'])
      return
    }

    if (isNaN(fee)) {
      setErrorMessages(['Phí ship phải là một số hợp lệ'])
      return
    }

    if (parseFloat(fee) >= 500000) {
      setErrorMessages(['Phí ship phải nhỏ hơn 500,000'])
      return
    }

    setErrorMessages([])

    dispatch(createShippingFeeApiThunk({ fee }))
    setOpenModalCreateShipping(false)
  }

  useEffect(() => {
    if (status === 'succeededCreateShippingFeeApiThunk') {
      alertSuccess('Tạo phí ship thành công')
    } else if (status === 'failed') {
      alertError(error.detailMessage)
    }
  }, [status])

  return (
    <Modal
      show={openModalCreateShipping}
      position="center"
      onClose={() => setOpenModalCreateShipping(false)}
    >
      <Modal.Header>Tạo phí ship</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 p-6">
          <p>Nhập phí ship</p>
          <input
            type="text"
            placeholder="Nhập phí ship"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="border p-2 w-full"
          />
          {errorMessages.length > 0 && (
            <p className="text-red-500 text-sm mt-1">{errorMessages[0]}</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={handleCreateShippingFee}
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tạo
        </button>
        <button
          onClick={() => setOpenModalCreateShipping(false)}
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Hủy
        </button>
      </Modal.Footer>
    </Modal>
  )
}
