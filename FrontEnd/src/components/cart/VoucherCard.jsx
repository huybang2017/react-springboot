import { useState } from 'react'

const VoucherCard = ({ discount, code, isFreeShip, minOrder, expiryDate }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true) // Cập nhật trạng thái khi đã sao chép thành công
        setTimeout(() => setCopied(false), 2000) // Reset trạng thái sau 2 giây
      })
      .catch((error) => {
        console.error('Failed to copy', error)
      })
  }
  return (
    <div className="flex items-center border-b-2 border-dotted border-gray-300 py-4">
      <div className="flex-shrink-0">
        <img
          src="https://via.placeholder.com/64"
          alt="voucher icon"
          className="w-16 h-16 rounded"
        />
      </div>

      <div className="ml-4 flex-grow">
        <div className="text-lg font-bold text-blue-600">Giảm {discount.toLocaleString('vi-VN')}đ</div>
        <div className="text-sm text-gray-500">
          Đơn hàng từ {minOrder.toLocaleString('vi-VN')}đ trở lên
        </div>
        <div className="text-sm text-gray-500">
          Miễn phí vận chuyển: {isFreeShip ? 'Có' : 'Không'}
        </div>
        <div className="text-sm font-bold text-yellow-500">Mã: {code}</div>
        <div className="text-sm text-gray-500">HSD: {expiryDate}</div>
      </div>

      <div className="ml-4">
        <button
          onClick={handleCopy}
          className="bg-red-200 text-red-500 text-sm font-semibold py-1 px-3 rounded-full"
        >
          {copied ? 'Đã sao chép!' : 'Sao chép mã'}
        </button>
      </div>
    </div>
  )
}
export default VoucherCard
