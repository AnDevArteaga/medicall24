import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

const DropdownMenu = ({ label, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Cierra el dropdown si el clic fue fuera
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li className="relative group z-10" ref={dropdownRef}>
      {/* Elemento principal */}
      <p
        className="transform transition duration-200 hover:scale-105 flex hover:font-semibold text-center hover:text-pink-600 cursor-pointer"
        onClick={handleClick}
      >
        {label}{" "}
        <span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </p>

      {/* Opciones desplegables */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-64">
          {menuItems.map((item, index) => (
            <li className="hover:bg-pink-100" key={index}>
              <a
                href={item.href}
                className="block px-4 py-2 text-gray-700 text-sm hover:text-pink-600"
                target={item.target}
                rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default DropdownMenu;

DropdownMenu.propTypes = {
  label: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
    })
  ).isRequired,
};
