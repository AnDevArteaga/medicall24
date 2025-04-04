import PlanesTelemedicina from "../components/user/Persona/PlanTelemedicina/page/InfoPlan";
import PurchasePlan from "../components/user/Persona/PlanTelemedicina/page/PurchasePlan";
import TermCondPlanesPersonas from "../components/modals/TermAndConditions/Term&CondPlanesPersonas";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../styles/noScroll.css";
import useProductModal from "../hooks/useProductCotize";
import ProductCotize from "../components/modals/Products/ProductCotize";
import SelectSpecialityModal from "@/components/modals/SelectSpeciality/selectSpeciality";
import CotizeSendEmpresa from "@/components/modals/CotizeSendEmpresa";
import { useState, useEffect } from "react";
import SimulatedSection from "@/components/user/Persona/PlanTelemedicina/simulated/SimulatedSection";

const PlanesPeronas = ({productos, type}) => {
  const [isOpenModalTerm, setIsOpenModalTerm] = useState(false);

  const { isOpenModalCotize, name, value, id, handleCloseModalCotize, handleOpenModalCotize, handleCheckboxChange  } = useProductModal();
  
  const hiddenInputValue = true;
  const [isOpenSelectSpeciality, setIsOpenSelectSpeciality] = useState(false);
  const openModalSelectSpeciality = () => setIsOpenSelectSpeciality(true);
  const closeSelectSpeciality = () => setIsOpenSelectSpeciality(false);
  const [isOpenCotizeSendEmpresa, setIsOpenCotizeSendEmpresa] = useState(false);
  const closeCotizeSendEmpresa = () => {
    setIsOpenCotizeSendEmpresa(false);
  };

  const sendCotizeData = async (cotizeData) => {
    console.log("cotizeData", cotizeData);
  }

  useEffect(() => {
    // Agregar o quitar la clase `no-scroll` según el estado del modal
    if (isOpenModalTerm) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    // Limpieza: Elimina la clase si el componente se desmonta
    return () => document.body.classList.remove("no-scroll");
  }, [isOpenModalTerm]);

  const handleCloseModalTerm = () => setIsOpenModalTerm(false);
  const handleOpenModalTerm = () => setIsOpenModalTerm(true);
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://medicall24.com.co/wp-content/uploads/2025/01/fondpp.png')",
      }}
    >
      <Header />
      <main className="flex-1">
        <PlanesTelemedicina />
        <PurchasePlan handleOpenModalTerm={handleOpenModalTerm} productos={productos} handleOpenModalCotize={handleOpenModalCotize} handleCheckboxChange={handleCheckboxChange} />

                  <SimulatedSection 
          openModalCotize={handleOpenModalCotize} 
          openModalSelectSpeciality={openModalSelectSpeciality} 
          onSubmit={sendCotizeData}
          statusModalCotizeSendEmpresa={isOpenCotizeSendEmpresa}
          handleOpenModalTerm={handleOpenModalTerm}
        />
      </main>
      <Footer />
      {isOpenModalTerm && (
        <div className="flex items-center justify-center">
          <TermCondPlanesPersonas onCloseTerm={handleCloseModalTerm} />
        </div>
      )}
           {isOpenModalCotize && (
              <ProductCotize
                resetData={isOpenModalCotize}
                productName={name}
                packageValue={value}
                totalToPay={value}
                productId={id}
                onCloseTerm={handleCloseModalCotize}
                hiddenInputValue={hiddenInputValue}
                type={type}
              />
            )}
                  <SelectSpecialityModal
                    isOpenSelectSpeciality={isOpenSelectSpeciality}
                    onCloseSelectSpeciality={closeSelectSpeciality}
                  />
                  <CotizeSendEmpresa
                    isOpenCotizeSendEmpresa={isOpenCotizeSendEmpresa}
                    handleCloseCotizeSendEmpresa={closeCotizeSendEmpresa}
                  />
    </div>
  );
};

export default PlanesPeronas;
