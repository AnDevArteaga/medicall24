import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { activateAccount } from "@/services/azure/activateAccount";
import { X } from "lucide-react";

const Modal = (
  { isOpen, status, onClose, errorRegisterMessage, onResendCode },
) => {
  const [activationCode, setActivationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [resendTimer, setResendTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let timer;
    if (!canResend && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [resendTimer, canResend]);

  const handleChange = (e) => {
    let value = e.target.value.toUpperCase(); // Convierte a mayúsculas
    value = value.replace(/[^A-Z0-9]/g, ""); // Permite solo letras y números
    if (value.length <= 6) {
      setActivationCode(value);
    }
  };

  const handleVerifyCode = async () => {
    if (activationCode.length < 6) {
      setErrorMessage("El código debe tener 6 caracteres.");
      setIsError(true);
      return;
    }

    setIsVerifying(true);
    const response = await activateAccount(activationCode);

    if (response.status === 200) {
      setIsActivated(true);
      setIsError(false);
    } else {
      setErrorMessage(response.data?.message || "Error al activar la cuenta");
      setIsError(true);
    }
    setIsVerifying(false);
  };

  const handleResendCode = async () => {
    setCanResend(false);
    setResendTimer(10);
    onResendCode();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <X className="absolute top-0 right-0 m-2 text-gray-400 hover:text-gray-700 transition cursor-pointer" onClick={onClose} size={20} />

        {status === "load" && <p className="text-center">Registrando...</p>}
        {status === "success" && (
          <div className="text-center">
            {!isActivated
              ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Registro exitoso
                  </h3>
                  <p className="mt-4 text-gray-600">
                    Hemos enviado un código de activación a tu correo. Ingresa
                    el código para activar tu cuenta.
                  </p>

                  <div className="mt-4 flex justify-center space-x-2">
                    <input
                      type="text"
                      value={activationCode}
                      onChange={handleChange}
                      maxLength={6}
                      className="p-2 border rounded w-2/3 text-center text-sm uppercase ring-2 ring-pink-600 focus:outline-none focus:ring-pink-600"
                      placeholder="Código de activación"
                    />
                  </div>

                  {isError && (
                    <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
                  )}

                  <button
                    onClick={handleVerifyCode}
                    disabled={isVerifying || activationCode.length < 6}
                    className={`mt-4 px-6 py-2 font-semibold rounded-lg shadow-md transition-colors duration-300 disabled:bg-gray-400 ${
                      isVerifying
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-pink-600 text-white hover:bg-pink-700"
                    }`}
                  >
                    {isVerifying ? "Verificando..." : "Activar cuenta"}
                  </button>

                  <p className="mt-4 text-sm text-gray-600">
                    ¿No recibiste el código?{" "}
                    <button
                      onClick={handleResendCode}
                      disabled={!canResend}
                      className={`text-pink-600 font-semibold ${
                        !canResend
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:underline"
                      }`}
                    >
                      {canResend
                        ? "Reenviar código"
                        : `Reenviar en ${resendTimer}s`}
                    </button>
                  </p>
                </>
              )
              : (
                <>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Cuenta activada
                  </h3>
                  <p className="mt-4 text-gray-600">
                    Tu cuenta ha sido activada exitosamente. Puedes continuar
                    con tu compra pulsando el botón siguiente.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
                  >
                    Siguiente
                  </button>
                </>
              )}
          </div>
        )}
        {status === "error" && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">¡Error!</h3>
            <p className="mt-4 text-gray-600">{errorRegisterMessage}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  errorRegisterMessage: PropTypes.string,
  onResendCode: PropTypes.func.isRequired,
};
