import { Handshake } from "lucide-react";

const ReactItemCarousel = ({ items, onSelect }) => { 

  return (
    <div className="p-8 sm:p-2 bg-gradient-to-b from-gray-100 to-pink-200 rounded-lg shadow-md min-h-screen flex items-center flex-col space-y-12">
        <div className="text-center mb-12 mt-12 space-y-4">
          <div className="flex justify-center items-center sm:flex-col space-x-4 sm:space-x-0">
            <Handshake className="text-pink-600" size={36} />
            <h2 className="text-4xl font-extrabold text-gray-700 tracking-tight">
              Aliados Comerciales
            </h2>
          </div>
        </div>    

      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 place-items-center">
      { items.length > 0 ? (
        items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-200 w-full h-[35rem] rounded-xl flex flex-col items-center shadow-lg space-y-8">
              <div className="w-full h-[17rem] sm:h-[12rem] relative overflow-hidden rounded-t-xl">
                <img src={item.cover || null} alt="Prestadores de salud" className="w-full h-full object-fit pointer-events-none select-none" />
              </div>
            <div className="flex flex-1 items-center sm:px-4">
            <p className="text-center text-xl font-semibold text-gray-700">
                {item.nombre_prestador}
              </p>
            </div>
            <div className="mt-auto pb-12">
            <button className="mt-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
            onClick={() => onSelect(item)}
            
            >
                Ver días disponibles
              </button>
            </div>
              </div>
        ))
        ) : (
          <p className="text-center text-gray-500">Cargando elementos...</p>
        )}
      </div>

    </div>
  );
};

export default ReactItemCarousel;
