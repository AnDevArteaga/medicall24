import Loader from "../../common/Loader";
import { useTermsModalLogic } from "../../../hooks/useModalPayment.js";

import PropTypes from "prop-types";

const TermsModal = ({
  isOpenTerm,
  onCloseTerm,
  dataPayment,
  departamentos,
  aliados,
  savedAliados,
  product,
  infoToModalPayment,
  saveDataAliadoEmail,
  resetFields
}) => {
  const {
    loading,
    municipios,
    aliadosModal,
    infoAliado,
    selectedAliado,
    handleChange,
    handleChangeMunicipio,
    handleChangeAliado,
    validate,
    handleNext,
    funcOnCloseTerm,
    selectedAliadoEmail
  } = useTermsModalLogic({
    aliados,
    departamentos,
    savedAliados,
    product,
    infoToModalPayment,
    isOpenTerm,
    onCloseTerm,
    dataPayment,
    saveDataAliadoEmail,
    resetFields
  });

  if (!isOpenTerm) return null;

  return (
    <div className="flex items-center justify-center h-auto">
      {/* Modal */}
      {isOpenTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            {/* Encabezado */}
            <div className="px-6 py-4 bg-pink-600 text-white text-lg font-bold rounded-t-lg text-center">
              ¡Ya casi terminas!
            </div>

            {/* Contenido */}
            <div className="px-6 py-2 space-y-4 max-h-96 overflow-y-auto text-gray-700">
              <p className="text-sm text-gray-600">
                Recuerda que la prestación de los servicios de salud se
                realizará en las ciudades de Colombia descritas en los Términos
                y Condiciones que aceptaste. Si no tienes un Prestador de Salud
                asignado, puedes seleccionar uno en la ciudad donde quieres ser
                atendido:
              </p>

              {product.id_aliado && product.id_aliado !== null
                ? (
                  <div className="flex flex-row sm:flex-col sm:space-x-0 justify-center space-x-4 w-full">
                    <div className="w-1/4 sm:w-1/2">
                      <label htmlFor="Departamento" className="text-sm">
                        Departamento
                      </label>
                      <input
                        type="text"
                        value={infoToModalPayment &&
                            infoToModalPayment.departamento
                          ? selectedAliado.departamento
                          : "Cargando"}
                        disabled
                        className={`px-2 w-full text-gray-700 py-1 bg-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm 
                          
                          `}
                      />
                    </div>
                    <div className="w-1/4 sm:w-1/2">
                      <label htmlFor="Municipio" className="text-sm">
                        Municipio
                      </label>
                      <input
                        type="text"
                        value={infoToModalPayment &&
                            infoToModalPayment.municipio
                          ? selectedAliado.municipio
                          : "Cargando"}
                        disabled
                        className="px-2 w-full text-gray-700 py-1 bg-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm"
                      />
                    </div>
                    <div className="w-2/4 sm:w-full">
                      <div className="flex flex-row space-x-1 mt-1">
                        <label htmlFor="Departamento" className="text-xs">
                          Prestador de salud asignado
                        </label>
                      </div>

                      <input
                        type="text"
                        value={infoToModalPayment
                          ? selectedAliado.aliado
                          : "Cargando"}
                        disabled
                        className=" w-full px-2 text-gray-700 py-1 bg-gray-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm"
                      />
                    </div>
                  </div>
                )
                : (
                  <div className="flex flex-row sm:flex-col justify-center space-x-4 sm:space-x-0 w-full">
                    <div className="w-1/4 sm:w-1/2">
                      <label htmlFor="Departamento" className="text-sm sm:text-xs">
                        Departamento
                      </label>
                      <select
                        name="departamento"
                        id="departamento"
                        className={`w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm
                          ${selectedAliadoEmail.departamento_institucion
                            ? "border-2"
                            : "border-pink-600"
                        }`}
                        onChange={handleChange}
                      >
                        <option value="">Selecciona</option>
                        {departamentos
                          .filter((departament) =>
                            aliados.some(
                              (aliado) =>
                                aliado.id_departamento ===
                                  parseInt(departament.id),
                            )
                          )
                          .map((departament) => (
                            <option
                              key={departament.id}
                              value={departament.name}
                            >
                              {departament.nombre}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="w-1/4 sm:w-full">
                      <label htmlFor="Departamento" className="text-sm sm:text-xs">
                        Municipio
                      </label>
                      <select
                        name="municipio"
                        id="municipio"
                        className={`w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm
                          ${selectedAliadoEmail.ciudad_institucion
                            ? "border-2"
                            : "border-pink-600"
                          }
                          `}  
                        disabled={!municipios.length}
                        onChange={handleChangeMunicipio}
                      >
                        <option value="">Selecciona</option>
                        {municipios.map((municipio) => (
                          <option
                            key={municipio.id}
                            value={`${municipio.id}-${municipio.nombre}`}
                          >
                            {municipio.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-2/4 sm:w-full">
                      <div className="flex flex-row space-x-1 mt-1">
                        <label htmlFor="Departamento" className="text-sm sm:text-xs">
                          Prestador de salud asignado
                        </label>
                      </div>

                      <select
                        name="ciudad"
                        id="ciudad"
                        className={`w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none transition-shadow duration-200 text-sm
                          ${selectedAliadoEmail.nombre_institucion
                            ? "border-2"
                            : "border-pink-600"}
                          `}
                        disabled={!aliadosModal.length}
                        onChange={handleChangeAliado}
                      >
                        <option value="">Selecciona</option>
                        {aliadosModal.map((aliado) => (
                          <option
                            key={aliado.id_aliado}
                            value={`${aliado.num_identificacion}-${aliado.tipo_identificacion}-${aliado.id_aliado}-${aliado.nombre_prestador}`}
                          >
                            {aliado.nombre_prestador}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              <div>
                <p className="text-gray-500 text-sm font-semibold">
                  Datos del prestador de salud asignado
                </p>
              </div>
              <div className="flex flex-col justify-around bg-white">
                <div className="flex flex-row">
                  <p className="text-sm font-semibold text-gray-500 mr-3">
                    Dirección:
                  </p>
                  <p className="text-sm text-gray-600">
                    {infoAliado.address
                      ? infoAliado.address
                      : "Seleccionar prestador de salud"}
                  </p>
                </div>
                <div className="flex flex-row">
                  <p className="text-sm font-semibold text-gray-500 mr-4">
                    Teléfono:
                  </p>
                  <p className="text-sm text-gray-600">
                    {infoAliado.phone
                      ? infoAliado.phone
                      : "Seleccionar prestador de salud"}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Los datos del Prestador de Salud asignado, así como los pasos de
                solicitud de cita, serán enviados al <span className="font-semibold text-pink-600">correo electrónico</span> que
                registraste en el proceso de compra, una vez el pago sea
                realizado con exitoso.
              </p>
              <p className="text-gray-600 text-sm">
                Para finalizar el pago presiona el botón continuar.
              </p>
            </div>

            {/* Footer con botones */}
            <div className="px-6 py-4 flex justify-between space-x-4 bg-gray-100 rounded-b-lg">
              <button
                onClick={funcOnCloseTerm}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all"
              >
                Cancelar
              </button>
              <button
                // disabled={!accept}
                className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-700 transition-all"
                onClick={handleNext}
                disabled={!validate}
              >
                {loading ? <Loader /> : "Continuar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsModal;

TermsModal.propTypes = {
  isOpenTerm: PropTypes.bool.isRequired,
  onCloseTerm: PropTypes.func.isRequired,
  dataPayment: PropTypes.func.isRequired,
  departamentos: PropTypes.array.isRequired,
  aliados: PropTypes.array.isRequired,
  savedAliados: PropTypes.func,
  product: PropTypes.object,
  infoToModalPayment: PropTypes.object,
};
