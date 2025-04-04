import { useState } from "react";
import PropTypes from "prop-types";
import { Users, MessageSquareText } from "lucide-react";
import DotSpinner from "../../../common/Loader";

const CotizeFormTwo = ({ onSubmit, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [users, setUsers] = useState("");
  const [options, setOptions] = useState({
    extraUsers: false,
    lifeInsurance: false,
    accidentInsurance: false,
  });
  const [comments, setComments] = useState("");

  const handleCheckboxChange = (option) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      users: parseInt(users, 10),
      options,
      comments,
    };

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      onSubmit(formData);
      goToBack();
    }, 1000);
  };

  const goToBack = () => {
    setTimeout(() => {
      onBack();
      setTimeout(() => {
        reload();
      }, 1000);
    }, 3000);
  };

  const reload = () => {
    setSent(false);
    setUsers("");
    setOptions({
      extraUsers: false,
      lifeInsurance: false,
      accidentInsurance: false,
    });
    setComments("");
  };

  const isFormValid = () => users.trim() !== "";

  const inputBaseClass = "w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-orange-500 text-gray-700 py-2";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96">
            <DotSpinner />
          </div>
        ) : sent ? (
          <div className="flex flex-col items-center justify-center h-96 animate-fade-in">
            <h2 className="text-2xl font-bold text-green-600 mb-4">¡Solicitud enviada!</h2>
            <p className="text-gray-600 text-center">
              En las próximas horas recibirás la cotización en el correo proporcionado.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-700 text-center">Detalles del plan</h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Cantidad de usuarios */}
              <div className="relative">
                <Users className="absolute left-2 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cantidad de usuarios tomadores"
                  value={users}
                  onInput={(e) => setUsers(e.target.value.replace(/[^0-9]/g, ""))}
                  className={`${inputBaseClass} pl-8`}
                />
              </div>

              {/* Opciones */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Opciones adicionales</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.extraUsers}
                      onChange={() => handleCheckboxChange("extraUsers")}
                      className="accent-orange-500"
                    />
                    <span className="text-gray-600">Incluir 3 usuarios adicionales</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.lifeInsurance}
                      onChange={() => handleCheckboxChange("lifeInsurance")}
                      className="accent-orange-500"
                    />
                    <span className="text-gray-600">Póliza de vida por $2,500 mensuales</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={options.accidentInsurance}
                      onChange={() => handleCheckboxChange("accidentInsurance")}
                      className="accent-orange-500"
                    />
                    <span className="text-gray-600">Póliza de accidentes personales por $2,000 mensuales</span>
                  </label>
                </div>
              </div>

              {/* Comentarios */}
              <div className="relative">
                <MessageSquareText className="absolute left-2 top-3 text-gray-400" size={20} />
                <textarea
                  placeholder="Comentarios adicionales"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className={`${inputBaseClass} pl-8 resize-none`}
                  rows="3"
                />
              </div>

              {/* Botón Enviar */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full py-3 rounded-lg font-semibold text-white border-b-4
                    ${isFormValid()
                      ? 'bg-orange-500 border-orange-500 hover:border-orange-600 hover:bg-orange-600 transition'
                      : 'bg-gray-300 border-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Enviar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

CotizeFormTwo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default CotizeFormTwo;
