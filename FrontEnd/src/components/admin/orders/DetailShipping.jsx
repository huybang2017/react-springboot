import { Modal } from 'flowbite-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNewestShippingFeesApiThunk } from '../../../reducers/shopping/ShippingFeeSlice'

export default function DetailShipping({
  openModalDetailShipping,
  setOpenModalDetailShipping,
}) {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.shippingFees)
  useEffect(() => {
    if (openModalDetailShipping) {
      dispatch(getNewestShippingFeesApiThunk())
    }
  }, [openModalDetailShipping])
  return (
    <Modal
      show={openModalDetailShipping}
      position="center"
      onClose={() => setOpenModalDetailShipping(false)}
    >
      <Modal.Header>Phí ship</Modal.Header>
      <Modal.Body>
        <div className="flex justify-center items-center">
          <p>Phí ship: {data ? data.fee : 'Không có phí ship'}</p>
        </div>
      </Modal.Body>
    </Modal>
  )
}
