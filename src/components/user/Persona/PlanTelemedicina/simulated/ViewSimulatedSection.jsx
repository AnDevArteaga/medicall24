import { useState, useEffect } from "react";
import SimulatedSection from "./SimulatedSection";
// import video from '../../../../../assets/videoSectionSimulate.mp4';
import { usePlan } from "../../../../../contexts/empresas/simulatedPlanContext";

const ViewSimulatedSection = ( { openModalCotize, openModalSelectSpeciality, handleCloseCotizeSendEmpresa, onSubmit, statusModalCotizeSendEmpresa, handleOpenModalTerm } ) => {
  const [activeDiv, setActiveDiv] = useState(1);



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


  return (
    <div 
      className={`bg-gray-200 py-12`}
    >
      <div>
        <SimulatedSection 
          openModalCotize={openModalCotize} 
          openModalSelectSpeciality={openModalSelectSpeciality} 
          onSubmit={onSubmit}
          statusModalCotizeSendEmpresa={statusModalCotizeSendEmpresa}
          handleOpenModalTerm={handleOpenModalTerm}
        />
      </div>
    </div>
  );
};

export default ViewSimulatedSection;