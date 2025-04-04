import InfoPlan from "@/components/user/Empresas/page/InfoPlan";
import GetPlan from "@/components/user/Empresas/page/GetPlan";
import ViewIndex from "@/components/user/Empresas/page/ViewIndex";
import ViewSimulatedSection from "@/components/user/Empresas/handlers/ViewSimulatedSection";
import InfoCabina from "@/components/user/Empresas/page/InfoCabina";
import ModalPrice from "@/components/modals/Tables/ModalGetPlan";
import Header from "@/components/common/Header";
import SelectSpecialityModal from "@/components/modals/SelectSpeciality/selectSpeciality";
import CotizeSendEmpresa from "@/components/modals/CotizeSendEmpresa";
import { useEffect, useState } from "react";
import { usePlan } from "@/contexts/empresas/simulatedPlanContext";
import axios from "axios";
import Footer from "@/components/common/Footer";

const styles = `
 html {
    scroll-behavior: smooth;
  }


  .animate-slide-in {
    animation: slide-in 1s ease-out;
  }

  .animate-float-left {
    animation: float-left 3s ease-in-out infinite;
  }

  @keyframes float-left {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes scrollUp {
    0% {
      transform: translateY(
        100%
      ); /* Empuja el contenido hacia abajo inicialmente */
    }
    100% {
      transform: translateY(0); /* El contenido vuelve a su posición original */
    }
  }

  .bg-simulated {
    

  } `;

const CompanyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isOpenSelectSpeciality, setIsOpenSelectSpeciality] = useState(false);
  const openModalSelectSpeciality = () => setIsOpenSelectSpeciality(true);
  const closeSelectSpeciality = () => setIsOpenSelectSpeciality(false);
  const [isOpenCotizeSendEmpresa, setIsOpenCotizeSendEmpresa] = useState(false);
  const closeCotizeSendEmpresa = () => {
    setIsOpenCotizeSendEmpresa(false);
  };
  // UseEffect para bloquear el scroll del body cuando el modal esté abierto
  useEffect(() => {
    if (isModalOpen || isOpenSelectSpeciality) {
      // Bloquea el scroll en el body
      document.body.style.overflow = "hidden";
    } else {
      // Restaura el scroll del body cuando el modal esté cerrado
      document.body.style.overflow = "auto";
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.style.overflow = "auto"; // Asegurarse de restaurar el scroll al desmontar
    };
  }, [isModalOpen, isOpenSelectSpeciality]);


  const { resultadoFinal, valueMonthly, valueAnnually, NT, options, especialidadesSeleccionadas } = usePlan();
  const formatNumber = (value) => {
    if (typeof value === "number") {
      return new Intl.NumberFormat("es-ES").format(value); // Cambia "es-ES" según tu configuración regional
    }
    console.log("value", value);
    return value;
  };
  const sendCotizeData = async (cotizeData) => {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();
    console.log(especialidadesSeleccionadas);
    const date = `${dia}/${mes}/${año}`;
    const specialities = especialidadesSeleccionadas;
    console.log(specialities);
    console.log(options); 
    const cotizeDataToSend = {
      ...options,
      ...cotizeData,
      resultadoFinal: formatNumber(resultadoFinal),
      NT: formatNumber(NT),
      valueMonthly: formatNumber(valueMonthly),
      valueAnnually: formatNumber(valueAnnually),
      date,
      specialities,
    };
    console.log("Enviando datos:", cotizeDataToSend);

    try {
      const response = await axios.post(
        "https://edutlasdeveloper.pythonanywhere.com/send-email-cotize",
        cotizeDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Respuesta del servidor:", response.data);
      setIsOpenCotizeSendEmpresa(true);
      return response.data; // Retorna la respuesta en caso de que necesites manejarla
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      throw error; // Lanza el error para que pueda manejarse donde se llame la función
    }
  };
  return (
    <main>
      <Header />
      <style>{styles}</style>
      <section className="bg-gray-200 py-24 sm:py-1 sm:pt-12 h-full px-24 sm:px-6">
        <ViewIndex openModal={openModal} />
      </section>
      <section id="plan" className="py-12 px-24 sm:px-6">
        <InfoPlan  />
      </section>
      {/* <section className="py-12 px-24 sm:px-6">
        <InfoText />
      </section> */}
      <section className="py-12 sm:py-4 px-24 sm:px-6 bg-gray-100">
        <InfoCabina />
      </section>
      <section className="py-12 sm:py-2 md:px-4">
        <ViewSimulatedSection
          openModal={openModal}
          openModalSelectSpeciality={openModalSelectSpeciality}
          onSubmit={sendCotizeData}
          statusModalCotizeSendEmpresa={isOpenCotizeSendEmpresa}
        />
      </section>
      {/* <section className="py-2 px-24 sm:px-6">
        <GetPlan />
      </section> */}
      {isModalOpen && <ModalPrice onClose={closeModal} />}
      <SelectSpecialityModal
        isOpenSelectSpeciality={isOpenSelectSpeciality}
        onCloseSelectSpeciality={closeSelectSpeciality}
      />
      <CotizeSendEmpresa
        isOpenCotizeSendEmpresa={isOpenCotizeSendEmpresa}
        handleCloseCotizeSendEmpresa={closeCotizeSendEmpresa}
      />
      <Footer />
    </main>
  );
};

export default CompanyPage;
