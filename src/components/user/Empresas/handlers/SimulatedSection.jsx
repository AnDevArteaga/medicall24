import { useState, useEffect } from "react";
import CotizeForm from "./CotizeForm";
import Table from "./Table";
import { ChevronLeft } from "lucide-react";

const SimulatedSection = ({ onParentAction, openModal, openModalSelectSpeciality, onSubmit, statusModalCotizeSendEmpresa }) => {
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

    // Verifica si todos los datos están completos
    // const isFormComplete = Object.values(formData).every((data) => data !== null);


//   const handleActivate = (planValue) => {
//     showForm(planValue);
//   };    

  // Función para mostrar la tabla
  const handleButtonClick = () => {
    if (step === 3 || step === 2) {
      // Ejecuta la función local `showTable`
      goToPreviousStep();
    } else if (step === 1) {
      // Ejecuta la función recibida desde el padre
      onParentAction && onParentAction(1); // Envía activeDiv = 1 al padre
    }
  };

  // Función para mostrar el formulario
//   const showForm = (planValue) => {
//     setValorPlan(planValue); 
//     setActiveDiv(2);
//   };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="relative w-full max-w-5xl h-screen">
        {/* Div de la Tabla */}
        <div 
          className={`
            absolute top-0 left-0 w-full h-full 
            transform transition duration-500 ease-in-out
            ${step === 1 ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `}
        >
          {/* Botón de ir a Formulario */}
          <div className="relative h-full">
            <Table  onNext={(data) => {
              updateFormData("tableData", data);
              goToNextStep();
            }} openModal={openModal} openModalSelectSpeciality={openModalSelectSpeciality}/>
          </div>
        </div>

        <button
              className="absolute z-10 top-0 -left-12 sm:left-2 sm:-top-0 flex items-center text-pink-600 font-semibold hover:underline md:left-8"
              onClick={handleButtonClick}
              >
              <ChevronLeft className="w-6 h-6 font-extrabold "></ChevronLeft>
        </button>

        {/* Div del Formulario */}
        <div 
          className={`
            absolute top-0 left-0 w-full h-full 
            transform transition duration-500 ease-in-out
            ${step === 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          `}
        >
          
          <div className="relative h-full flex flex-col items-center justify-center">
            <CotizeForm
            onNext={(data) => {
              updateFormData("cotizeData", data);
              goToNextStep();
            }}
            onSubmit={onSubmit}
            statusModalCotizeSendEmpresa={statusModalCotizeSendEmpresa}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SimulatedSection;