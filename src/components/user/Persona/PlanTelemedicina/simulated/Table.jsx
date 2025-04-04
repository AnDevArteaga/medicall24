import useSelectSpeciality from "@/hooks/useSelectSpeciality";
import PlanSimulated from "@/components/user/Persona/PlanTelemedicina/Simulated/planPersonas.jsx";
import usePlanPesonas from "@/hooks/usePlanPersonas";
import { usePlan } from "@/contexts/empresas/simulatedPlanContext";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const styles = `
.custom-input::placeholder {
    font-size: 0.9rem;
    font-weight: lighter;
  }

`;

const Table = ({ onNext, openModalCotize, handleOpenModalTerm }) => {
  const {
    especialidadesSeleccionadas,
  } = useSelectSpeciality(onNext);

  const {
    resultadoFinalPersonas,
    especialidadesDisponibles,
    toggleEspecialidad,
  } = usePlan();

  const formatNumber = (number) => {
    return number.toLocaleString("es-US");
  };

  console.log("Resultado Final:", resultadoFinalPersonas);

  const valores = usePlanPesonas(resultadoFinalPersonas); // Aquí estaba el error
  console.log("Valores Calculados:", valores);

  return (
    <div className="p-6 md:p-12 sm:p-0 flex flex-col items-center">
      <style>{styles}</style>
      {/* Título */}
      <h1 className="text-6xl md:text-5xl sm:text-4xl font-bold text-center mb-8 text-gray-700">
        Arma tu plan de Telemedicina
      </h1>

      <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {especialidadesDisponibles.length > 0
          ? (
            <ul className="flex flex-wrap justify-center gap-2 w-full mb-8">
              {especialidadesDisponibles.map((esp) => (
                <li
                  key={esp.id}
                  onClick={() => toggleEspecialidad(esp.id, "personas")}
                  className={`flex items-center w-40 sm:w-36 gap-1 p-1 sm:p-0 rounded-xl cursor-pointer transition-all duration-300 
                  ${
                    especialidadesSeleccionadas.some((e) => e.id === esp.id)
                      ? "bg-pink-50 border-pink-200 border shadow-sm"
                      : "bg-transpartent hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`w-6 h-6 sm:w-4 sm:w-4 rounded-full flex items-center justify-center transition-transform duration-300 
                    ${
                        especialidadesSeleccionadas.some((e) => e.id === esp.id)
                          ? "scale-110"
                          : "scale-100"
                      }`}
                    >
                      {especialidadesSeleccionadas.some((e) => e.id === esp.id)
                        ? (
                          <div className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-pink-500 border-4 border-pink-300">
                          </div>
                        )
                        : (
                          <div className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-white">
                          </div>
                        )}
                    </div>
                  </div>
                  <span className="text-gray-800 font-regular text-sm sm:text-xs">
                    {esp.nombre}
                  </span>
                </li>
              ))}
            </ul>
          )
          : (
            <div className="bg-gray-50 flex min-h-72 justify-center items-center rounded-xl text-center p-8">
              <span className="text-gray-500 text-lg">
                No hay especialidades disponibles
              </span>
            </div>
          )}
        <div className="flex justify-center items-center">
          {especialidadesSeleccionadas.length >= 3 && (
            <span className="text-sm text-center text-gray-600 sm:text-xs">
              El plan de telemedicina brinda cobertura para 4 usuarios
            </span>
          )}
        </div>
      </div>
      {especialidadesSeleccionadas.length >= 3
        ? (
          <dsiv className="flex sm:flex-col space-x-2 justify-center transition-all duration-500 animate-fade-in">
            <PlanSimulated
              meses={12}
              valorMes={formatNumber(valores?.valorMes12)}
              promedioPorUsuario={formatNumber(valores?.promedio12)}
              descuento={valores?.descuento12}
              mostrarDescuento={true}
              openModalCotize={openModalCotize}
              className="sm:block hidden"
            />
            <PlanSimulated
              meses={6}
              valorMes={formatNumber(valores?.valorMes6)}
              promedioPorUsuario={formatNumber(valores?.promedio6)}
              descuento={valores?.descuento6}
              mostrarDescuento={true}
              openModalCotize={openModalCotize}
            />
            <PlanSimulated
              meses={12}
              valorMes={formatNumber(valores?.valorMes12)}
              promedioPorUsuario={formatNumber(valores?.promedio12)}
              descuento={valores?.descuento12}
              mostrarDescuento={true}
              openModalCotize={openModalCotize}
              className="sm:hidden"
            />
            <PlanSimulated
              meses={3}
              valorMes={formatNumber(valores?.valorMes3)}
              promedioPorUsuario={formatNumber(valores?.promedio3)}
              mostrarDescuento={false}
              openModalCotize={openModalCotize}
            />
          </dsiv>
        )
        : (
          <div className="bg-pink-600 rounded-xl py-1 px-4 text-center text-sm sm:text-xs text-white font-semibold mt-12">
            <span>Selecciona al menos 3 especialidades</span>
          </div>
        )}
{/* 
      {especialidadesSeleccionadas.length >= 3 && (
        <div className="w-full transition-all duration-500 translate-y-4 animate-fade-in">
          <span className="text-sm text-gray-600 sm:text-xs">
            Todos los planes incluyen los medicamentos con entrega a domicilio y
            una Póliza de Accidentes Personales con cobertura hasta por
            $20,000,000 COP.
          </span>
        </div>
      )} */}

      {especialidadesSeleccionadas.length >= 3 && (
        <span
          className="cursor-pointer text-left mt-8 text-gray-600 text-sm underline"
          onClick={() => handleOpenModalTerm()}
        >
          Aplican términos y condiciones.
        </span>
      )}

      <div className="flex items-center justify-center">
      </div>
    </div>
  );
};

export default Table;
