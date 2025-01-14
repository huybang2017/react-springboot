import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHotNews, getNewByUser } from '../../reducers/news/NewSlice'
import { Link, useParams } from 'react-router-dom'

const DetailNew = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { detailNew, hotNews } = useSelector((state) => state.news)
  useEffect(() => {
    dispatch(getNewByUser({ id }))
    dispatch(getHotNews())
  }, [dispatch, id])

  if (detailNew === null) {
    return <p className="text-center font-bold text-xl">Không có bài báo nào</p>
  }

  return (
    <>
      <div className="max-w-[1300px] mx-auto bg-white py-6 ">
        <div className="mx-auto sm:px-4 xl:px-2">
          <div className="grid grid-cols-10 gap-4">
            <div className="lg:col-span-8 md:col-span-10 max-sm:col-span-10 sm:col-span-10 bg-gray-100 border border-black p-3">
              <div className="w-full py-3 mb-3 border border-b-black">
                <h2 className="text-gray-800 text-3xl font-bold">
                  <span className="inline-block h-5 border-l-3 border-red-600 mr-2"></span>
                  {detailNew?.title}
                </h2>
              </div>
              <div className="flex flex-row flex-wrap -mx-3">
                <div className="max-w-full w-full px-4">
                  <div className="leading-relaxed pb-4">
                    <p
                      className="mb-5 bg-gray-100 p-4 rounded-md"
                      dangerouslySetInnerHTML={{ __html: detailNew?.content }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 md:col-span-10 max-sm:col-span-10 sm:col-span-10 border border-black bg-gray-100">
              <div className="w-full bg-gray-100">
                <div>
                  <div className="p-4 bg-gray-100 mb-3">
                    <h2 className="text-2xl font-bold text-center">
                      Bài báo phổ biến
                    </h2>
                  </div>
                  {hotNews && hotNews.length > 0 ? (
                    hotNews.map((item) => {
                      if (item.priorityFlag && item.status) {
                        return (
                          <ul key={item.id} className="post-number">
                            <li className="border border-t-black hover:bg-gray-200">
                              <Link
                                to={`/news/${item.id}`}
                                className="text-lg font-bold px-6 py-3 flex flex-row items-center"
                              >
                                {item.title}
                              </Link>
                            </li>
                          </ul>
                        )
                      }
                      return null
                    })
                  ) : (
                    <p>Không có bài báo nổi bật nào</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DetailNew
