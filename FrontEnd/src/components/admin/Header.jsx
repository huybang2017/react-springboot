import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import ToggleThemeButton from '../ingredient/ToggleThemeButton.jsx'
import { useNavigate } from 'react-router-dom'

export function HeaderDashboard() {
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.clear()
    navigate('/admin')
  }
  return (
    <Navbar fluid className="fixed w-full z-10">
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Big Boys Sneaker Big Size
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="/image/logo/LOGO.png" rounded />
          }
        >
          <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
    </Navbar>
  )
}
