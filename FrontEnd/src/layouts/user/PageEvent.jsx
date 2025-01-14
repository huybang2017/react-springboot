import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentEvent } from '../../reducers/eventReducer/EventSlice'

import { LuLoader2 } from 'react-icons/lu'
import EventInfo from '../../components/events/EventInfo.jsx'
import ProductList from '../../components/events/ProductList'
import Countdown from '../../components/events/CountDown.jsx'
const PageEvent = () => {
  const dispatch = useDispatch()
  const { data, status, err } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(getCurrentEvent())
  }, [dispatch])

  if (status === 'loading') {
    return (
      <div className="absolute left-0 top-0 w-full h-screen flex items-center justify-center">
        <LuLoader2 className=" animate-spin " />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-40">
        Không có sự kiện nào
      </div>
    )
  }

  return (
    <div className="w-full h-full space-y-10 mt-10">
      <div className="w-full flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl md:text-5xl">
          {' '}
          Flash Sale kết thúc trong{' '}
        </h2>
        <Countdown targetDate={data.endTime} />
      </div>

      <EventInfo event={data} />

      <div className="container text-xl md:text-2xl mx-auto">
        Sản phẩm - giày nam
      </div>

      <div className="md:p-0 px-3">
        {data && <ProductList eventId={data} percentage={data.percentage} />}
      </div>
    </div>
  )
}

export default PageEvent

