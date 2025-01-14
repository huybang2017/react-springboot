import { Carousel } from 'flowbite-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentEvent } from '../../reducers/eventReducer/EventSlice'

const Carusel = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(getCurrentEvent())
  }, [dispatch])
  return (
    <>
      <div className="max-sm:h-[30vh] sm:h-[50vh] lg:h-[70vh] pt-3">
        <Carousel slideInterval={2000}>
          <img
            className="w-full h-full object-cover"
            src="/image/banner.png"
            alt="Banner"
          />
        </Carousel>
      </div>
    </>
  )
}

export default Carusel
