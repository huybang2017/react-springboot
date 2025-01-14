import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHotNews } from '../../reducers/news/NewSlice'
import { Link } from 'react-router-dom'

const FooterComponent = () => {
  const dispatch = useDispatch()
  const { hotNews } = useSelector((state) => state.news)

  useEffect(() => {
    dispatch(getHotNews())
  }, [dispatch])

  return (
    <footer className="bg-blueProject-500 text-center text-white lg:text-left mt-10">
      <div className="container mx-auto pt-20 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="text-white col-span-1">
            <h6 className="text-center">YourSneaker</h6>
            <h1 className="uppercase text-center font-semibold text-4xl mb-4">
              bigboy
            </h1>
            <p className="mb-3">
              <a href="#!" className="link flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 text-white fill-current mr-3" // Adjust the classes as needed
                >
                  <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                </svg>
                0704.411.832
              </a>
            </p>
            {/* <p className="mb-3">
              <a href="#!" className="link flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 text-white fill-current mr-3" // Adjust the classes as needed
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                bigboysbigsizemen@gmail.com
              </a>
            </p> */}
            <p className="mb-3">
              <a
                href="https://shopee.vn/bigboysmen_bigsizemen"
                className="link flex items-center"
              >
                <svg
                  className="w-5 h-5 fill-current text-white mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.57,4.543c-0.29-0.31-0.7-0.49-1.13-0.49H16.9c-0.46-2.28-2.48-4.01-4.9-4.01 s-4.44,1.73-4.9,4.01H2.56c-0.43,0-0.84,0.18-1.13,0.49S0.98,5.273,1,5.692l0.71,15.25c0.08,1.74,1.5,3.1,3.23,3.1h14.12 c1.73,0,3.15-1.36,3.23-3.1L23,5.692C23.02,5.273,22.86,4.853,22.57,4.543z M12,2.043c1.31,0,2.41,0.84,2.82,2.01H9.18 C9.59,2.882,10.69,2.043,12,2.043z M11.97,20.003c-1.49,0-2.71-0.63-3.46-1.14c-0.47-0.32-0.59-0.95-0.29-1.42l0.02-0.04 c0.31-0.5,0.96-0.64,1.45-0.33c0.68,0.41,1.62,0.9,2.28,0.9c1.12,0,2.06-0.62,2.06-1.35c0-0.92-0.6-1.29-2.41-1.95 c-1.55-0.57-3.46-1.27-3.46-3.43c0-1.88,1.67-3.3,3.88-3.3c1.32,0,2.3,0.39,2.94,0.76c0.51,0.29,0.67,0.95,0.36,1.45 c-0.2,0.33-0.55,0.51-0.9,0.51c-0.17,0-0.34-0.04-0.49-0.12c-0.55-0.29-1.27-0.58-1.91-0.58c-1.08,0-1.86,0.54-1.86,1.28 c0,0.64,0.56,0.96,2.13,1.53c1.58,0.57,3.75,1.36,3.75,3.85C16.06,18.523,14.26,20.003,11.97,20.003z" />
                </svg>
                BigBoysMen
              </a>
            </p>
            <p className="mb-3">
              <a
                href="https://www.facebook.com/Bigboys.sneakerbigsizevietnam/"
                className="link flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 text-white fill-current mr-3" // Adjust the classes as needed
                >
                  <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                </svg>
                Big Boys
              </a>
            </p>
            {/* <p>
              <a href="#!" className="link flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-5 h-5 text-white fill-current mr-3" // Adjust the classes as needed
                >
                  <path d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z" />
                </svg>
                instagrambigboy
              </a>
            </p> */}
          </div>

          <div className="col-span-1 text-white dark:text-white/60">
            <h6 className="text-4xl mb-4 font-semibold md:justify-start text-center">
              NEWs
            </h6>
            {hotNews
              ?.filter((item) => item.status && item.priorityFlag)
              .slice(0, 5)
              .map((item) => (
                <p
                  key={item.id}
                  className="mb-4 border-b border-gray-300 md:border-b-0 md:mb-2 text-sm md:text-base"
                >
                  <Link
                    to={`/news/${item.id}`}
                    className="text-white hover:text-blue-800"
                  >
                    {item.title}
                  </Link>
                </p>
              ))}
          </div>

          <div className="col-span-2 text-white dark:text-white/60">
            <h6 className="mb-4 flex justify-center md:justify-start">
              Địa chỉ cửa hàng (8:00 - 17:00 mỗi ngày)
            </h6>
            <p
              className="mb-4 text-4xl font-semibold mt-2"
              style={{ fontSize: '20px' }}
            >
              <span>
                TP.HCM: 60/29 Huỳnh Văn Nghệ, P15, Q.Tân Bình, TP.HCM.
              </span>
            </p>

            <p className="mb-4">
              <span>Tất cả các ngày trong tuần</span>
            </p>
            <p className="mb-4">
              <span>Gọi mua hàng Online (8:00 - 20:00 mỗi ngày)</span>
            </p>
            <p
              className="text-4xl font-semibold mt-2"
              style={{ fontSize: '20px' }}
            >
              <span>0704.411.832</span>
            </p>
          </div>

          <div className="col-span-2 text-white dark:text-white/60">
            <a
              href="https://www.facebook.com/Bigboys.sneakerbigsizevietnam/"
              target="_blank" // Mở liên kết trong tab mới
              rel="noopener noreferrer" // Bảo mật khi mở tab mới
              className="pageFaceBook w-full flex justify-center" // Thêm flex và justify-center để căn giữa
            >
              <div className="w-[300px] sm:w-[400px] md:w-[500px] h-[200px] sm:h-[250px] md:h-[300px] lg:w-full border border-gray-300 overflow-hidden rounded-lg shadow-md">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBigboys.sneakerbigsizevietnam%2F&tabs=timeline&width=500&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                  scrolling="no"
                  allow="encrypted-media"
                  className="w-full h-full"
                  style={{ border: 'none' }} // Đảm bảo không có viền cho iframe
                ></iframe>
              </div>
            </a>
            <div className="logoShop flex justify-center mt-10">
              <svg
                className="w-60 h-60 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  className="w-full h-full fill-current text-white"
                  xlinkHref="/image/logo/LOGO.png"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
