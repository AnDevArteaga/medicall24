import PropTypes from "prop-types";

const Button = ({ label, className, dataTarget }) => {
  return (
    <a href="#plan" className="w-6/12 md:w-auto sm:w-full">
      <button
        className={`bg-orange-500 hover:bg-orange-500 hover:scale-110 transition duration-300 text-white font-bold py-2 px-6 border-b-4 border-orange-500 hover:border-orange-400 rounded-xl cursor-pointer mt-6 text-xl ${className}`}
        data-target={dataTarget}
      >
        {label}
      </button>
    </a>
  );
};

export default Button;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  dataTarget: PropTypes.string.isRequired,
};
