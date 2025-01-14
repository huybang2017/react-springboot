import { useDispatch, useSelector } from 'react-redux'
import { getNewsByUser } from '../../reducers/news/NewSlice'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pagination, Stack } from '@mui/material'

const ITEM_PER_PAGE = 10

const buildQueryString = (page, itemsPerPage) => {
  const params = new URLSearchParams()

  Object.entries({
    pageNumber: page || '',
    pageSize: itemsPerPage || '',
  }).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

const ListNews = () => {
  const dispatch = useDispatch()
  const { data: dataNews } = useSelector((state) => state.news)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = dataNews.totalPages

  useEffect(() => {
    const query = buildQueryString(currentPage, ITEM_PER_PAGE)
    dispatch(getNewsByUser(query))
  }, [dispatch, currentPage])

  const handleChangePage = (e, p) => {
    setCurrentPage(p)
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-center font-bold text-4xl mb-8">
          Danh sách bài báo
        </h1>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {dataNews?.content?.length > 0 ? (
            dataNews.content.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800"
              >
                <Link to={`/news/${item.id}`}>
                  <div className="w-full aspect-square">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/NewsImage/${item.banner}`}
                      alt={item.title || 'News Image'}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {item.title || 'The Catalyzer'}
                    </h3>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-300">
              Không có bài báo nào.
            </div>
          )}
        </div>

        <div className="w-full flex items-center justify-center mb-5 mt-10">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </>
  )
}

export default ListNews
