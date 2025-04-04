const Card = (
  {
    meses,
    valorMes,
    promedioPorUsuario,
    descuento,
    mostrarDescuento,
    openModalCotize,
    className
  },
) => {
  return (
    <div className={`rounded-lg p-2 w-80 ${className}`}>
      {/* Elemento dinámico con meses */}
      <div className="flex items-center justify-center mb-2">
        <span className="text-orange-500 font-extrabold text-4xl">{meses}</span>
        <span className="ml-3 text-gray-700 font-extrabold text-3xl">
          meses
        </span>
      </div>

      <div className="border-2 border-gray-400 p-2 rounded-xl h-56 mb-4">
        {/* Tabla pequeña */}
        <div className="mb-4">
          <p className="font-bold text-xl text-center text-gray-800">
            Valor mensual del plan
          </p>

          <p className="font-extrabold text-pink-600 text-5xl text-center">
            ${valorMes}
          </p>
        </div>

        {/* Valor promedio por usuario */}
        {mostrarDescuento
          ? (
            <>
              {/* Descuento */}
              <div className="mb-2 flex flex-row justify-center items-center">
                <p className="text-gray-700 text-lg mr-3">Descuento del</p>
                <p className="font-bold text-orange-500 text-5xl">
                  {descuento}%
                </p>
              </div>

              <div className="mb-1 flex justify-center space-x-2 items-center px-2">
                <p className="text-gray-700 text-xs">
                  Valor promedio por usuario
                </p>
                <p className="font-bold text-2xl text-gray-700">
                  ${promedioPorUsuario}
                </p>
              </div>
            </>
          )
          : (
            <div className="mb-1 flex flex-col justify-center items-center px-2 mb-3">
              <p className="text-gray-700 text-xs my-0">
                Valor promedio por usuario:
              </p>
              <p className="font-extrabold text-5xl text-gray-600">
                ${promedioPorUsuario}
              </p>
            </div>
          )}
      </div>

      {/* Botón comprar */}
      <div className="flex items-center justify-center">
        <button
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-1 px-4 rounded-3xl w-3/5 transition duration-200 text-xl"
          onClick={() => {  

            openModalCotize({
              name: "Plan de Telemedicina",
              value: Number(valorMes.replace(/,/g, "")) * meses,
            });
          }}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Card;
