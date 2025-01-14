import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { DialogTitle } from '@mui/material'
import ImageNewUpload from '../components/ImageNewUpload.jsx'

import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack, IoMdClose } from 'react-icons/io'
import { NewIdQuery } from "../components/NewIdQuery.jsx"
import { LuLoader2 } from 'react-icons/lu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AxiosAdmin from '../../../../apis/AxiosAdmin.jsx'

function extractFileNameFromSrc(content, imageFiles) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  return doc.body.innerHTML;
}

const EditNewPage = () => {
  const params = useParams()
  const { data, isLoading, error: isError } = NewIdQuery(params?.id)
  const queryClient = useQueryClient()
  const redirect = useNavigate()

  const [title, setTitle] = useState('')
  const [banner, setBanner] = useState(null)
  const [imageBanner, setImageBanner] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('true')
  const [imageFiles, setImageFiles] = useState([])
  const [priority, setPriority] = useState('')
  const [error, setError] = useState({
    title: '',
    banner: '',
    content: '',
  })

  const quillRef = useRef(null)

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setImageBanner(data.banner)
      setContent(data.content)
      setStatus(data.status)
    }
  }, [data])


  useEffect(() => {
    if (!data && !isLoading && !isError) {
      redirect('/dashboard/news')
    }
  }, [data, redirect])

  const handleImageUpload = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = () => {
      const files = Array.from(input.files)

      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          const imageUrl = reader.result
          const quill = quillRef.current.getEditor()
          const range = quill.getSelection()

          if (range) {
            quill.insertEmbed(range.index, 'image', imageUrl)
            setImageFiles((prevFiles) => [...prevFiles, file])
          } else {
            console.error('Không thể lấy phạm vi để chèn ảnh.')
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: handleImageUpload,
        },
      },
    }),
    [],
  )

  const mutationUpdateNew = useMutation({
    mutationFn: (formData) => {
      return AxiosAdmin.patch(`${import.meta.env.VITE_API_URL}/News`, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['newId'])
      toast.success('Chỉnh sửa bài viết thành công!')
      redirect('/dashboard/news')
    },
    onError: (error) => {
      console.error('Lỗi khi lưu bài viết hoặc hình ảnh:', error)
      toast.error('Sửa bài viết thất bại!')
    }
  });

  const handleSubmit = async () => {
    let valid = true
    if (title === '') {
      setError({ ...error, title: 'Tiêu đề không được để trống' })
      valid = false
    }

    if (content === '') {
      setError({ ...error, content: 'Nội dung không được để trống' })
      valid = false
    }

    if (valid) {

      const formData = new FormData()
      formData.append('title', title)
      if (banner) {
        formData.append('banner', banner)
      }

      formData.append('content', extractFileNameFromSrc(content, imageFiles))
      formData.append('status', status)
      if (imageFiles.length > 0) {
        imageFiles.forEach((file, index) =>
          formData.append(`newsImageList[${index}]`, file),
        )
      }
      formData.append('id', params.id)
      formData.append('priorityFlag', priority)

      mutationUpdateNew.mutate(formData);

    }
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }


  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LuLoader2 size={30} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h2>Some things went wrong! :(( </h2>
      </div>
    );
  }

  return (
    <div className="h-[90.2vh]">
      <div className="relative w-full bg-white border overflow-y-auto p-5 rounded-md">
        <IoMdArrowRoundBack
          className="absolute left-4 top-4 cursor-pointer"
          size={30}
          onClick={() => redirect('/dashboard/news')}
        />
        <DialogTitle className="text-center">Chỉnh sửa bài viết</DialogTitle>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Tiêu đề</label>
            <input
              type="text"
              id="title"
              className="rounded-md w-full"
              placeholder="Tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error.title && <p className="text-rose-500">{error.title}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="banner">Thumbnail</label>
            {imageBanner ? (
              <div className="relative h-20 w-20">
                <img
                  src={
                    imageBanner
                      ? `${import.meta.env.VITE_API_URL}/NewsImage/${imageBanner}`
                      : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                  }
                  alt="Uploaded"
                  className="rounded-md w-[5rem] h-[5rem] object-cover"
                />
                <button
                  onClick={() => setImageBanner('')}
                  className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                  type="button"
                >
                  <IoMdClose className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <ImageNewUpload banner={banner} setBanner={setBanner} />
            )}

            {error.banner && <p className="text-rose-500">{error.banner}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              className="rounded-md"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="true">Hiển thị</option>
              <option value="false">Ẩn</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="priority">Ưu tiên</label>
            <select
              id="priority"
              className="rounded-md"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="true">Có</option>
              <option value="false">Không</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content">Nội dung</label>
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={setContent}
              modules={modules}
              formats={[
                'header',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
              ]}
              placeholder="Nội dung bài viết..."
              className="react-quill-container mb-16 p-4 max-h-[calc(100%_-_120px)]"
            />
            {error.content && <p className="text-rose-500">{error.content}</p>}
          </div>
        </div>

        <button
          className="w-full mt-4 flex items-center justify-center bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800 hover:bg-sky-700 transition text-white text-base rounded-md py-2 px-4 focus:outline-none"
          onClick={handleSubmit}
        >
          Lưu Bài Viết
        </button>
      </div>
    </div>
  )
}

export default EditNewPage
