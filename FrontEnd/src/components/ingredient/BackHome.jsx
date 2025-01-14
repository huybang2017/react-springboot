import { FaAngleUp } from 'react-icons/fa6'

const BackHome = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <button
      onClick={scrollToTop}
      className="right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      <FaAngleUp className="w-full h-full" />
    </button>
  )
}
export default BackHome
