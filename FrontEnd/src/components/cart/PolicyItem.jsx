const PolicyItem = ({ icon, text }) => {
  return (
    <>
      <div className="flex items-center border-b border-black py-2">
        <div className="text-red-500 flex-shrink-0 mr-2">
          <img src={icon} alt="icon" className="w-6 h-6" />
        </div>
        <div className="text-sm">{text}</div>
      </div>
    </>
  )
}
export default PolicyItem
