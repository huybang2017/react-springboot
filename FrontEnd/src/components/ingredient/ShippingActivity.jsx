import { useEffect } from 'react'
import { useState } from 'react'

const ShippingActivity = ({ layout, orderStatuses, onUpdateStatus }) => {
  // Xác định trạng thái hiện tại từ orderStatuses
  const [currentStatus, setCurrentStatus] = useState(null)

  // Xác định trạng thái tiếp theo dựa trên trạng thái hiện tại
  const getNextStatus = (currentStatus) => {
    if (layout === 'admin') {
      switch (currentStatus) {
        case 'ChoDuyet':
          return 'DaDuyet'
        case 'DaDuyet':
          return 'DangGiao'
        case 'DangGiao':
          return 'GiaoThanhCong'
        default:
          return null
      }
    } else if (layout === 'user') {
      switch (currentStatus) {
        case 'ChoDuyet':
          return 'Huy'
        case 'DangGiao':
          return 'GiaoThanhCong'
        default:
          return null
      }
    }
  }

  useEffect(() => {
    if (orderStatuses) {
      const lastStatus = orderStatuses[orderStatuses.length - 1]
      setCurrentStatus(lastStatus.status)
    }
  }, [orderStatuses])

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = (currentStatus) => {
    const nextStatus = getNextStatus(currentStatus)
    if (nextStatus) {
      onUpdateStatus(nextStatus)
    }
  }

  // Kiểm tra xem trạng thái đã là 'Huy' chưa
  const isCancelled = orderStatuses?.some(
    (statusObj) => statusObj.status === 'Huy',
  )

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Hoạt động vận chuyển</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {orderStatuses?.map((statusObj, index) => {
          if (isCancelled && statusObj.status === 'Huy') {
            return (
              <div
                key={index}
                className="flex items-center space-x-2 p-4 bg-red-100 shadow-md rounded-lg border border-red-200 min-w-[200px]"
              >
                <div className="flex-shrink-0 text-red-500">❌</div>
                <div>
                  <p className="font-medium">Hủy đơn hàng</p>
                  <p className="text-sm text-gray-500">
                    {statusObj.updateTime}
                  </p>
                </div>
              </div>
            )
          }

          return (
            <div
              key={index}
              className={`flex items-center space-x-2 p-4 shadow-md rounded-lg border border-gray-200 min-w-[150px] ${
                statusObj.status === 'Huy' ? 'bg-red-100' : 'bg-white'
              }`}
            >
              <div className="flex-shrink-0">
                {statusObj.status === 'ChoDuyet' && (
                  <div className="text-yellow-500">🕒</div>
                )}
                {statusObj.status === 'DaDuyet' && (
                  <div className="text-blue-500">✔️</div>
                )}
                {statusObj.status === 'DangGiao' && (
                  <div className="text-green-500">🚚</div>
                )}
                {statusObj.status === 'GiaoThanhCong' && (
                  <div className="text-green-700">🎉</div>
                )}
                {statusObj.status === 'Huy' && (
                  <div className="text-red-500">❌</div>
                )}
              </div>
              <div className="flex-grow">
                <p className="font-medium">
                  {statusObj.status
                    .replace(/ChoDuyet/, 'Chờ duyệt')
                    .replace(/DaDuyet/, 'Đã duyệt')
                    .replace(/DangGiao/, 'Giao cho bên vận chuyển')
                    .replace(/GiaoThanhCong/, 'Giao thành công')}
                </p>
                <p className="text-sm text-gray-500">{statusObj.updateTime}</p>
              </div>
              {layout === 'admin' &&
                statusObj.status === currentStatus &&
                statusObj.status !== 'GiaoThanhCong' &&
                statusObj.status !== 'DangGiao' &&
                statusObj.status !== 'Huy' && (
                  <button
                    type="button"
                    className="ml-2 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleUpdateStatus(statusObj.status)}
                  >
                    Cập nhật
                  </button>
                )}
              {layout === 'user' &&
                statusObj.status === currentStatus &&
                statusObj.status !== 'DaDuyet' &&
                statusObj.status !== 'GiaoThanhCong' &&
                statusObj.status !== 'DangGiao' &&
                statusObj.status !== 'Huy' && (
                  <button
                    type="button"
                    className="ml-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleUpdateStatus(statusObj.status)}
                  >
                    Hủy đơn hàng
                  </button>
                )}

              {statusObj.status === currentStatus &&
                statusObj.status !== 'DaDuyet' &&
                statusObj.status !== 'GiaoThanhCong' &&
                statusObj.status !== 'ChoDuyet' &&
                statusObj.status !== 'Huy' && (
                  <button
                    type="button"
                    className="ml-2 px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                    onClick={() => handleUpdateStatus(statusObj.status)}
                  >
                    Hoàn tất đơn hàng
                  </button>
                )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShippingActivity
