import PropTypes from 'prop-types'

const Button = ({ label, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  onClick: () => {},
  className: '',
  disabled: false,
}

export default Button
