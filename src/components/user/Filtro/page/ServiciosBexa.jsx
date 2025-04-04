import bexa6 from "../../../../assets/bexa6.png";

const ServiciosBexa = () => {
  return (
    <main
      className="mx-auto py-6 sm:px-6 flex items-center"
      style={{
        backgroundImage:
          "url('https://medicall24.com.co/wp-content/uploads/2025/01/bexa5.png')",
        backgroundSize: "cover",
      }}
    >
      {/* Contenedor principal */}
      <div className="w-full flex justify-end mr-24 sm:mr-0">
        <div className="bg-white/90 p-8 rounded-xl max-w-xl w-full flex flex-col items-center space-y-6 transform -translate-x-10 md:translate-x-0 sm:translate-x-0 md:max-w-lg">
          {/* Títulos */}
          <div>
            <p className="text-5xl sm:text-4xl font-regular text-center text-gray-500">
              Examen{" "}
              <span className="text-6xl sm:text-5xl font-bold text-center text-gray-500">
                Bexa
              </span>{" "}
            </p>

            <p className="text-3xl sm:text-xl text-center text-gray-600 mt-6 mb-4">
              Para detectar masas en mama
            </p>
            <p className="text-3xl sm:text-xl font-semibold text-center text-gray-600">
            Sin dolor, sin radiación, con resultados inmediatos
            </p>
          </div>

          {/* Imagen */}
          <div className="w-full sm:w-72 h-auto overflow-hidden rounded-lg">
            <img
              src={bexa6}
              alt="Examen Bexa"
              className="w-5/6 h-full object-cover"
              style={{ objectPosition: "center top" }}
            />
          </div>

          {/* Botones */}

          <div className="flex flex-col w-2/3 space-y-8">
            <a
              href="/Examen-Bexa"
              className="transition ease-in-out sm:text-xl delay-100 hover:-translate-y-1 hover:scale-110 hover:font-bold hover:bg-pink-600 hover:text-white hover:border-b-2 hover:border-pink-500 duration-300 appearance-none block h-10 bg-transparent border-2 border-pink-600 text-center rounded-xl font-medium text-2xl text-pink-600"
            >
              <button>Mas información</button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiciosBexa;
