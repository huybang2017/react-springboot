import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { NewIdQuery } from '../components/NewIdQuery'

function changeImageSrc(content) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  return doc.body.innerHTML
}

const ViewIdPage = () => {
  const redirect = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState('')

  const { data, isLoading, isError } = NewIdQuery(id)

  useEffect(() => {
    if (!id) {
      redirect('/dashboard/news')
    }
  }, [id, redirect])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{error}</div>
  }

  const contentWithUpdatedSrc = changeImageSrc(data?.content)

  return (
    <div className="h-[90.2vh]">
      <div className="relative w-full bg-white border overflow-y-auto p-5 rounded-md">
        <IoMdArrowRoundBack
          className="absolute left-4 top-4 cursor-pointer"
          size={30}
          onClick={() => redirect('/dashboard/news')}
        />
        <h3 className="font-bold text-2xl text-center">{data?.title}</h3>

        <div dangerouslySetInnerHTML={{ __html: contentWithUpdatedSrc }} />
      </div>
    </div>
  )
}

export default ViewIdPage
