import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHotNews } from '../../reducers/news/NewSlice'
import { Link } from 'react-router-dom'

const NewsSection = () => {
  const dispatch = useDispatch()
  const { hotNews } = useSelector((state) => state.news)

  useEffect(() => {
    dispatch(getHotNews())
  }, [dispatch])

  return (
    <div className="bg-white text-black">
      <div className="text-center py-6">
        <h1 className="text-2xl md:text-4xl font-bold text-black">
          BÀI BÁO NỔI BẬT
        </h1>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {hotNews
          ?.filter((item) => item.priorityFlag && item.status) // Lọc các bài báo thỏa điều kiện
          .slice(0, 3) // Chỉ hiển thị tối đa 3 bài báo
          .map((item) => (
            <div
              key={item.id}
              className="relative bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <Link to={`/news/${item.id}`}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/NewsImage/${item.banner || ''}`}
                  alt={item.title || 'News Image'}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
                  <div className="text-white">
                    <h3 className="text-lg md:text-xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm mt-1">
                      {item.description || 'No description available.'}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>

      {hotNews?.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-300 mt-6">
          No news available.
        </div>
      )}
    </div>
  )
}

export default NewsSection
