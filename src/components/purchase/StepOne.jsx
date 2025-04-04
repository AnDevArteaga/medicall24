import PropTypes from "prop-types";
import visibilityOff from "../../assets/SVG/visibility_off.svg";
import visibility from "../../assets/SVG/visibility.svg";

import { usePasswordVisibility } from "../../hooks/useStepOne/usePasswordVisibility";
import { useFormValidation } from "../../hooks/useStepOne/useFormValidation";
import { usePasswordValidation } from "../../hooks/useStepOne/usePasswordValidation";
import { useFetchData } from "../../hooks/useStepOne/useFetchData";
import { useFormData } from "../../hooks/useStepOne/useFormData";
import { useFormValidationStatus } from "../../hooks/useStepOne/useFormValidationStatus";

import { AlertCircle } from "lucide-react";

const StepOne = ({
  onRegisterData,
  modalOpen,
  next,
  onSuccessfulRegistration,
  registered,
  showPasswordisUserRegistered,
  openAlertEmailModal,
  resetFieldRegister,
  type // El type es para diferenciar si es un registro de prueba o un regristro para compra -- Proximamente refactorizado por favor
}) => {
  const { formErrors, validateIdentification, validateEmail, validateDomainEmail } =
    useFormValidation(openAlertEmailModal);

  const { formData, handleChange, setFormData } = useFormData(
    onRegisterData,
    validateEmail,
    validateIdentification,
    resetFieldRegister
  );

  const {
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
  } = usePasswordVisibility();

  const { isUserRegistered, typeIds, checkUserRegistration } = useFetchData(
    formData,
    registered,
    modalOpen,
    setFormData,
    onSuccessfulRegistration,
    type
  );
  const { confirmPassword, errorMessage, passwordError, handleChangePassword } =
    usePasswordValidation(formData, setFormData, resetFieldRegister);

  useFormValidationStatus(
    formData,
    confirmPassword,
    passwordError,
    formErrors,
    next,
  );

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <form className="space-y-4" autoComplete="off">
        {/* Fila 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label
              className="block text-gray-700 font-medium text-sm mb-1"
              htmlFor="typeId"
            >
              Tipo de Identificación
            </label>
            <select
              required
              id="typeId"
              name="typeId"
              value={formData.user.typeId || ""}
              disabled={isUserRegistered}
              onChange={handleChange}
              onBlur={checkUserRegistration}
              className={`w-full px-3 py-1.5 text-sm disabled:text-gray-900 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 ${formData.user.typeId ? "border-2": "border-2 border-pink-600"} `}
            >
              <option value="">Seleccione</option>
              {typeIds.map((type) => (
                <option key={type.code} value={type.code}>
                  {type.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium text-sm mb-1"
              htmlFor="identification"
            >
              <span className="text-red-600">*</span> Identificación
            </label>
            <input
              required
              type="text"
              id="identification"
              name="identification"
              value={formData.user.identification || ""}
              disabled={isUserRegistered}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                handleChange({ target: { name: "identification", value } });
              }}
              onBlur={checkUserRegistration}
              className={`w-full px-3 py-1.5 text-sm disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all 
                ${formData.user.identification ? "border-2" : "border-2 border-pink-600"}
              `}
            />

          </div>
          <AlertCircle className="w-4 h-4 text-white block sm:hidden" />

          <div className="flex flex-row space-x-2">
            <AlertCircle className="w-4 h-4 text-pink-600" />

            <p className="text-xs text-gray-700">
              La identificación no se puede modificar despues de finalizar el
              registro.
            </p>
          </div>
        </div>

        {/* Fila 2 */}
        <div className="grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3">
          <div>
            <label
              className="block text-gray-700 text-sm  font-medium mb-1"
              htmlFor="name1"
            >
              <span className="text-red-600">*</span> Primer Nombre
            </label>
            <input
              required
              type="text"
              id="name1"
              name="name1"
              value={formData.user.name1 || ""}
              disabled={isUserRegistered}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all ${formData.user.name1 ? "border-2": "border-2 border-pink-600"} `}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="name2"
            >
              Segundo Nombre
            </label>
            <input
              type="text"
              id="name2"
              name="name2"
              value={formData.user.name2 || ""}
              disabled={isUserRegistered}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all border-2`}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="lastName1"
            >
              <span className="text-red-600">*</span> Primer Apellido
            </label>
            <input
              type="text"
              required
              id="lastName1"
              name="lastName1"
              value={formData.user.lastName1 || ""}
              disabled={isUserRegistered}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all ${formData.user.lastName1 ? "border-2": "border-2 border-pink-600"} `}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="lastName2"
            >
              Segundo Apellido
            </label>
            <input
              type="text"
              id="lastName2"
              name="lastName2"
              value={formData.user.lastName2 || ""}
              disabled={isUserRegistered}
              onChange={handleChange}
              className={`w-full px-4 py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all border-2`}
            />
          </div>
        </div>

        {/* Fila 3 */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
          <div>
            <label
              className="block text-gray-700 font-medium text-sm mb-1"
              htmlFor="email"
            >
              <span className="text-red-600">*</span> Correo Electrónico
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.user.email || ""}
              disabled={isUserRegistered}
              onChange={handleChange}
              onBlur={(e) => validateDomainEmail(e.target.value)}
              className={`w-full px-3 text-sm py-1.5 border-2 disabled:bg-gray-200 rounded-lg focus:ring-2 focus:outline-none disabled:text-gray-600 hover:shadow-md transition-all ${formData.user.email ? "border-2 ": "border-2 border-pink-600"} ${
                formErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-pink-600"
              }`}
            />

            <div className="flex flex-row space-x-2 mt-2">
              <AlertCircle className="w-4 h-4 text-pink-600" />

              <p className="text-xs text-gray-700">
                El correo electrónico no se puede modificar despues de finalizar el
                registro.
              </p>
            </div>

            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>
        </div>

        {/* Fila 4 */}
        {showPasswordisUserRegistered && (
          <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
            <div>
              <label
                className="block text-gray-700  text-sm font-medium mb-1"
                htmlFor="name2"
              >
                <span className="text-red-600">*</span> Contraseña
              </label>
              <div className="flex items-center space-x-2">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.user.password || ""}
                  disabled={isUserRegistered}
                  onChange={handleChangePassword}
                  className={`w-full px-4  text-sm py-2 border-2 disabled:bg-gray-200 disabled:text-gray-600  rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all ${formData.user.password ? "border-2": "border-2 border-pink-600"} `}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {showPassword
                    ? (
                      <img
                        src={visibility}
                        alt="show password"
                        className="w-5 h-5"
                      />
                    )
                    : (
                      <img
                        src={visibilityOff}
                        alt="hide password"
                        className="w-5 h-5"
                      />
                    )}
                </button>
              </div>
            </div>
            <div>
              <label
                className="block text-sm text-gray-700 font-medium mb-1"
                htmlFor="lastName1"
              >
                <span className="text-red-600">*</span> Confirmar Contraseña
              </label>
              <div className="flex items-center space-x-2">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChangePassword}
                  disabled={isUserRegistered}
                  className={`w-full text-sm px-4 py-2 border-2 disabled:bg-gray-200 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all ${confirmPassword ? "border-2": "border-2 border-pink-600"} `}
                />

                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {showConfirmPassword
                    ? (
                      <img
                        src={visibility}
                        alt="show password"
                        className="w-5 h-5"
                      />
                    )
                    : (
                      <img
                        src={visibilityOff}
                        alt="hide password"
                        className="w-5 h-5"
                      />
                    )}
                </button>
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
          </div>
        )}
      </form>

      <p className="mt-5 text-sm">
        <span className="text-red-600">*</span>Campos obligatorios
      </p>
    </div>
  );
};

export default StepOne;

StepOne.propTypes = {
  onRegisterData: PropTypes.func,
  status: PropTypes.number,
  modalOpen: PropTypes.func,
  next: PropTypes.func,
  handleInputChange: PropTypes.func,
  onSuccessfulRegistration: PropTypes.bool,
  registered: PropTypes.func,
  showPasswordisUserRegistered: PropTypes.bool,
  openAlertEmailModal: PropTypes.func
};
