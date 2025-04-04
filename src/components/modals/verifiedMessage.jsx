import { Info } from "lucide-react";
import PropTypes from "prop-types";
import Loader from "../common/Loader";

const Modal = ({
  isModalVerifiedMessageOpen,
  handleCloseVerifiedMessageModal,
  purchaseProduct,
  email,
  loading
}) => {
  if (!isModalVerifiedMessageOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-1/2 sm:w-full md:max-w-md">
        {/* Header */}
        <div className="bg-pink-600 text-white text-lg font-bold py-4 sm:py-2 px-6 rounded-t-lg text-center">
          Confirmar compra
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-4 text-gray-700">
        {email ?
          <p className="flex items-center sm:flex-col gap-2 text-sm">
            <Info className="text-pink-600" size={20} />
            La información de tu compra será enviada a<strong className="text-pink-600">{email || ""}</strong>
          </p>
          :  <p className="flex items-center gap-2 sm:flex-col text-sm">
          <Info className="text-pink-600" size={20} />
          No hay correo electrónico asociado a tu compra, por favor regresa y escribe un correo electrónico.
        </p>}
          
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 flex justify-between rounded-b-lg text-center">
          <button
            onClick={handleCloseVerifiedMessageModal}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
          >
            Cerrar
          </button>

          <button
            onClick={purchaseProduct}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300 disabled:bg-gray-400"
            disabled={loading || !email}
          >
            {loading ? (
              <div className="flex items-center justify-center">
               
                <Loader />
              </div>
            ) : (
              "Confirmar y pagar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isModalVerifiedMessageOpen: PropTypes.bool.isRequired,
  handleCloseVerifiedMessageModal: PropTypes.func.isRequired,
  purchaseProduct: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  loading: PropTypes.bool
};

Modal.defaultProps = {
  loading: false
};

export default Modal;