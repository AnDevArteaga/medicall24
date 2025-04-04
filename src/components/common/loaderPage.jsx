import "../../styles/loaderPage.css";
import loaderIcon from "../../assets/SVG/icoLogo.svg" // Importa tu SVG

const AnimatedLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={loaderIcon} alt="Cargando..." className="loader" />
    </div>
  );
};

export default AnimatedLoader;