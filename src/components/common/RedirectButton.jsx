import useRedirectButtonSoon from "../../hooks/useRedirectButtonSoon";
import PropTypes from "prop-types";

const RedirectButton = ({ label, link, customClass }) => {
  const { buttonText, isTransitioning, handleClick } =
    useRedirectButtonSoon(label);

  return (
    <a
      href={link}
      onClick={() => handleClick("Próximamente", 2000)}
      className={`redirect-button transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold duration-300 appearance-none block h-8 bg-transparent border-2 text-center rounded-xl focus:outline-none focus:ring-5 focus:ring-white-500 focus:border-white-500 font-medium text-lg ${
        customClass || ""
      }`}
    >
      <span
        className={`text-container transition-opacity duration-200 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {buttonText}
      </span>
    </a>
  );
};

export default RedirectButton;

RedirectButton.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  customClass: PropTypes.string,
};
