import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="logo-home flex flex-col md:flex-row items-center justify-center">
          <div className="flex items-center">
            <Link to="/">
              <img
                className="w-40 h-40 cursor-pointer"
                src="/image/logo/LOGO.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center mx-auto md:mx-0">
            <div className="navigation">
              {/* logo social media */}
              <ul className="flex items-center mb-8">
                <li className="mx-4 md:mx-12 cursor-pointer facebook-logo">
                  <a
                    href="https://www.facebook.com/Bigboys.sneakerbigsizevietnam/"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-grayProject-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-8 h-8 cursor-pointer fill-current text-blue-600"
                    >
                      <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                    </svg>
                  </a>
                </li>
                <li className="mx-4 md:mx-12 cursor-pointer zalo-logo">
                  <a
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-grayProject-50"
                    href="https://zalo.me/0704411832"
                  >
                    <img
                      className="w-8 h-8"
                      src="/image/logo/zalo-1.svg"
                      alt="logo-zalo"
                    />
                  </a>
                </li>

                <li className="mx-4 md:mx-12 cursor-pointer tiktok-logo">
                  <a
                    href="https://www.tiktok.com/@bigboyssneakerbigsizevn?_t=8kJFbOW7bWs&_r=1"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-grayProject-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-8 h-8 cursor-pointer fill-current text-black"
                    >
                      <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                    </svg>
                  </a>
                </li>
                <li className="mx-4 md:mx-12 text-black cursor-pointer hover:text-red-500">
                  <a
                    href="https://shopee.vn/bigboysmen_bigsizemen"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-grayProject-50"
                  >
                    <img
                      className="cursor-pointer w-8 h-8"
                      src="/image/logo/1656180674shopee-logo-transparent.webp"
                      alt="shoppe"
                    />
                  </a>
                </li>
              </ul>

              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto rounded-lg bg-grayProject-50 p-3 text-center">
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <Link to="/news">Tin tức</Link>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500 relative">
                  <a href="/events">
                    Khuyến mãi
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current text-orangeProject-50 absolute -top-1 -right-4"
                    >
                      <path d="M208 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V172.9l122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.5 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L304 339.1V480c0 17.7-14.3 32-32 32H240c-17.7 0-32-14.3-32-32V339.1L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7C51.1 98.8 70.7 93.6 86 102.4l122 70.4V32z" />
                    </svg>
                  </a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500 relative">
                  <a href="/products">Sản phẩm</a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500 relative">
                  <Link to="/brands">Thương Hiệu</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
