import cam from "../../../../../assets/camitemverde.png";
import { CheckCircle, PillBottle, Tablets } from "lucide-react";

const infoPlan = () => {
  return (
    <main className="mx-auto flex flex-row md:flex-col sm:flex-col items-center justify-center gap-8 py-16 sm:py-4">
      <div className="flex flex-row sm:flex-col items-center mt-5 gap-16">
        <div>
          <div className="space-y-2 mb-12 flex flex-col items-center">
            <p className="text-5xl sm:text-4xl font-regular text-center text-pink-600">
              Planes de
            </p>
            <p className="text-6xl sm:text-5xl font-extrabold text-center text-pink-600">
              Telemedicina
            </p>
            <p className="text-5xl sm:text-5xl font-regular text-center text-pink-600">
              para personas
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full sm:w-96 flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative w-full h-60 overflow-hidden rounded-3xl">
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                >
                  <source
                    src="https://medicall24.com.co/wp-content/uploads/2025/01/Jornada-de-telemedicina.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>
          <div className="flex justify-center items-center mb-4">
                  <img
                    src="https://medicall24.com.co/wp-content/uploads/2025/01/camplan.png"
                    alt="camara"
                    className="w-12 h-auto mb-0 mr-4"
                  />
                
                  <span className="text-gray-600 text-3xl font-bold">
                    Plan Basic
                  </span>
                </div>
                <p className="text-2xl text-center mt-2 sm:text-3xl font-semibold text-pink-600">
                  Consultas Ilimitadas
                </p>
            <div className="flex justify-center sm:flex-col gap-6 mt-2 sm:mt-6 sm:gap-2">
              {/* Primer icono con texto */}
              <div className="flex items-center">
                <img src={cam} alt="cam" className="w-5 h-auto" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Medicina General
                </span>
              </div>

              {/* Segundo icono con texto */}
              <div className="flex items-center">
                <img src={cam} alt="cam" className="w-5 h-auto" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Psicología
                </span>
              </div>

              {/* Tercer icono con texto */}
              <div className="flex items-center">
                <img src={cam} alt="cam" className="w-5 h-auto" />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  Pediatría
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-6">
            <div className="flex items-center ">
            <p className="text-lg text-center text-gray-600 font-semibold mt-6 mr-2">
              Desde
            </p>
            
            </div>
            <div className="flex items-center">
            <p className="text-6xl text-center text-pink-600 font-extrabold">
              $15.990  
            </p>
            <span className="text-3xl text-pink-600 font-semibold ml-4">COP</span>
            </div>
       
          </div>
          <span className="text-gray-700 text-sm mt-2">
                Valor promedio por usuario al mes
              </span>
          <div className="space-y-3 mt-0 w-4/5">
        

            {/* Ítem con íconos de medicamentos */}
            {/* <div className="flex flex-row items-center space-x-2 mt-6">
              <div className="flex items-center space-x-0">
                <PillBottle className="text-pink-600 w-5 h-5 md:w-8 md:h-8 flex-shrink-0" />
                <Tablets className="text-pink-600 w-3 h-3 md:w-6 md:h-6 flex-shrink-0" />
              </div>
              <span className="text-gray-700 text-sm">
              Incluye medicamentos con entrega a domicilio
                            </span>
            </div> */}

            {/* Último ítem con CheckCircle */}
            {/* <div className="flex items-center space-x-5">
              <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0" />
              <span className="text-gray-700 text-sm">
                Incluye Póliza de Accidentes Personales con cobertura hasta por
                <span className="text-sm ml-1">
                  $20,000,000 COP
                </span>
              </span>
            </div> */}
          </div>

          <div className="flex flex-col w-2/3 mb-8 sm:mb-0">
            <button
              className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-700 hover:border-2 hover:border-pink-600 duration-300 appearance-none block h-10 bg-pink-600 text-center rounded-xl font-medium text-2xl mt-12 text-white"
              onClick={() => {
                document.getElementById("planp")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default infoPlan;
