import PropTypes from "prop-types";

const Modal = ({ isOpen, status, onClose, errorRegisterMessage }) => {
  if (!isOpen) return null; 

  const renderContent = () => {
    if (status === "load") {
      return <p className="text-center">Registrando...</p>;
    } else if (status === "success") {
      return (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
          Registro exitoso
          </h3>
          <p className="mt-4 text-gray-600">
          Ya eres usuario de la App MEDICALL24. Descárgala en tu tienda de aplicaciones y activa tu cuenta.
          </p>
          <p className="mt-4 text-gray-600">
          Continúa con el proceso para acceder a tu prueba gratiuta pulsando el botón siguiente.
          </p>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
            >
              Siguiente
            </button>
          </div>
        </div>
      );
    } else if (status === "error") {
      return (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">¡Error!</h3>
          <p className="mt-4 text-gray-600">
          {errorRegisterMessage}
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
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Estado del Registro
        </h2>
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
