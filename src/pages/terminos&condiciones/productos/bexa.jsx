const bexa = () => {
    return (
        <div>
           <div className="px-6 py-6 bg-pink-600 text-white text-lg font-bold uppercase text-center">
          Términos y condiciones del servicio
        </div>
            <div className="px-32 sm:px-8 py-4">
                <h1 className="text-xl font-bold text-gray-700 mb-6 text-center uppercase">
                </h1>
                <p className="text-sm text-gray-900 mb-4">
                    Estos son los Términos y Condiciones para la prestación de
                    los servicios ofertados y comercializados por MEDICALL24 SAS
                    (en adelante LA COMPAÑIA), por favor lea cuidadosamente.
                </p>
                <p className="text-sm text-gray-900 mb-4">
                    Al hacer clic en la casilla “acepto los términos y
                    condiciones”, usted habrá manifestado su aceptación sin
                    restricciones de este aviso legal y, por lo tanto, de los
                    Términos y Condiciones acá establecidos. Si usted no acepta
                    los Términos y Condiciones establecidos aquí, usted no podrá
                    acceder ni utilizar los servicios ofertados y
                    comercializados por LA COMPAÑIA. Si usted en cualquier
                    momento no estuviera de acuerdo total o parcialmente con
                    estos términos y condiciones, deberá abstenerse
                    inmediatamente de contratar el servicio.
                </p>
                <p className="text-sm text-gray-900 mb-4">
                    {`LA COMPAÑÍA puede modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos "usted", "usuario", o, "paciente", tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que compren o accedan a los servicios ofertados y comercializados por LA COMPAÑIA.`}
                </p>
                <p className="text-sm text-gray-900 mb-4">
                    Los presentes Términos y Condiciones constituyen un acuerdo
                    legal vinculante entre el usuario y LA COMPAÑÍA, y
                    establecen las condiciones para acceder a los servicios
                    ofertados y comercializados por LA COMPAÑÍA; por lo
                    anterior, es su obligación como usuario leer cuidadosamente
                    los presentes Términos y Condiciones.
                </p>
                <h1 className="text-xl font-bold text-gray-700 mb-6 text-center">
                    CONDICIONES PARA ACCEDER A LOS SERVICIOS DEL EXAMEN BEXA
                    PARA DETECTAR MASAS EN MAMA
                </h1>
                <p className="text-sm text-gray-900 mb-4">
                    La prestación de los servicios de salud que incluye el
                    Examen BEXA para Detectar Masas en Mama será realizada por
                    Prestadores de Salud habilitados por el Ministerio de salud
                    de Colombia, los cuales hacen parte de nuestra Alianza
                    Comercial Estratégica. LA COMPAÑÍA no es un Prestador de
                    Salud, por lo tanto, no tiene responsabilidad alguna sobre
                    la prestación de los servicios de salud que hacen parte del
                    Examen BEXA para Detectar Masas en Mama, los cuales, están a
                    cargo de los Prestadores de Salud que hacen parte de la
                    Alianza Comercial Estratégica.{" "}
                    <a
                        href="/aliados"
                        target="_blank"
                        className="text-pink-600 underline font-semibold"
                    >
                        Consulte nuestros Aliados aquí.
                    </a>
                </p>
                <p className="text-sm text-gray-900 mb-4">
                    El Examen BEXA para Detectar Masas en Mama será realizado en
                    las siguientes ciudades de Colombia:
                </p>
                <div className="grid w-1/4 sm:w-1/2 grid-cols-2 gap-2 font-bold mb-4">
                    {/* Encabezados */}
                    <div>Ciudad</div>
                    <div>Departamento</div>

                    {/* Datos */}
                    <div className="font-normal">Montería</div>
                    <div className="font-normal">Córdoba</div>
                </div>
                <p className="text-sm text-gray-900 mb-4">
                    Para continuar con el pago del Examen BEXA para Detectar
                    Masas en Mama, se deberá realizar el registro de la paciente
                    que será beneficiaria del servicio. Este procedimiento podrá
                    realizarse una vez sean aceptados los términos y condiciones
                    aquí descritos.
                </p>{" "}
                <p className="text-sm text-gray-900 mb-4">
                    Con este registro la paciente queda automáticamente
                    registrada en la App de Telemedicina MEDICALL24, que será la
                    aplicación que se deberá utilizar para solicitar y gestionar
                    las citas para el Examen BEXA para Detectar Masas en Mama.
                </p>{" "}
                <p className="text-sm text-gray-900 mb-4">
                    La dirección exacta donde se prestarán los servicios de
                    salud que incluye el Examen BEXA para Detectar Masas en
                    Mama, será enviada en la confirmación de la cita, una vez el
                    usuario realice los pasos de solicitud de cita que se
                    enviarán al correo electrónico que se ingrese al realizar el
                    pago. También puede consultar los pasos aquí.
                </p>{" "}
                <p className="text-sm text-gray-900 mb-4">
                    El Examen BEXA para Detectar Masas en Mama se realizará de
                    acuerdo con la disponibilidad de la agenda del Prestador de
                    Salud asignado al momento de la compra, que se le notificará
                    al correo electrónico que se ingrese al realizar el pago.
                </p>{" "}
                <p className="text-sm text-gray-900 mb-4">
                    La compra del Examen BEXA para Detectar Masas en Mama da
                    derecho a la realización de un examen, la valoración por un
                    médico general, la educación para que la paciente aprenda a
                    realizarse el auto examen de mama, y la realización de la
                    historia clínica de la atención y la entrega del reporte del
                    estudio. En caso de inasistencia de la paciente beneficiaria
                    del plan a la cita programada para realizar el examen, se
                    aplicará un cobro adicional por valor de $ 30.000 COP para
                    volver a programar la cita.
                </p>
            </div>
        </div>
    );
};

export default bexa;
