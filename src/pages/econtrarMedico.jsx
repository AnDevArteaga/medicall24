import StepSection from "../components/user/Persona/EncontrarMédico/page/StepSection";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import DownloadSection from "../components/user/Persona/EncontrarMédico/page/Download";

const FindDoctor = () => {
  return (
    <main>
      <Header />
      <DownloadSection />
      <section className=" rounded-lg p-12 text-center bg-gray-100">
        <StepSection
          sec="1"
          title="Consulta por EPS"
          description="Usa la red de prestadores de salud de tu EPS y consulta con el médico de tu elección."
          videoUrl="https://medicall24.com.co/wp-content/uploads/2024/07/PASOS-EPS-WEB-PACIENTES-1.mp4"
        />

        <StepSection
          sec="2"
          title="Consulta Particular"
          description="Contacta un médico y paga de forma particular."
          videoUrl="https://medicall24.com.co/wp-content/uploads/2024/07/PASOS-PARTICULAR-WEB-PACIENTES-1.mp4"
        />
      </section>
      <Footer />
    </main>
  );
};

export default FindDoctor;
