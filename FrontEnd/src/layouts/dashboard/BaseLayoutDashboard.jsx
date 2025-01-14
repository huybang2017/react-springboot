import { Outlet } from 'react-router-dom'
import { HeaderDashboard } from '../../components/admin/Header'
import { SidebarDashboard } from '../../components/admin/Sidebar'

const BaseLayoutDashBoard = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-700">
        <HeaderDashboard />
        <div className="flex pt-14 ">
          <SidebarDashboard />
          <div className="relative w-full h-screen ml-64 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
export default BaseLayoutDashBoard
