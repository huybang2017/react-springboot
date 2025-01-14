import OrderStatistic from '../../components/admin/statistic/OrderStatistic'
import BestSeller from './BestSeller'

const Dashboard = () => {
  return (
    <>
      <div className="flex-auto p-4 space-y-10 h-screen overflow-y-auto overflow-x-hidden">
        <h1 className="text-2xl font-bold">Thống kê đơn hàng</h1>

        <OrderStatistic />

        <div className="space-y-10">
          <h3 className="text-xl font-semibold text-center">
            Các sản phẩm bán chạy nhất
          </h3>
          <BestSeller />
        </div>
      </div>
    </>
  )
}
export default Dashboard
