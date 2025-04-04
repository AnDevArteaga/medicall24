import "../styles/filterUser.css";
import Footer from "../components/common/Footer";
import HeaderStart from "../components/common/HeaderFilterUser";
import PlanesTelemedicina from "../components/user/Filtro/page/PlanesTelemedicina";
import PlanesEmpresa from "../components/user/Filtro/page/PlanesEmpresa";
import ServiciosBexa from "../components/user/Filtro/page/ServiciosBexa";
import Principal from "../components/user/Filtro/page/Principal";

const FilterUser = () => {
  return (
    <main>
      <HeaderStart />
      <section>
        <Principal />
      </section>
      <section>
        <PlanesTelemedicina className="z-10" />
      </section>
      <section>
        <PlanesEmpresa />
      </section>
      <section>
        <ServiciosBexa />
      </section>
      <Footer />
    </main>
  );
};

export default FilterUser;