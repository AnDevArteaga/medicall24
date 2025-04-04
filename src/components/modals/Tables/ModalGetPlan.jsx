import Table from "./TablePriceStatic";
import PropTypes from "prop-types";
const Modal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose} // Llama la función onClose desde el padre
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Contenido del modal */}

        <Table />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
