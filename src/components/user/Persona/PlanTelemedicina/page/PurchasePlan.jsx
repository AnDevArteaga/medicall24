import seis_meses from "@/assets/6PlanesGeneralPersonas.png";
import doce_meses from "@/assets/12PlanesGeneralPersonas.png";
import tres_meses from "@/assets/3PlanesGeneralPersonas.png";

const PurchasePlan = ({ handleOpenModalTerm, productos, handleOpenModalCotize }) => {
  console.log("productos", productos);
  return (
    <div className="flex flex-col items-center py-4 px-8 mb-16 bg-gray-200" id="planp">
      <div className="border-t-2 border-gray-200 w-1/2 mb-8"></div>
      <span className="mb-12 text-gray-600 sm:text-4xl font-semibold text-center text-4xl sm:text-center">
        El Plan Basic brinda cobertura para 4 usuarios
      </span>
      {/* Contenedor general */}
      <div className="flex flex-row sm:flex-col justify-center items-center gap-1 sm:gap-20 w-full px-4 sm:px-6">
                {/* Primera columna, solo en sm */}
          <div className="sm:flex sm:flex-col hidden sm:block sm:items-center sm:relative sm:mt-0 transform transition-transform duration-300 hover:scale-105">
          <img
            src={doce_meses}
            alt="12 meses"
            className="w-6/7 h-auto object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
            style={{ userSelect: "none", pointerEvents: "none" }}
          />
          <button className="w-3/5 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-700 hover:border-2 hover:border-pink-600 duration-300 appearance-none block h-10 bg-pink-600 text-center rounded-xl font-medium text-2xl mt-5 text-white"
           onClick={() =>
            handleOpenModalCotize(
              productos.find((product) => product.id_producto === 2),
            )}
          >
            Comprar
          </button>
        </div>

        
        
        {/* Columna izquierda */}
        <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
          <img
            src={seis_meses}
            alt="6 meses"
            className="w-5/6 sm:w-full h-auto object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
            style={{ userSelect: "none", pointerEvents: "none" }}
          />
          <button
            className="w-3/5 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-700 hover:border-2 hover:border-pink-600 duration-300 appearance-none block h-10 bg-pink-600 text-center rounded-xl font-medium text-2xl mt-5 text-white"
            onClick={() =>
              handleOpenModalCotize(
                productos.find((product) => product.id_producto === 4),
              )}
          >
              Comprar
          </button>
        </div>

        {/* Columna central */}
        <div className="flex flex-col sm:hidden items-center relative -mt-6 sm:mt-0 transform transition-transform duration-300 hover:scale-105">
          <img
            src={doce_meses}
            alt="12 meses"
            className="w-6/7 h-auto object-cover rounded-lg transform transition-transform duration-300 hover:scale-110"
            style={{ userSelect: "none", pointerEvents: "none" }}
          />
          <button className="w-3/5 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-700 hover:border-2 hover:border-pink-600 duration-300 appearance-none block h-10 bg-pink-600 text-center rounded-xl font-medium text-2xl mt-5 text-white"
           onClick={() =>
            handleOpenModalCotize(
              productos.find((product) => product.id_producto === 2),
            )}
          >
            Comprar
          </button>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
          <img
            src={tres_meses}
            alt="3 meses"
            className="w-5/6 sm:w-full h-auto object-cover rounded-lg "
            style={{ userSelect: "none", pointerEvents: "none" }}
          />
          <button className="w-3/5 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-700 hover:border-2 hover:border-pink-600 duration-300 appearance-none block h-10 bg-pink-600 text-center rounded-xl font-medium text-2xl mt-5 text-white"
             onClick={() =>
              handleOpenModalCotize(
                productos.find((product) => product.id_producto === 6),
              )}
          >
            Comprar
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center mt-12">
        {/* <p className="text-gray-700">
        Todos los planes incluyen los medicamentos con entrega a domicilio y una Póliza de Accidentes Personales con cobertura hasta por $20,000,000 COP.
        </p> */}
        <span
            className="cursor-pointer text-left mt-4 text-gray-600 text-base underline"
            onClick={() => handleOpenModalTerm()}
          >
            Aplican términos y condiciones.
          </span>
      </div>
    </div>
  );
};

export default PurchasePlan;
