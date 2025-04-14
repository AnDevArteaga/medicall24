import pse from "../../assets/SVG/pse.svg";
import ban from "../../assets/SVG/Ban.svg";
import visa from "../../assets/SVG/visa.svg";
import mastercard from "../../assets/SVG/mastercard.svg";
import nequi from "../../assets/SVG/nequi.svg";
import meddipay from "../../assets/SVG/meddipay-logo.svg";

import { usePaymentForms } from "../../hooks/usePaymentForm";

import { CheckCircle, LoaderCircle, XCircle } from "lucide-react";
import PropTypes from "prop-types";

const PaymentForm = (
  {
    onFormDataChange,
    numberValid,
    phoneNumberValid,
    onMethodChangeProps,
    validateCodeAutorization,
    statusCodeAutorization,
    setStatusCodeAutorization
  },
) => {
  const {
    selectedMethod,
    bankPse,
    methods,
    onMethodChange,
    formValues,
    handleInputChange,
    error,
    loading,
    validateCardNumber,
    handleValidateCodeAutorization,
  } = usePaymentForms(
    onFormDataChange,
    numberValid,
    phoneNumberValid,
    onMethodChangeProps,
    validateCodeAutorization,
    setStatusCodeAutorization
  );

  return (
    <div className="w-full mx-auto flex flex-col">
      <h2
        className={`text-2xl font-bold text-gray-700 text-center mb-6 ${
          selectedMethod === "CARD" ? "mt-6" : "mt-6"
        }`}
      >
        Selecciona un Método de Pago
      </h2>
      <div
        className={`grid grid-cols-2 p-1 sm:grid-cols-2 w-full gap-2 place-items-center rounded-lg mb-2`}
      >
        {methods.map((method) => (
          <div key={method.id} className="w-full">
            <button
              onClick={() => onMethodChange(method.id)}
              className={`flex flex-col items-center justify-center w-full h-20 transition-all duration-100 ease-in-out group rounded-xl
    ${
                selectedMethod === ""
                  ? "border-2 border-pink-600"
                  : selectedMethod === method.id
                  ? "bg-white border-2 border-pink-600"
                  : "border-none"
              }
  `}
            >
              <div className="mb-2">
                <div className="flex items-center justify-center">
                  {method.id === "CARD" && (
                    <img src={visa} alt="card" className="w-10 h-10" />
                  )}
                  {method.id === "CARD" && (
                    <img src={mastercard} alt="card" className="w-10 h-10" />
                  )}
                </div>
                {method.id === "PSE" && (
                  <img src={pse} alt="card" className="w-10 h-10" />
                )}
                {method.id === "BANCOLOMBIA_TRANSFER" && (
                  <img src={ban} alt="card" className="w-10 h-10" />
                )}
                {method.id === "NEQUI" && (
                  <img src={nequi} alt="card" className="w-10 h-10" />
                )}
                {method.id === "MEDDIPAY" && (
                  <img src={meddipay} alt="card" className="w-20 h-auto" />
                )}
              </div>
              <span
                className={`
            text-center font-semibold text-xs
            ${selectedMethod === method.id ? method.textColor : "text-gray-500"}
            group-hover:text-opacity-100
          `}
              >
                {method.label}
              </span>
            </button>
          </div>
        ))}
      </div>

      <div
        className="flex-grow p-4 rounded-lg overflow-y-auto"
        style={{ minHeight: "250px" }}
      >
        {selectedMethod === "CARD" && (
          <div className="animate-fade-in">
            <h3 className="text-base font-bold mb-4 text-gray-700">
              Pago con Tarjeta
            </h3>
            <form className="space-y-8">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block font-medium mb-2 text-sm text-gray-700"
                >
                  Número de Tarjeta sin espacios
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardNumber"
                    maxLength={16}
                    placeholder="XXXXXXXXXXXXXXXX"
                    className={`w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all ${
                      error ? "border-red-500" : "border-gray-300"
                    } rounded text-sm`}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleInputChange("number", value);
                      validateCardNumber();
                    }}
                    value={formValues.number || ""}
                    autoComplete="nope"
                    autoCorrect="off"
                  />
                  {loading && (
                    <LoaderCircle className="absolute right-3 top-1/4 transform text-pink-600 animate-spin w-5 h-5" />
                  )}
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                {" "}
                {/* Mensaje de error */}
              </div>

              <div>
                <label
                  htmlFor="cardName"
                  className="block font-medium mb-2 text-sm text-gray-700"
                >
                  Nombre de la Tarjeta
                </label>
                <input
                  type="text"
                  id="cardName"
                  placeholder=""
                  className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
                  onChange={(e) =>
                    handleInputChange("cardHolder", e.target.value)}
                  autoComplete="nope"
                  autoCorrect="off"
                />
              </div>
              <div className="flex gap-2 sm:flex-col sm:w-full justify-between">
                <div className="sm:flex sm:flex-col sm:w-6/7 mb-2">
                  <label
                    htmlFor="month"
                    className="block font-medium mb-2 text-sm text-gray-700"
                  >
                    Fecha de Expiración
                  </label>
                  <div className="sm:flex flex-row w-full justify-between space-y-2 sm:space-y-0">
                    <select
                      id="month"
                      placeholder="MM"
                      className="w-full sm:w-2/3 px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-200"
                      onChange={(e) =>
                        handleInputChange("expMonth", e.target.value)}
                    >
                      <option value="" disabled selected>
                        MM
                      </option>{" "}
                      {Array.from(
                        { length: 12 },
                        (_, i) => (
                          <option
                            key={i}
                            value={String(i + 1).padStart(2, "0")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </option>
                        ),
                      )}
                    </select>
                    <select
                      id="year"
                      className="w-full sm:w-2/3 px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-200"
                      onChange={(e) =>
                        handleInputChange("expYear", e.target.value)}
                    >
                      <option value="" disabled selected>
                        AA
                      </option>{" "}
                      {Array.from({ length: 15 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        const yearLastTwoDigits = year.toString().slice(-2);
                        return (
                          <option key={i} value={yearLastTwoDigits}>
                            {yearLastTwoDigits}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="sm:flex sm:flex-row flex flex-row gap-6 justify-end sm:gap-6">
                  <div className="sm:w-full">
                    <label
                      htmlFor="installments"
                      className="block font-medium mb-2 text-sm text-gray-700"
                    >
                      Cuotas
                    </label>
                    <select
                      id="installments"
                      className="w-full px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-200"
                      onChange={(e) =>
                        handleInputChange("installments", e.target.value)}
                    >
                      <option value=""></option>
                      {Array.from(
                        { length: 12 },
                        (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div className="w-1/4 sm:w-full">
                    <label
                      htmlFor="cvc"
                      className="block font-medium mb-2 text-sm text-gray-700"
                    >
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      maxLength="3"
                      placeholder="XXX"
                      className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        handleInputChange("cvc", value);
                      }}
                      value={formValues.cvc || ""}
                      autoComplete="nope"
                      autoCorrect="off"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {selectedMethod === "PSE" && (
          <div className="animate-fade-in">
            <h3 className="text-base font-bold mb-4 text-gray-700">
              Pago con PSE
            </h3>
            <form className="space-y-8">
              <div>
                <label
                  htmlFor="person"
                  className="block font-medium mb-2 text-sm text-gray-700"
                >
                  Tipo de persona
                </label>
                <select
                  id="person"
                  className="w-full px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-200"
                  onChange={(e) =>
                    handleInputChange("userType", e.target.value)}
                >
                  <option value="" disabled selected>
                    Seleccione tipo de persona
                  </option>
                  <option value="0">Natural</option>
                  {/* <option value="1">Jurídica</option> */}
                </select>
                {
                  /* <p className="text-xs text-gray-700">
                  A este correo electrónico se le enviará la información de tu
                  compra.
                </p> */
                }
              </div>
              <div>
                <label
                  htmlFor="bank"
                  className="block font-medium mb-2 text-sm text-gray-700"
                >
                  Lista de Bancos
                </label>
                <select
                  id="bank"
                  className="w-full px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-2000"
                  onChange={(e) =>
                    handleInputChange(
                      "financialInstitutionCode",
                      e.target.value,
                    )}
                >
                  <option value="" disabled selected>
                    Seleccione el banco
                  </option>
                  {bankPse.map((bank) => (
                    <option
                      key={bank.financial_institution_code}
                      value={bank.financial_institution_code}
                    >
                      {bank.financial_institution_name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        )}

        {selectedMethod === "BANCOLOMBIA_TRANSFER" && (
          <div className="animate-fade-in flex flex-col items-center justify-center">
            <h3 className="text-xl text-gray-700 font-bold mb-4 text-center">
              Pagarás con Bancolombia
            </h3>
            <span className="flex items-center justify-center w-16 h-16 border rounded-full shrink-0 transition-all bg-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          </div>
        )}

        {selectedMethod === "NEQUI" && (
          <div className="animate-fade-in">
            <h3 className="text-base font-bold mb-4 text-gray-700">
              Pago con Nequi
            </h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block font-medium mb-2 text-sm text-gray-700"
                >
                  Número de Teléfono Asociado a Nequi
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder=""
                  className="w-full px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-2000"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleInputChange("phoneNumber", value);
                  }}
                  value={formValues.phoneNumber || ""}
                  autoComplete="off"
                  autoCorrect="off"
                  maxLength={10}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                {" "}
                {/* Mensaje de error */}
              </div>
            </form>
          </div>
        )}
        {selectedMethod === "MEDDIPAY" && (
          <div className="animate-fade-in">
            <h3 className="text-base font-bold mb-8 text-gray-700">
              Pago con Meddipay
            </h3>
            <div className="flex flex-col items-center justify-center mb-4">
              <a
                href="https://www.meddipay.com.co/"
                target="_blank"
                className="bg-pink-600 w-2/3 mb-4 text-white px-8 py-3 sm:px-2 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg font-bold services-bexa text-sm md:text-3xl text-center"
              >
                <button>
                  Solicita tu cupo
                </button>
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="meddipayAuthorization"
                  className="block font-medium mb-2 text-sm text-gray-700"
                >
                  Ingresa Numero de autorización
                </label>
                <div className="w-full flex justify-between gap-2">
                  <input
                    type="text"
                    id="meddipayAuthorization"
                    placeholder=""
                    className="w-full px-4 py-2 border-2 disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none text-sm hover:shadow-md transition-all disabled:bg-gray-2000"
                    onChange={(e) => {
                      handleInputChange(
                        "meddipayAuthorization",
                        e.target.value,
                      );
                    }}
                    value={formValues.meddipayAuthorization || ""}
                    autoComplete="off"
                    autoCorrect="off"
                  />
                  <button
                    className="bg-pink-600 text-white px-4 rounded-lg shadow-md hover:bg-pink-700 transition-all"
                    onClick={handleValidateCodeAutorization}
                  >
                    Validar
                  </button>
                </div>

                {statusCodeAutorization === "valid"
                  ? (
                    <div className="flex flex-row mt-2">
                      <CheckCircle className="text-green-600 w-4 mr-2" />
                      <p className="text-green-600 text-sm mt-1">
                        Código válido
                      </p>
                    </div>
                  )
                  : statusCodeAutorization === "invalid" && (
                    <div className="flex flex-row mt-2">
                      <XCircle className="text-red-600 w-4 mr-2" />
                      <p className="text-red-600 text-sm mt-1">
                        Código inválido
                      </p>
                    </div>
                  )
                
                  }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;

PaymentForm.propTypes = {
  onFormDataChange: PropTypes.func,
  numberValid: PropTypes.func,
};
