import { useState } from "react";
import DotSpinner from "../../components/common/Loader"; // Asegúrate de tener tu loader

const CotizeSendEmpresa = ({ isOpenCotizeSendEmpresa, handleCloseCotizeSendEmpresa }) => {
  const [loading, setLoading] = useState(true);

  // Simular 2 segundos de carga
  setTimeout(() => setLoading(false), 2000);

  if (!isOpenCotizeSendEmpresa) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-1/3 sm:w-full md:max-w-md p-12">
    <div className="flex flex-col items-center justify-center h-full">
      {loading ? (
        <DotSpinner />
      ) : (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-pink-600">
            ¡Solicitud enviada!
          </h2>

          {/* Botón opcional, por si quieres algún "Regresar" o similar */}
          <button
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            onClick={handleCloseCotizeSendEmpresa} 
          >
            Volver
          </button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default CotizeSendEmpresa;
