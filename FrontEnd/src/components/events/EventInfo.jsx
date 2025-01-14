import { Carousel } from 'flowbite-react'
import React from 'react'

const EventInfo = ({ event }) => {
  return (
    <div className="relative h-1/6 md:h-1/2-screen">
      <img
        src={`${import.meta.env.VITE_API_URL}/Event/Banner/` + event.banner}
        alt={event.title}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default EventInfo
