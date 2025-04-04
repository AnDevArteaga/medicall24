import paciente from '../../../../../assets/paciente2.jpg';
import disponible from '../../../../../assets/Disponible.png';

const DescargaSection = () => {
    return (
      <section className="flex flex-row sm:flex-col items-center justify-center bg-gray-50 px-32 py-12 space-x-24 sm:space-x-0 sm:px-12 sm:py-6">
        {/* Imagen a la izquierda */}
        <div className="w-full md:w-2/3">
          <img
            src={paciente}
            alt="Consulta médica"
            className="rounded-lg shadow-lg"
          />
            <div className="mt-6 flex items-center justify-center">
            <button onClick={() => {
            document.getElementById("find")?.scrollIntoView({ behavior: "smooth", block: "start" });}}
             className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-10 rounded-full shadow-md text-lg transition duration-300 md:text-base md:px-4 md:py-2">
              Mira el paso a paso
            </button>
          </div>
        </div>
  
        {/* Contenido a la derecha */}
        <div className="w-full md:w-2/3 mx-auto sm:mt-8">
          <h2 className="text-4xl md:text-center md:text-2xl sm:text-2xl sm:text-center font-bold text-gray-700 mb-4">
                App de Telemedicina <br /><span className='text-3xl'>MEDICALL24</span> 
          </h2>
          <p className="text-gray-700 md:text-center sm:text-center text-base md:text-sm mb-6">
            Ingresa y contacta a un médico desde la comodidad de tu hogar, sin
            filas, sin aglomeraciones, ni salas de espera.
          </p>
          <p className="text-pink-600 md:text-center sm:text-center font-bold text-lg mb-6">
            ¡Ahorrando tiempo y dinero!
          </p>
  
          {/* Botones */}
          <div className="flex items-center md:flex-col flex-row space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={disponible}
                alt="Google Play"
                className="w-60 md:w-32 md:mb-6"
              />
            </div>
            <a href="https://play.google.com/store/apps/details?id=com.devdvs.medicall.medicall24&pli=1" target='_blank'>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300">
              Descargar
            </button>
            </a>

          </div>
  
          {/* Botón inferior */}

        </div>
      </section>
    );
  };
  
  export default DescargaSection;
  