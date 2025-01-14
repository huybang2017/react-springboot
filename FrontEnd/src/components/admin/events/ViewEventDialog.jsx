import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import AxiosAdmin from '../../../apis/AxiosAdmin'

import '../style.css'

const ViewEventDialog = ({ isOpen, handleOpen, data }) => {
  const [selectedProduct, setSelectedProduct] = useState([])
  const [productTypes, setProductsTypes] = useState([])

  const [selectedFilter, setSelectedFilter] = useState({
    search: '',
    shoeTypeName: '',
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProductSelected = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/Shoe/Event/${data.eventId}`,
        )
        const responseProductTypes = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/ShoeType/noPaging`,
        )
        setProductsTypes(responseProductTypes.data)
        setSelectedProduct(responseProductSelected.data.content)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts()
  }, [data])

  const filteredSelectedProducts = selectedProduct.filter(
    (product) =>
      String(product.shoeName)
        .toLowerCase()
        .includes(selectedFilter.search.toLowerCase()) &&
      (selectedFilter.shoeTypeName === '' ||
        (product.shoeType &&
          product.shoeType.shoeTypeName === selectedFilter.shoeTypeName)),
  )

  return (
    <div
      className={`${isOpen ? 'fixed' : 'hidden'} w-full h-screen animate-dropdown top-0 left-0`}
    >
      <div
        className={`flex w-full h-screen relative items-center justify-center`}
      >
        <div className="relative p-5 bg-white overflow-x-hidden border rounded-md shadow-2xl ">
          <button
            className="absolute top-1 right-1 bg-red-500 w-6 h-6 rounded-md flex items-center justify-center text-white hover:bg-rose-700 transition"
            onClick={() => handleOpen()}
          >
            <CloseIcon className="text-2xl" />
          </button>

          <h3 className="text-center font-semibold text-2xl">
            Chi tiết sự kiện
          </h3>
          <div className=" border-b-[2px] border-zinc-700 mt-2" />

          <div className="flex gap-0 overflow-x-hidden">
            <div className="w-[35rem] p-5">
              <h3 className="font-semibold text-lg text-center">
                Thông tin sự kiện
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="eventName">Tên sự kiện</label>
                  <input
                    className={`rounded-md`}
                    type="text"
                    placeholder="Tên sự kiện"
                    value={data.eventName}
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="banner">Hình ảnh</label>
                  <img
                    className=" object-cover w-[4rem] rounded-md"
                    src={
                      data.banner
                        ? `${import.meta.env.VITE_API_URL}/Event/Banner/${data.banner}`
                        : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                    }
                    alt=""
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="startTime">Thời gian bắt đầu</label>
                  <input
                    className={`rounded-md `}
                    type="text"
                    value={data.startTime}
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="endTime">Thời gian kết thúc</label>
                  <input
                    className={`rounded-md`}
                    type="text"
                    value={data.endTime}
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="percentage">Phần trăm giảm giá</label>
                  <input
                    className={`rounded-md`}
                    type="number"
                    min={0}
                    value={data.percentage}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="w-[35rem] p-5 space-y-8">
              <div className="flex items-center justify-center relative w-full ">
                <h3 className="font-semibold text-lg text-center">
                  Sản phẩm đã chọn
                </h3>
              </div>

              <div className="flex gap-2 justify-between items-center">
                <form className="flex items-center justify-center gap-2">
                  <input
                    placeholder="Nhập tên sản phẩm"
                    type="text"
                    className="w-full rounded-md"
                  />
                  <button className="bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition">
                    Tìm
                  </button>
                </form>

                <div className="flex gap-2 items-center">
                  <label htmlFor="shoType">Loại</label>
                  <select
                    name="shoeType"
                    id="shoeType"
                    className="rounded-md"
                    onChange={(e) =>
                      setSelectedFilter({
                        ...selectedFilter,
                        shoeTypeName: e.target.value,
                      })
                    }
                  >
                    <option value="">Tất cả</option>
                    {productTypes.length > 0 &&
                      productTypes.map((type) => (
                        <option
                          key={type.shoeTypeName}
                          value={type.shoeTypeName}
                        >
                          {type.shoeTypeName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-10">
                {filteredSelectedProducts.length <= 0 && (
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <span className="font-semibold text-zinc-400">
                      Chưa có sản phẩm nào được chọn
                    </span>
                    <button
                      onClick={() => setIsProductOpen(true)}
                      className="bg-[#6b7280] px-4 py-2 rounded-md font-semibold text-white flex items-center justify-center hover:bg-[#818589] transition"
                    >
                      Thêm sản phẩm
                    </button>
                  </div>
                )}
                {filteredSelectedProducts.length > 0 &&
                  filteredSelectedProducts.map((product) => (
                    <div className="flex gap-2" key={product.shoeId}>
                      <img
                        src={
                          product.defaultImage
                            ? `${import.meta.env.VITE_API_URL}/ShoeImage/Image/${product.defaultImage}`
                            : 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
                        }
                        className="object-cover rounded-md w-10"
                        alt="ShoeImage"
                      />
                      <label className="text-xs" htmlFor={product.shoeId}>
                        {product.shoeName}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewEventDialog
