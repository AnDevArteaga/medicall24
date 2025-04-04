import { CheckCircle } from "lucide-react";
import { usePlan } from "../../../contexts/empresas/simulatedPlanContext";
import { useEffect } from "react";

const SelectSpecialityModal = ({ isOpenSelectSpeciality, onCloseSelectSpeciality }) => {
  const { especialidadesSeleccionadas, toggleEspecialidad, especialidadesDisponibles, setNT, setDiscount, setValueMonthly, setValueAnnually, setEspecialidadesSeleccionadas } = usePlan();


   // Cargar especialidades guardadas cuando se abre el modal
   useEffect(() => {
    if (isOpenSelectSpeciality) {
      const especialidadesGuardadas = JSON.parse(localStorage.getItem("especialidadesSeleccionadas")) || [];
      setEspecialidadesSeleccionadas(especialidadesGuardadas);
    }
  }, [isOpenSelectSpeciality, setEspecialidadesSeleccionadas]);


  const cancelSelectSpeciality = () => {

    onCloseSelectSpeciality();
  };

  const guardarEspecialidadesEnStorage = () => {
    localStorage.setItem("especialidadesSeleccionadas", JSON.stringify(especialidadesSeleccionadas));
    window.dispatchEvent(new Event("storage")); // Notificar cambio
    onCloseSelectSpeciality()
  };

  if (!isOpenSelectSpeciality) return null;

  // Función auxiliar para saber si una especialidad está seleccionada
  const isEspecialidadSeleccionada = (id) => {
    return especialidadesSeleccionadas.some((esp) => esp.id === id);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 flex justify-center items-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden transform transition-all duration-300">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-5 px-6">
          <h2 className="text-xl text-center font-bold tracking-wide">Agrega las especialidades</h2>
        </div>
        
        {/* Contenido */}
        <div className="p-2">
          <div className="flex justify-center items-center mt-2">
          <span className="text-gray-700 text-center text-base mb-2 md:text-center md:text-2xl">
            Selecciona mínimo 3 especialidades
          </span>
          </div>
      
          <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {especialidadesDisponibles.length > 0 ? (
              <ul className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-3">
                {especialidadesDisponibles.map((esp) => (
                  <li
                    key={esp.id}
                    onClick={() => toggleEspecialidad(esp.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-300 
                      ${isEspecialidadSeleccionada(esp.id) 
                        ? 'bg-pink-50 border-pink-200 border shadow-sm' 
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'}`}
                  >
                    <div className="relative">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 
                        ${isEspecialidadSeleccionada(esp.id) ? 'scale-110' : 'scale-100'}`}>
                        {isEspecialidadSeleccionada(esp.id) ? (
                          <CheckCircle className="text-pink-500 w-6 h-6" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                        )}
                      </div>
                    </div>
                    
                    <span className="text-gray-800 font-medium">{esp.nombre}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-gray-50 flex min-h-72 justify-center items-center rounded-xl text-center p-8">
                <span className="text-gray-500 text-lg">
                  No hay especialidades disponibles
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Botones */}
        <div className="px-6 py-4 flex justify-between items-center border-t border-gray-100">
          <button
            onClick={cancelSelectSpeciality}
            className="px-6 py-3 bg-pink-600 text-white font-medium rounded-xl border border-gray-200 hover:bg-pink-700 transition-colors duration-200"
          >
            Cancelar
          </button>
          
          <button
            onClick={guardarEspecialidadesEnStorage}
            disabled={especialidadesSeleccionadas.length < 3}
            className={`px-6 py-3 font-medium rounded-xl transition-all duration-300 shadow-sm
              ${especialidadesSeleccionadas.length < 3 
                ? 'bg-gray-400 text-white' 
                : 'bg-pink-600 text-white hover:bg-pink-700'}`}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectSpecialityModal;
