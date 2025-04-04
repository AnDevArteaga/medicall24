import { useState } from "react";
import visibilityOff from "../../../assets/SVG/visibility_off.svg";
import visibility from "../../../assets/SVG/visibility.svg";

import PropTypes from "prop-types";

const typeIdMap = {
  CC: "Cédula de ciudadanía",
  TI: "Tarjeta de identidad",
  CE: "Cédula de extranjería",
  PA: "Pasaporte",
  RC: "Registro civil",
  AS: "Adulto sin identificación",
  MS: "Menor sin identificación",
  CD: "Carné Diplomático",
  SC: "Salvo Conducto",
  EP: "Permiso Especial de Permanencia",
  PT: "Permiso por Protección Temporal",
  NU: "No. Único de Identificación Personal",
  NV: "Certificado Nacido Vivo",
};

const Modal = ({ isOpenConfirm, onCloseConfirm, payload, registrar }) => {
  const displayType = typeIdMap[payload.user?.typeId];
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpenConfirm) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-2/3 sm:w-full">
        {/* Encabezado */}
        <div className="bg-pink-600 text-white text-lg font-bold py-4 px-6 rounded-t-lg text-center">
          Verifica tus datos
        </div>

        {/* Contenido */}
        <div className="p-6">
          <p className="text-base text-gray-700 mb-4">
            Por favor, confirma que los datos ingresados son correctos. 
          </p>

          {/* Lista de datos con Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-800">Tipo de ID:</h4>
              <p className="text-sm text-gray-600">{displayType || "N/A"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Identificación:
              </h4>
              <p className="text-sm text-gray-600">
                {payload.user?.identification || "N/A"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Primer Nombre:
              </h4>
              <p className="text-sm text-gray-600">
                {payload.user?.name1 || "N/A"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Segundo Nombre:
              </h4>
              <p className="text-sm text-gray-600">
                {payload.user?.name2 || "N/A"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Primer Apellido:
              </h4>
              <p className="text-sm text-gray-600">
                {payload.user?.lastName1 || "N/A"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Segundo Apellido:
              </h4>
              <p className="text-sm text-gray-600">
                {payload.user?.lastName2 || "N/A"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">
                Correo Electrónico:
              </h4>
              <p className="text-sm text-gray-600">
                {payload.user?.email || "N/A"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">Contraseña:</h4>
              <div className="flex items-center space-x-2">
                <input
                  className="text-sm text-gray-600"
                  disabled
                  type={showPassword ? "text" : "password"}
                  value={payload.user?.password || "N/A"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {showPassword ? (
                    <img
                      src={visibility}
                      alt="show password"
                      className="w-4 h-4"
                    />
                  ) : (
                    <img
                      src={visibilityOff}
                      alt="hide password"
                      className="w-4 h-4"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botón */}
        <div className="px-6 py-4 bg-gray-100 flex justify-between rounded-b-lg text-center">

          <button
            onClick={onCloseConfirm}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
          >
            Editar
          </button>
          <button
            onClick={registrar}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isOpenConfirm: PropTypes.bool.isRequired,
  onCloseConfirm: PropTypes.func.isRequired,
  payload: PropTypes.object.isRequired,
  registrar: PropTypes.func.isRequired,
};
