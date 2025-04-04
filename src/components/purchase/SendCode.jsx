const SendCode = () => {
  return (
    <div className=" flex items-center justify-center h-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600">
          ¡Te has registrado exitosamente!
        </h1>
        <p className="mt-4 text-gray-700">
          Con este código tienes acceso a una consulta gratuita con el prestador
          X
        </p>

        <div className="bg-gray-100 rounded-lg py-4 px-6 mt-6">
          <p className="text-xl font-mono font-semibold text-gray-800">
            ABC123XYZ
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          El código ha sido enviado a tu correo.
        </p>

        <p className="mt-6 bg-pink-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-pink-700 transition-all focus:outline-none">
          Ahora puede continuar con el proceso de pago
        </p>
      </div>
    </div>
  );
};

export default SendCode;
