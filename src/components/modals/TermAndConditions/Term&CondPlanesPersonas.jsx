import PropTypes from "prop-types";
const TermCondPlanesPersonas = ({ onCloseTerm }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onCloseTerm}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-pink-600 text-white text-lg font-bold rounded-t-lg uppercase text-center">
          Términos y condiciones del servicio
        </div>
        <div className="px-16 py-4 max-h-96 overflow-y-auto">
          <h1 className="text-xl font-bold text-gray-700 mb-6 text-center uppercase"></h1>
          <p className="text-sm text-gray-900 mb-4">
            Estos son los Términos y Condiciones para la prestación de los
            servicios ofertados y comercializados por MEDICALL24 SAS (en
            adelante LA COMPAÑIA), por favor lea cuidadosamente.
          </p>
          <p className="text-sm text-gray-900 mb-4">
            Al hacer clic en la casilla “acepto los términos y condiciones”,
            usted habrá manifestado su aceptación sin restricciones de este
            aviso legal y, por lo tanto, de los Términos y Condiciones acá
            establecidos. Si usted no acepta los Términos y Condiciones
            establecidos aquí, usted no podrá acceder ni utilizar los servicios
            ofertados y comercializados por LA COMPAÑIA. Si usted en cualquier
            momento no estuviera de acuerdo total o parcialmente con estos
            términos y condiciones, deberá abstenerse inmediatamente de
            contratar el servicio
          </p>
          <p className="text-sm text-gray-900 mb-4">
            {`LA COMPAÑÍA puede modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Usted deberá leer lo contenido en este instrumento legal periódicamente para revisar las normativas aquí establecidas, debido a que las mismas son obligatorias para usted. Los términos "usted", "usuario", o, "paciente", tal como se usan aquí, se refieren a todas las personas o entidades (naturales o jurídicas) que compren o accedan a los servicios ofertados y comercializados por LA COMPAÑIA.`}
          </p>
          <p className="text-sm text-gray-900 mb-4">
            Los presentes Términos y Condiciones constituyen un acuerdo legal
            vinculante entre el usuario y LA COMPAÑÍA, y establecen las
            condiciones para acceder a los servicios ofertados y comercializados
            por LA COMPAÑÍA; por lo anterior, es su obligación como usuario leer
            cuidadosamente los presentes Términos y Condiciones.
          </p>
          <h1 className="text-xl font-bold text-gray-700 mb-6 text-center">
            TÉRMINOS Y CONDICIONES DE ADQUISICIÓN DE PLANES DE TELEMEDICINA
          </h1>
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-left">
            DEFINICIONES{" "}
          </h3>
          <p className="text-sm text-gray-900 mb-4">
            <span className="font-bold"> Cliente tomador: </span> Grupo de
            personas naturales beneficiarias que el cliente tomador indica que
            podrán acceder a algunos de los servicios que contempla los planes
            de telemedicina que se contraten, los cuales se detallan en las
            condiciones de prestación de cada plan ofertado.
          </p>
          <p className="text-sm text-gray-900 mb-4">
            <span className="font-bold"> Usuarios beneficiarios: </span> Grupo
            de personas naturales beneficiarias que el cliente tomador indica
            que podrán acceder a algunos de los servicios que contempla los
            planes de telemedicina que se contraten, los cuales se detallan en
            las condiciones de prestación de cada plan ofertado.
          </p>
          <p className="text-sm text-gray-900 mb-4">
            <span className="font-bold"> Vigencia: </span>Vigencia: Período
            durante el cual el cliente tomador y los usuarios beneficiarios,
            tienen derecho a recibir los servicios de telemedicina descritos en
            cada plan ofertado. Para este caso el período de vigencia activa
            estará determinado por cada plan de telemedicina que el cliente
            tomador adquiera, y comenzará a regir 24 horas después del día de
            contratación del servicio.
          </p>
          <h3 className="text-xl font-bold text-gray-700 mb-6 text-left">
            GENERALIDADES{" "}
          </h3>
          <p className="text-sm text-gray-900 mb-4">
            MEDICALL24 no es un Prestador de Salud ni de servicios conexos, por
            lo tanto, no tiene responsabilidad alguna sobre la prestación de los
            servicios de salud. LA COMPAÑÍA solo pone a disposición del usuario
            el acceso al servicio a través de la App MEDICALL24, que es un canal
            de comunicación sincrónico que garantiza la realización de
            videollamadas en tiempo real, para que los usuarios sean atendidos
            por los Prestadores de Salud que hacen parte de nuestra Alianza
            Comercial Estratégica, los cuales están debidamente habilitados por
            el Ministerio de salud de Colombia. <a href="/aliados" target="_blank" className="text-pink-600 underline font-semibold">Consulte nuestros Aliados aquí.</a>
          </p>{" "}
          <p className="text-sm text-gray-900 mb-4">
            La utilización del servicio por parte del usuario, implica su
            aceptación expresa y su adhesión a los presentes términos y
            condiciones y se sujeta a ellos y a las modificaciones que pudieran
            sufrir.
          </p>{" "}
          <p className="text-sm text-gray-900 mb-4">
            Los planes de Telemedicina brindan acceso durante todos los meses de
            su vigencia, a consultas y valoraciones de manera ilimitada con los
            profesionales de la salud y especialistas que se ofertan en cada
            plan. Los profesionales de la salud y especialistas estarán
            disponibles en el horario de 7:00 a.m. a 7:00 p.m. de lunes a
            domingo, con el propósito de atender citas virtuales a través de la
            App para dispositivos móviles MEDICALL24. Cada consulta tendrá una
            duración máxima de 30 minutos.
          </p>{" "}
          <p className="text-sm text-gray-900 mb-4">
            La App de Telemedicina MEDICALL24 es la aplicación que el usuario
            deberá utilizar para solicitar y gestionar sus citas. Los pasos para
            la solicitud de citas se enviarán al correo electrónico que se
            ingrese al momento de la compra, una vez el pago sea realizado con
            éxito. También puede ver los pasos para solicitar las citas entrando
            aquí.
          </p>{" "}
          <p className="text-sm text-gray-900 mb-4">
            La compra del plan de telemedicina da derecho a la prestación de los
            servicios que este incluya, de acuerdo con la oferta de servicios
            publicada por LA COMPAÑÍA.
          </p>
          <p className="text-sm text-gray-900 mb-4">
            El cliente tomador y los usuarios beneficiarios del plan de
            Telemedicina pueden ser valorados, diagnosticados y tratados con las
            recomendaciones y el plan de manejo apropiado según su
            sintomatología, de acuerdo con el criterio del profesional de la
            salud o especialista tratante.
          </p>
          <p className="text-sm text-gray-900 mb-4">
            El servicio de salud por Telemedicina será prestado por una IPS que
            actúa como un Prestador de Salud de Referencia, acorde a las normas
            vigentes que regulan la materia en Colombia. Los usuarios que
            soliciten el servicio desde la App para dispositivos móviles
            MEDICALL24, serán atendidos de acuerdo con la disponibilidad de
            agenda de los profesionales de la salud y especialistas del
            Prestador, teniendo la posibilidad de recibir atención de manera
            inmediata.
          </p>
          <p className="text-sm text-gray-900 mb-4">
            Para continuar con el pago del plan de telemedicina, se deberá
            realizar el registro del cliente tomador del servicio. Este
            procedimiento podrá realizarse una vez sean aceptados los términos y
            condiciones aquí descritos. Con este registro, el cliente tomador
            queda automáticamente registrada en la App de Telemedicina
            MEDICALL24, y podrá inscribir 3 usuarios adicionales como
            beneficiarios del plan adquirido. Los usuarios beneficiarios podrán
            recibir la atención en salud en las mismas condiciones que el
            cliente tomador. Para agregar los usuarios beneficiarios el cliente
            tomador deberá registrarlos en la opción correspondiente al momento
            de la compra del plan de telemedicina.
          </p>
        </div>
        {/* Footer con botones */}
        <div className="px-6 py-4 flex justify-end space-x-4 bg-gray-100 rounded-b-lg">
          <button
            onClick={onCloseTerm}
            className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermCondPlanesPersonas;

TermCondPlanesPersonas.propTypes = {
  onCloseTerm: PropTypes.func.isRequired,
};
