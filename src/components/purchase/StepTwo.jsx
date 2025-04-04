import PropTypes from "prop-types";
import PaymentForm from "./paymentForms";

import { useFetchData } from "../../hooks/useStepTwo/useFetchData";
import { useUserData } from "../../hooks/useStepTwo/useUserData";

import { FileText } from "lucide-react";

const StepTwo = ({ payload, getDepartamentos, numberValid, openModal, openAlertEmailModal, phoneNumberValid, onMethodChangeProps }) => {
  const { departaments, municipios, fetchMunicipios, typeIds } = useFetchData(
    getDepartamentos,
  );
  const {
    localFormData,
    handleChange,
    onFormDataChange,
    formErrors,
    enableField,
    errors,
    dataVerified,
    fullName,
    fullLastName,
    validateDomainEmail
  } = useUserData(payload, departaments, fetchMunicipios, openAlertEmailModal);

  return (
    <div className="bg-white rounded-lg p-6 sm:p-2 w-full grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-6">
      {/* Columna izquierda */}
      <div>
        <form className="space-y-2" autoComplete="off">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-12 mt-6">
            Datos del comprador
          </h2>
          {/* Fila 1 */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 font-medium text-sm mb-1"
                htmlFor="typeId"
              >
                <span className="text-red-600">*</span> Tipo de Identificación
              </label>
              <select
                disabled
                id="typeId"
                name="typeId"
                value={dataVerified.type === "PSE" &&
                    dataVerified.typeId !== "CC" &&
                    dataVerified.typeId !== "NIT"
                  ? localFormData.typeId
                  : payload.user?.typeId}
                onChange={handleChange}
                className={`w-full text-sm px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200`}
              >
                {dataVerified.type === "PSE"
                  ? (
                    <>
                      <option selected value="CC">
                        Cédula de ciudadanía
                      </option>
                    </>
                  )
                  : (
                    <>
                      <option value="">Seleccione</option>
                      {typeIds.map((type) => (
                        <option key={type.code} value={type.code}>
                          {type.description}
                        </option>
                      ))}
                    </>
                  )}
              </select>
              <p className="text-gray-700 text-xs mt-1">{errors.typeId}</p>
            </div>

            <div>
              <label
                className="block text-gray-700 font-medium text-sm mb-1"
                htmlFor="identification"
              >
                <span className="text-red-600">*</span> Identificación
              </label>
              <input
                disabled={!enableField}
                type="text"
                id="identification"
                name="identification"
                value={dataVerified.type === "PSE" &&
                    dataVerified.typeId !== "CC" &&
                    dataVerified.typeId !== "NIT"
                  ? localFormData.identification
                  : payload.user?.identification}
                onChange={handleChange}
                className="w-full text-sm px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="name1"
              >
                <span className="text-red-600">*</span> Nombres
              </label>
              <input
                disabled={!enableField}
                type="text"
                id="names"
                name="names"
                value={dataVerified.type === "PSE" &&
                    dataVerified.typeId !== "CC" &&
                    dataVerified.typeId !== "NIT"
                  ? localFormData.names
                  : fullName}
                onChange={handleChange}
                className="w-full text-sm px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>

            <div>
              <label
                className="block text-sm text-gray-700 font-medium mb-1"
                htmlFor="name2"
              >
                <span className="text-red-600">*</span> Apellidos
              </label>
              <input
                disabled={!enableField}
                type="text"
                id="lastNames"
                name="lastNames"
                value={dataVerified.type === "PSE" &&
                    dataVerified.typeId !== "CC" &&
                    dataVerified.typeId !== "NIT"
                  ? localFormData.lastNames
                  : fullLastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 disabled:text-gray-600 text-sm"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
          </div>

          {/* Fila 3 */}
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="email"
            >
              <span className="text-red-600">*</span> Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={(e) => validateDomainEmail(e.target.value)}
              value={localFormData.email}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:outline-none hover:shadow-md text-sm transition-all disabled:bg-gray-200 disabled:text-gray-600 ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-pink-600"
              }`}
              autoComplete="off"
              autoCorrect="off"
            />
            <p className="text-xs text-gray-700">
              A este correo electrónico se le enviará la información de tu
              compra.
            </p>
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Fila 4 */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="address"
              >
                <span className="text-red-600">*</span> Dirección
              </label>
              <input
                required
                type="text"
                id="address"
                name="address"
                placeholder="Ingresa tu dirección"
                value={localFormData.address}
                onChange={handleChange}
                className={`w-full text-sm px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all ${localFormData.address ? "border-2": "border-2 border-pink-600"} `}
                autoComplete="off"
                autoCorrect="off"
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="phone"
              >
                <span className="text-red-600">*</span> Teléfono
              </label>
              <input
                required
                type="text"
                placeholder="Número de teléfono"
                id="phone"
                name="phone"
                value={localFormData.phone}
                onChange={(e) => {
                  // Permitir solo números
                  const value = e.target.value.replace(/\D/g, "");
                  handleChange({ target: { name: "phone", value } });
                }}
                className={`w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all ${localFormData.phone ? "border-2": "border-2 border-pink-600"} `}
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="address"
              >
                <span className="text-red-600">*</span> Departamento
              </label>
              <select
                required
                id="departamento"
                name="departamento"
                value={localFormData.departamento}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-200 ${localFormData.departamento ? "border-2": "border-2 border-pink-600"} `}
              >
                <option value="">Seleccione</option>
                {departaments.map((departament) => (
                  <option key={departament.id} value={departament.name}>
                    {departament.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="phone"
              >
                <span className="text-red-600">*</span> Municipio
              </label>
              <select
                required
                id="municipio"
                name="municipio"
                value={localFormData.municipio}
                onChange={handleChange}
                className={`w-full px-4 py-2 border-2 text-sm disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 ${localFormData.municipio ? "border-2": "border-2 border-pink-600"} `}
                disabled={!localFormData.departamento} // Deshabilitar hasta seleccionar un departamento
              >
                <option value="">Seleccione</option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.name}>
                    {municipio.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <p className="text-sm mt-4">
          <span className="text-red-600">*</span> Campos obligatorios{" "}
        </p>
        <p className="text-sm text-gray-800 mt-4">¿Necesitas factura?</p>

        <div className="flex items-center space-x-3 p-0 bg-gray-50 mt-4">
          {/* Ícono a la izquierda */}
          <div className="text-gray-700">
            <FileText className="w-5 h-5" />
          </div>

          {/* Texto descriptivo */}
          <p className="text-sm text-gray-700">
            Para solicitar documento tributario a nombre de quién paga o compra,
            {" "}
            <span
              className="text-pink-600 underline cursor-pointer hover:text-pink-800 font-semibold"
              onClick={openModal}
            >
              click aquí
            </span>
          </p>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex justify-center w-full bg-gray-100 rounded-xl px-4 py-2">
        <PaymentForm
          onFormDataChange={onFormDataChange}
          numberValid={numberValid}
          phoneNumberValid={phoneNumberValid}
          onMethodChangeProps={onMethodChangeProps}
        />
      </div>
    </div>
  );
};

export default StepTwo;

StepTwo.propTypes = {
  onRegisterData: PropTypes.func,
  payload: PropTypes.object,
  status: PropTypes.number,
  getDepartamentos: PropTypes.func,
  openModal: PropTypes.func,
  numberValid: PropTypes.func,
  openAlertEmailModal: PropTypes.func
};
