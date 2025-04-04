import { Info } from "lucide-react";
import PropTypes from "prop-types";

const Modal = ({ isModalAlertEmailOpen, handleCloseAlertEmailModal }) => {
  if (!isModalAlertEmailOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-1/2 sm:w-full md:max-w-md p-6 text-center">
        {/* Icono de Información */}
        <div className="flex justify-center mb-4">
          <Info className="text-pink-600" size={40} />
        </div>
        
        {/* Mensaje */}
        <p className="text-gray-700 text-sm">
          Hemos detectado un dominio de correo electrónico no común, verifica que el correo esté bien escrito.
        </p>

        {/* Botón de Cerrar */}
        <div className="mt-6">
          <button
            onClick={handleCloseAlertEmailModal}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
    isModalAlertEmailOpen: PropTypes.bool,
    handleCloseAlertEmailModal: PropTypes.func.isRequired,
};

export default Modal;
