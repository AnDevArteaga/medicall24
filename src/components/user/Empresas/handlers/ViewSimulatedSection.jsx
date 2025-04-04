import { useState, useEffect } from "react";
import SimulatedSection from "./SimulatedSection";
import video from '../../../../assets/videoSectionSimulate.mp4';
import { usePlan } from "../../../../contexts/empresas/simulatedPlanContext";

const ViewSimulatedSection = ( { openModal, openModalSelectSpeciality, handleCloseCotizeSendEmpresa, onSubmit, statusModalCotizeSendEmpresa } ) => {
  const [activeDiv, setActiveDiv] = useState(1);


  // Función para mostrar la tabla
//   const showIndex = () => {
//     setActiveDiv(1);
//   };

const {
  setNT,
  setResultadoFinal,
  setDiscount,
  setValueMonthly,
  setValueAnnually,
  setEspecialidadesSeleccionadas,
   } = usePlan();

useEffect(() => {
  if (!statusModalCotizeSendEmpresa) {
    setNT("");
    setResultadoFinal("");
    setDiscount(0);
    setValueMonthly(0);
    setValueAnnually(0);
    setEspecialidadesSeleccionadas([]);
    setActiveDiv(1);
  }
}, [statusModalCotizeSendEmpresa]);





  // Función para mostrar el formulario
  const ShowSimulated = () => {
    setActiveDiv(2);
  };

  const handleChildAction = (newActiveDiv) => {
    setActiveDiv(newActiveDiv); // Actualiza el estado en el padre
  };

  return (
<main className="flex flex-col min-h-[110vh] sm:min-h-[700px] bg-gray-200 relative overflow-hidden py-96">
<video
          autoPlay
          muted
          loop
          playsInline
          className={`
            absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-50 
            transform transition duration-500 ease-in-out
            ${activeDiv === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `}
        >
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
        <div 
          className={`
            absolute top-0 left-0 w-full h-full
            transform transition duration-500 ease-in-out
            ${activeDiv === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `}
        >
          {/* Botón de ir a Formulario */}
          <div className="relative h-full flex flex-col items-center justify-center px-4">
            <span className="text-center text-5xl font-bold text-white md:text-4xl sm:text-4xl">Usa el simulador y arma el plan ideal para tus trabajadores</span>
            <button 
            className='bg-orange-500 text-white font-bold py-2 px-6 border-b-4 border-orange-500 rounded-xl w-5/12 mt-10 w-auto md:w-96 md:text-2xl hover:bg-orange-500 hover:scale-110 transition text-xl duration-300 hover:border-orange-400 cursor-pointer'
            onClick={ShowSimulated} >
            Abrir simulador
            </button>
          </div>
        </div>

        {/* Div del Formulario */}
        <div 
          className={` bg-gray-200 py-16 sm:py-2
            absolute top-0 left-0 w-full
            transform transition duration-500 ease-in-out
            ${activeDiv === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          `}
        >
          <div className="relative h-full">
            <SimulatedSection onParentAction={handleChildAction} openModal={openModal} openModalSelectSpeciality={openModalSelectSpeciality} onSubmit={onSubmit}
            statusModalCotizeSendEmpresa={statusModalCotizeSendEmpresa}
            />
          </div>
        </div>
</main>
  );
};

export default ViewSimulatedSection;