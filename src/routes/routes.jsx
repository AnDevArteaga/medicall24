import { Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import Compra from "../pages/comprarProducto.jsx";
import Bexa from "../pages/bexa.jsx";
import FindDoctor from "../pages/econtrarMedico.jsx";
import FilterUser from "../pages/filtroUsuarios.jsx";
import Empresas from "../pages/Empresas.jsx";
import PlanesTelemedicinaPersonas from "../pages/planesPersonas.jsx";
import Aliados from "../pages/aliados.jsx";
import TermCond from "../pages/terminos&condiciones/terminos&condiciones.jsx";
import RestrictedAccessTerm from "../components/NotFound/RestrictedAccessTerm.jsx";
import SendEmail from "../pages/sendEmail.jsx";
import PasosBexa from "../pages/pasosBexa.jsx";
import PruebaPage from "../pages/PruebaPage.jsx";



const AppRoutes = ({ codigosXProductos, productosClasificados }) => {
  return (
    <Routes>
      <Route path="/" element={<FilterUser />} />
      <Route
        path="/Examen-Bexa"
        element={
          <Bexa productos={productosClasificados?.examenBexa} type={'bexa'} codigosXProductos={codigosXProductos} />
        }
      />
      <Route path="/Consulta-Paciente" element={<FindDoctor />} />
      <Route
        path="/Planes-Telemedicina-Personas"
        element={<PlanesTelemedicinaPersonas productos={productosClasificados?.planesTelemedicina} type={'planesTelemedicinaPersonas - planesTelemedicinaPersonasSimulado'} />}
      />
      <Route path="/empresas" element={<Empresas />} />
      <Route path="/sendEmail" element={<SendEmail />} />
      <Route path="/compra" element={<Compra />} />
      <Route path="/prueba" element={<PruebaPage />} />
      <Route path="/aliados" element={<Aliados />} />
      <Route path="/terminos-y-condiciones/:producto" element={<TermCond />} />
      <Route
        path="/terminos-y-condiciones"
        element={<RestrictedAccessTerm />}
      />
      <Route path="/pasos-bexa/:id_aliado" element={<PasosBexa />} />
    </Routes>
  );
};

export default AppRoutes;

AppRoutes.propTypes = {
  codigosXProductos: PropTypes.array,
  productosClasificados: PropTypes.object
};
