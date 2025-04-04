import PropTypes from "prop-types"


const Buttons = ({label, className, href} ) => {

  return (
    <a href={href} className={className}>
    <button>
        {label}
      </button>
    </a>
  )
}

export default Buttons

Buttons.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}