import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg text-center font-semibold text-gray-800">
          ¡Ya te encuentras registrado!
        </h3>
        <p className="mt-4 text-gray-600 text-center">
          La consulta gratuita solo aplica para nuevos usuarios
        </p>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
