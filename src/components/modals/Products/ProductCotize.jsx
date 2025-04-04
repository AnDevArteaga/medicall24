import { CheckCircle } from "lucide-react";
import PropTypes from "prop-types";

const ProductCotize = ({
  productName,
  packageValue,
  discount,
  totalToPay,
  discountValue,
  onCloseTerm,
  openModalTerm,
  productId,
  isValidCode,
  inputValues,
  handleInputChange,
  handleValidateCode,
  hiddenInputValue,
  handleCheckboxChange,
  type
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white w-11/12 max-w-xl rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado */}
        <div className="flex justify-between items-center bg-pink-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">{productName}</h2>
          <button
            onClick={onCloseTerm}
            className="text-white hover:text-gray-300 transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-6">
     
      {type === 'planesTelemedicinaPersonas' && (
        <div className="flex justify-between">
           <p className="text-base text-gray-700 dark:text-gray-300">
          Incluir los 4 usuarios
        </p>
           <label className="relative inline-flex items-center cursor-pointer">
           <input
             type="checkbox"
             value=""
             className="sr-only peer"
             // checked={isChecked}
             onChange={handleCheckboxChange}
           />
           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-600"></div>
         </label>
       
        </div>
      )}
          {/* Código promocional */}
          {!hiddenInputValue && (
            <div className="w-full sm:w-full">
              <label
                htmlFor="promoCode"
                className="block text-gray-700 text-sm mb-2"
              >
                Si tienes un código promocional ingrésalo
              </label>
              <div className="w-full">
                <div className="flex flex-row gap-2">
                  <input
                    id={productId}
                    type="text"
                    value={inputValues[productId] || ""}
                    onChange={handleInputChange}
                    className="w-3/4 sm:w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm"
                    placeholder="Código promocional"
                    autoComplete="nope"
                  />
                  <button
                    className="px-4 py-0 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 text-sm"
                    onClick={() => handleValidateCode(productId)}
                  >
                    Validar código
                  </button>
                </div>
                {isValidCode && (
                  <div className="flex flex-row">
                    <CheckCircle className="text-green-600 w-4 mr-2">
                    </CheckCircle>
                    <p className="text-green-600 text-sm mt-1">
                      Código promocional válido
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Valor del paquete */}
          <div className="flex justify-between items-center text-lg text-gray-800 font-semibold">
            <span>
              {" "}
              {productId === 16 ? "Valor del paquete" : "Valor del servicio"}
            </span>
            <span>${packageValue.toLocaleString()}</span>
          </div>

          {!hiddenInputValue && (
            <div className="flex justify-between items-center text-lg text-gray-600">
              <span>Descuento del {discount}%</span>
              
              <span className="text-gray-800 font-semibold">
                {discount > 0
                  ? `-$${discountValue.toLocaleString()}`
                  : discountValue.toLocaleString()}
              </span>
            </div>
          )}

          {/* Valor total */}
          <div className="flex justify-between items-center text-xl font-bold text-pink-600">
            <span>Valor a pagar</span>
            <span className="text-pink-600">
              ${totalToPay.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-between space-x-4 px-6 py-4 bg-gray-100 rounded-b-lg">
          <button
            onClick={onCloseTerm}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200"
            onClick={openModalTerm}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCotize;

ProductCotize.propTypes = {
  productName: PropTypes.string,
  packageValue: PropTypes.number,
  discount: PropTypes.number,
  totalToPay: PropTypes.number,
  discountValue: PropTypes.number,
  onCloseTerm: PropTypes.func,
  openModalTerm: PropTypes.func,
  productId: PropTypes.number,
  isValidCode: PropTypes.bool,
  inputValues: PropTypes.object,
  handleInputChange: PropTypes.func,
  handleValidateCode: PropTypes.func,
  hiddenInputValue: PropTypes.bool,
  type: PropTypes.string
};
