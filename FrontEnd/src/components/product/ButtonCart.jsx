const ButtonCart = ({ onSetOpen }) => {
  return (
    <button
      onClick={onSetOpen}
      className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      <i className="fa-solid fa-cart-shopping w-full h-full text-center"></i>
    </button>
  )
}
export default ButtonCart
