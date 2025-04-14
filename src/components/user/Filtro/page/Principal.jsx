import { Minus } from "lucide-react";
import video from "../../../../assets/telemedicina.mp4";

const Principal = () => {
  return (
    <div className="flex flex-row items-center min-h-screen md:flex-col sm:flex-col bg-white px-0 py-4" // style={{

    >
      <div className="relative w-full h-screen md:h-1/2 md:mt-24 sm:h-1/2">
        {/* Contenedor que define la altura visible del video */}
        <div className="relative w-full md:w-3/3 h-[calc(110vh-50px)] sm:h-[calc(65vh-50px)] overflow-hidden mr-20">
          <video
            className="w-full h-auto"
            src={video}
            autoPlay
            loop
            muted
          >
          </video>
        </div>

        {/* Div que cubrirá la parte inferior del video */}
        <div className="absolute bottom-0 left-0 w-full h-0 bg-white"></div>
      </div>

      {/* Lado derecho: Contenido */}
      <div className="w-full flex flex-col items-center mt-10 md:mt-0 sm:mt-0 sm:px-10">
        {/* Imagen horizontal */}
        <img
          src="https://medicall24.com.co/wp-content/uploads/2025/01/Recurso-6mujeres.png"
          alt="Imagen horizontal"
          className="w-2/5 md:w-4/5 h-auto sm:w-4/5 mb-8"
        />

        {/* Títulos y descripciones */}
        <p className="text-5xl sm:text-4xl md:text-7xl font-extrabold text-center text-pink-600">
          Consultas médicas
        </p>
        <p className="text-5xl sm:text-5xl md:text-7xl font-extrabold text-center text-pink-600 mb-8">
          virtuales
        </p>

        <h2 className="text-2xl md:text-4xl sm:text-center font-medium text-pink-600">
          Desde cualquier zona del país
        </h2>
        <p className="text-lg text-gray-600 md:text-3xl sm:text-center font-semibold">
          Sin filas, sin aglomeraciones, ni salas de espera
        </p>
        <p className="text-gray-600 text-lg md:text-3xl sm:text-center mb-8">
          Atención inmediata o programada{" "}
          <span className="font-semibold">¡Tú lo decides!</span>
          {" "}
        </p>

        <a href="/prueba">
        <button className="bg-orange-600 md:text-4xl sm:text-sm text-2xl text-white py-2 px-16 rounded-3xl shadow-md transition-all duration-300 hover:bg-orange-500 hover:scale-105 mb-8">
          Pide una consulta gratis
        </button>
        </a>
        <a
          href="/Consulta-Paciente"
          className="bg-pink-600 text-2xl text-white md:text-4xl sm:text-sm py-2 px-20 rounded-3xl shadow-md transition-all duration-300 hover:bg-pink-500 hover:scale-105"
        >
          <button>Mira el paso a paso</button>
        </a>

        {/* Caja con íconos de tiendas */}
        <div className="flex justify-between items-center w-full max-w-md bg-white py-8 px-4 rounded-b-xl">
          {/* Logo de Play Store */}
          <a
            href="https://play.google.com/store/apps/details?id=com.devdvs.medicall.medicall24"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center space-x-2">
              <img
                src="https://medicall24.com.co/wp-content/uploads/2025/01/Recurso-1logosStore.png"
                alt="Play Store"
                className="w-48 md:w-60 h-auto"
              />
            </div>
          </a>
          <div className="transform rotate-90">
            <Minus className="text-gray-400 w-10 h-10" />
          </div>
          {/* Logo de App Store */}
          <a
            href="https://apps.apple.com/co/app/medicall24/id6661032000"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center space-x-2">
              <img
                src="https://medicall24.com.co/wp-content/uploads/2025/01/Recurso-2logosStore.png"
                alt="App Store"
                className="w-48 md:w-60 h-auto"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Principal;
