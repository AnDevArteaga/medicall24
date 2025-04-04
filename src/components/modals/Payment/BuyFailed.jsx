import PropTypes from "prop-types";

const ErrorModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Error en la compra</h2>
        <p className="text-gray-700 text-center">
          Algo salió mal en la compra. Verifique sus datos y vuelva a
          intentarlo.
        </p>
        <button
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;

ErrorModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
