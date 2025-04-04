import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
         Tarjeta vinculada exitosamente
          </h3>
          <p className="mt-4 text-gray-600">
            Tu tarjeta ha sido vinculada correctamente. en los proximos minutos recibirás un correo con los pasos para acceder a tu consulta gratuita.
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
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
