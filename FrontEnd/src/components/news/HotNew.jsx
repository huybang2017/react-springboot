import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHotNews } from '../../reducers/news/NewSlice'
import { Link } from 'react-router-dom'

const HotNew = () => {
  const dispatch = useDispatch()
  const { hotNews } = useSelector((state) => state.news)

  useEffect(() => {
    dispatch(getHotNews())
  }, [dispatch])

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Tin mới nổi bật
        </h2>
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {hotNews?.length > 0 ? (
            hotNews.map((item) => {
              if (item.priorityFlag && item.status) {
                return (
                  <div
                    key={item.id}
                    className="relative overflow-hidden bg-gray-100 rounded-lg shadow-lg dark:bg-gray-800"
                  >
                    <Link to={`/news/${item.id}`}>
                      <div className="w-full aspect-square">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/NewsImage/${item.banner || ''}`}
                          alt={item.title || 'News Image'}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                )
              }
              return null
            })
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-300">
              No news available.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HotNew
