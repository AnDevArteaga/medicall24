import Header from "../components/common/Header";
import MainContent from "../components/user/Persona/ExamenBexa/page/Main";
import Footer from "../components/common/Footer";
import PropTypes from "prop-types";
import HandleTestimony from "../components/testimonies/handleTestimony"
import Aliados from "../components/user/Persona/ExamenBexa/page/AliadosBexa"


const Index = ( {productos, codigosXProductos} ) => {
  console.log("productos", productos);
  console.log("codigosXProductos", codigosXProductos);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <MainContent codigosxproductos={codigosXProductos} productos={productos} />
        <Aliados />
        <HandleTestimony />        
            <Footer /> 
    </div>
  );
};

export default Index;

Index.propTypes = {
  productos: PropTypes.array,
  codigosXProductos: PropTypes.array
};