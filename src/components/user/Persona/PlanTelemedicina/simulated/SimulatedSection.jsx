import { useState, useEffect } from "react";
import Table from "./Table";

const SimulatedSection = ({ onParentAction, openModalCotize, openModalSelectSpeciality, onSubmit, statusModalCotizeSendEmpresa, handleOpenModalTerm }) => {
  const [step, setStep] = useState(1);
//   const [valorPlan, setValorPlan] = useState(null);
  const [formData, setFormData] = useState({
    tableData: null,
    cotizeData: null,
    cotizeFormData: null,
  });

  useEffect(() => {
    if (!statusModalCotizeSendEmpresa) {
      setStep(1);
    }
  }, [statusModalCotizeSendEmpresa]);

  

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPreviousStep = () => setStep((prev) => prev - 1);


  const updateFormData = (key, data) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
    console.log(formData);
  };


  return (
    <div className="flex items-center justify-center sm:items-start h-auto sm:py-12 sm:pt-0 sm:px-6 bg-gray-100">
    <div className="w-full max-w-5xl">
      {/* Contenedor de la Tabla */}
      <div className="w-full">
        {/* Botón de ir a Formulario */}
        <div className="h-full">
          <Table  
            onNext={(data) => {
              updateFormData("tableData", data);
              goToNextStep();
            }} 
            openModalCotize={openModalCotize} 
            openModalSelectSpeciality={openModalSelectSpeciality} 
            handleOpenModalTerm={handleOpenModalTerm}
          />
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default SimulatedSection;