import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TermsModal = ({ isOpenTerm, onCloseTerm, NextToConfirm }) => {
  const [accept, setAccept] = useState(false);

  const handleChange = (e) => {
    setAccept(e.target.checked);
    // console.log("checked", accept);
  };

  useEffect(() => {
    if (!isOpenTerm) {
      setAccept(false);
    }
  }, [isOpenTerm]);

  if (!isOpenTerm) return null;

  return (
    <div className="flex items-center justify-center h-auto">
      {/* Modal */}
      {isOpenTerm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            {/* Encabezado */}
            <div className="px-6 py-4 bg-pink-600 text-white text-lg font-bold rounded-t-lg">
              TÉRMINOS Y CONDICIONES DE USO Y POLÍTICA DE PRIVACIDAD DE LOS
              CANALES VIRTUALES DE MEDICALL24 SAS
            </div>

            {/* Contenido */}
            <div className="px-6 py-4 max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-700">
                Estos son los Términos y Condiciones de Uso de los CANALES
                VIRTUALES producidos, suministrados y controlados por MEDICALL24
                SAS (en adelante LA COMPAÑIA), los cuales incluyen los
                siguientes:{" "}
                {`i) Plataforma web para prestadores de salud denominada “Panel Web”; ii) Aplicación para dispositivos móviles denominada "App MEDICALL24", y iii) Página web con dirección www.medicall24.com.co; por favor lea cuidadosamente.`}
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Al hacer clic en la casilla “acepto término y condiciones”,
                usted habrá manifestado su aceptación sin restricciones de este
                aviso legal y, por lo tanto, de los Término y Condiciones de uso
                acá establecidas. Si usted no acepta los Términos y Condiciones
                de Uso establecidos aquí, usted no podrá acceder ni utilizar los
                servicios de los CANALES VIRTUALES de LA COMPAÑIA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                LA COMPAÑÍA puede modificar estos Términos y Condiciones de Uso
                en cualquier momento sin previo aviso. Usted deberá leer lo
                contenido en este instrumento legal periódicamente para revisar
                las normativas aquí establecidas, debido a que las mismas son
                obligatorias para usted. Los términos {`"usted"`}, o,{" "}
                {`"usuario"`}{" "}
                tal como se usan aquí, se refieren a todas las personas o
                entidades (naturales o jurídicas) que accedan a los CANALES
                VIRTUALES de LA COMPAÑÍA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Los Términos y Condiciones de Uso generales que a continuación
                se establecen, regulan el uso de los CANALES VIRTUALES de LA
                COMPAÑÍA. Si usted no está de acuerdo con estos Términos y
                Condiciones de Uso, le solicitamos abstenerse de utilizar estos
                CANALES VIRTUALES de LA COMPAÑÍA, ya que su uso de cualquier
                forma, indicará que usted acepta tácitamente estos Términos y
                Condiciones.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                INTRODUCCIÓN
              </h1>
              <p className="text-sm text-gray-700">
                Los presentes Términos y Condiciones de Uso de los CANALES
                VIRTUALES de LA COMPAÑÍA se publican con el fin de informar a
                todos los usuarios, que LA COMPAÑÍA, ha puesto a su disposición
                la los CANALES VIRTUALES con la finalidad de realizar
                transacciones y gestionar sus servicios de manera ágil y segura.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Los presentes Términos y Condiciones de Uso constituyen un
                acuerdo legal vinculante entre el usuario de los CANALES
                VIRTUALES y LA COMPAÑÍA, y establecen las condiciones de su uso.
                Por lo anterior, es su obligación como usuario de los CANALES
                VIRTUALES de LA COMPAÑÍA leer cuidadosamente los presentes
                Términos y Condiciones de Uso. Debe tener en cuenta que, si
                decide no aceptarlos, no podrá acceder ni utilizar los servicios
                de los CANALES VIRTUALES de LA COMPAÑÍA; por lo anterior, al
                hacer Click en la casilla “acepto los Término y Condiciones de
                Uso”, habrá manifestado su aceptación expresa, sin
                restricciones, reservas ni modificaciones a este Aviso Legal y
                por lo tanto a los Términos y Condiciones de Uso acá
                establecidos.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                FUNCIONES DE LOS CANALES VIRTUALES.
              </h1>
              <p className="text-sm text-gray-700">
                Los CANALES VIRTUALES de LA COMPAÑÍA brindan acceso a los
                usuarios que cumplen con determinados roles, como lo son: rol
                paciente, rol médico y rol prestador de salud. Los CANALES
                VIRTUALES de LA COMPAÑÍA, permiten a los usuarios la interacción
                con diversas funcionalidades, como por ejemplo: i) agregar
                contenido de texto, imágenes y videos a su cuenta; ii) opinar
                sobre el contenido que le gusta, que no le gusta, o que le
                interesa de otros usuarios; iii) editar y personalizar su
                perfil; iv) realizar solicitudes de citas médicas por consulta
                externa, ya sea que estas se gestionen a través de la EPS del
                paciente o de forma particular; v) dar respuesta a las
                solicitudes de citas por consulta externa por parte del
                prestador de salud habilitado; vi) recaudar cuotas moderadoras;
                vii) recaudar el valor de las consultas particulares; viii)
                brindar atención médica para las citas de consulta externa bajo
                la modalidad de telemedicina, que son realizadas por los médicos
                de los prestadores de salud habilitados; ix) brindar atención
                médica urgente bajo la modalidad de telemedicina a los pacientes
                que consulten con médicos disponible en la urgencia del
                prestador de salud habilitado; x) registrar la información en
                salud de los pacientes en la historia clínica, luego de
                finalizar la atención médica; xi) descargar historias clínicas,
                fórmulas de medicamentos, órdenes médicas y certificados de
                incapacidad.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                La atención médica es responsabilidad del prestador de salud que
                brinde el servicio y este debe estar habilitado por el órgano de
                control competente, acorde a lo estipulado por las normas
                legales que regulan la materia en Colombia. El servicio de
                telemedicina que se brinda a través de los CANALES VIRTUALES de
                LA COMPAÑÍA, se realiza mediante videollamadas en tiempo real
                (comunicación sincrónica), y permite que los médicos de un
                prestador de salud atiendan eficientemente a sus pacientes,
                pudiendo emitir diagnósticos e instaurar tratamientos, y dejar
                registro de la atención en la clínica del paciente.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El contenido publicado por los usuarios en los CANALES VIRTUALES
                de LA COMPAÑÍA, es informativo; por lo tanto, ni LA COMPAÑÍA ni
                su(s) autor(es), se responsabilizan del entendimiento, la
                interpretación y el uso de este contenido por parte del usuario,
                pues la veracidad de la información contenida y publicada, es de
                exclusiva responsabilidad del usuario que la genera.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                LA COMPAÑÍA se reserva la facultad de modificar o eliminar el
                contenido publicado en los CANALES VIRTUALES, por sí misma o
                mediante un tercero autorizado, sin notificar previamente al
                usuario.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Con la aceptación de los Términos y Condiciones de Uso de los
                CANALES VIRTUALES de LA COMPAÑÍA, el usuario se obliga a usar
                los CANALES VIRTUALES conforme a la normatividad que rige la
                materia y a los Términos y Condiciones de Uso que aquí se
                contemplan, siempre en observancia de la ley, la moral, la
                confidencialidad y las buenas costumbres; así mismo, se
                compromete a no destinar su uso a fines ilícitos o inmorales, o
                en detrimento de los interés de terceros o de LA COMPAÑÍA.
              </p>

              <h1 className="text-lg font-bold text-gray-700 mt-4">
                LIMITACIÓN DE RESPONSABILIDADES MÉDICAS.{" "}
              </h1>
              <p className="text-sm text-gray-700">
                El contenido disponible a través de los CANALES VIRTUALES de LA
                COMPAÑÍA no sustituye el criterio médico del profesional de la
                salud llamado a realizar consultas mediante el uso de la
                telemedicina. LA COMPAÑÍA, por sí misma, no provee servicios
                médicos, ni de diagnóstico, ni de tratamientos. El contenido
                publicado en los CANALES VIRTUALES de LA COMPAÑÍA es de
                exclusiva responsabilidad del usuario que lo genera, por lo
                tanto, usted sabrá determinar el nivel de confianza en el mismo.
                Los usuarios registrados en los CANALES VIRTUALES de LA COMPAÑÍA
                con el rol de médicos, son los únicos que pueden proveer
                servicios médicos de diagnóstico y tratamiento para pacientes,
                siempre y cuando estén vinculados en nuestro sistema a un
                prestador de salud.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                REQUISITOS PARA EL ACCESO
              </h1>
              <p className="text-sm text-gray-700">
                LA COMPAÑÍA no garantiza el acceso permanente e ininterrumpido a
                los CANALES VIRTUALES, ni que este acceso sea libre de errores,
                o que el servicio o el servidor que lo pone a disposición, estén
                libres de virus u otros agentes nocivos. Cuando el usuario
                accede a los CANALES VIRTUALES de LA COMPAÑÍA, será su
                responsabilidad tomar las medidas pertinentes para evitar y/o
                corregir los virus u otros agentes nocivos existentes en su
                dispositivo.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El usuario será el único responsable del uso de la información
                contenida en los CANALES VIRTUALES de LA COMPAÑÍA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Los CANALES VIRTUALES de LA COMPAÑÍA solo funcionaran si el
                dispositivo del USUARIO está conectado a internet.{" "}
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El correcto funcionamiento de los CANALES VIRTUALES de LA
                COMPAÑÍA depende de la estabilidad y velocidad de internet y/o
                de la red de datos a la cual está conectado el dispositivo del
                USUARIO.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                LA COMPAÑÍA puede permitir el acceso a otros sitios de internet
                a través de vínculos contenidos en los CANALES VIRTUALES, pero
                esto no implica ninguna relación contractual o comercial entre
                LA COMPAÑÍA y el operador del sitio vinculado. LA COMPAÑÍA no es
                responsable del contenido de ninguno de estos sitios y no
                garantiza los productos o servicios ofrecidos por el sitio
                vinculado; por lo tanto, cualquier transacción que el usuario
                lleve a cabo con estos sitios de internet, se realiza única y
                exclusivamente bajo su propia responsabilidad y autonomía y el
                proveedor del servicio del sitio vinculado. LA COMPAÑÍA no es
                responsable por ningún tipo de transmisión recibida desde
                cualquier sitio vinculado.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                MARCO LEGAL
              </h1>
              <p className="text-sm text-gray-700">
                El marco legal que regirá para los productos y servicios de los
                CANALES VIRTUALES de LA COMPAÑÍA, será el estipulado para el
                adecuado tratamiento de los datos personales que sean
                incorporados o circulen, incluyendo los datos de carácter
                sensible, de conformidad con lo establecido en la legislación
                vigente de Habeas Data y por lo previsto en la Ley Estatutaria
                1581 de 2012, Decreto Único Reglamentario del Sector Comercio,
                Industria y Turismo- Decreto 1074 de 2015, la resolución 2654 de
                2019, y las Políticas de Privacidad y Tratamiento de Datos
                Personales adoptadas por LA COMPAÑÍA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El contenido de los Términos y Condiciones de Uso aquí
                previstos, puede ser objeto de modificaciones o actualizaciones,
                razón por la que será obligación del usuario revisar
                periódicamente el contenido de los mismos con el fin de
                mantenerse informado frente a los cambios que se puedan
                presentar. Por lo anterior, mediante la puesta en conocimiento
                de los Términos y Condiciones de Uso de los CANALES VIRTUALES de
                LA COMPAÑÍA, se entenderá cumplido el deber de informar al
                usuario.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                AUTORIZACIÓN DE USO DE LOS CANALES VIRTUALES
              </h1>
              <p className="text-sm text-gray-700">
                LA COMPAÑÍA, autoriza únicamente el uso de los CANALES
                VIRTUALES, sujeto a las reglas contenidas en el presente acuerdo
                de Términos y Condiciones de Uso, permaneciendo restringido su
                uso comercial o con cualquier otro fin diferente al autorizado.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El usuario se abstendrá de modificar, manipular, alterar,
                copiar, distribuir, transmitir, reproducir, licenciar, crear
                sitios web y aplicaciones para dispositivos móviles derivadas,
                vender o entregar la información recibida de los CANALES
                VIRTUALES de LA COMPAÑÍA en su dispositivo a un tercero; y en
                consecuencia asumirá los efectos legales si no llegare a cumplir
                con esta condición. Esta prohibición también incluye
                expresamente, sin limitarla, a la práctica de Screen Scraping o
                raspado de pantalla para obtener información, y el uso por parte
                de un tercero o en beneficio de un tercero. LA COMPAÑÍA no se
                hará responsable del mal uso que se haga de los CANALES
                VIRTUALES. El usuario se hará responsable de toda copia,
                emulación, alteración o modificación que afecte la integridad de
                LA COMPAÑÍA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El usuario garantizará a LA COMPAÑÍA que no usará los CANALES
                VIRTUALES para fines contrarios a la ley o a lo estipulado en el
                presente acuerdo de Términos y Condiciones de Uso. En caso de
                utilizarse, legitimará a LA COMPAÑÍA a desactivar e impedir que
                el usuario continúe ingresando a la aplicación y al contenido
                comercial del mismo, y a iniciar las acciones legales, si a ello
                hubiere lugar.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                La categoría de “usuario” se obtiene al momento de registrarse
                en los CANALES VIRTUALES de LA COMPAÑÍA, creando el vínculo
                contractual con LA COMPAÑÍA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                La categoría de usuario se perderá en los siguientes eventos: 1.
                Cuando el estado de la cuenta del usuario en los CANALES
                VIRTUALES de LA COMPAÑÍA, esté suspendida o cancelada. 2. En el
                evento en que se logre demostrar que existió suplantación de
                identidad. 3. En cualquier momento en que el usuario registrado
                realice alguna actuación considerada como violatoria de estos
                Términos y Condiciones de Uso, de la Política de Privacidad, o
                cualquier conducta contraria a la legislación colombiana, el
                orden público o las buenas costumbres.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                CREACIÓN DE USUARIO PARA EL ACCESO A LOS CANALES VIRTUALES DE LA
                COMPAÑÍA
              </h1>
              <p className="text-sm text-gray-700">
                El usuario de los CANALES VIRTUALES de LA COMPAÑIA entiende y
                acepta que, para hacer uso de los mismos, se requiere la
                creación de una cuenta que lo identifique como tal. Para
                efectuar el registro del usuario se deberá ingresar entre otros
                datos, la información de la identificación, los nombres y
                apellidos, el correo electrónico y una contraseña de uso
                personal e intransferible. El usuario garantiza la autenticidad
                y veracidad de todos aquellos datos personales e información que
                entregue para registrarse, y se compromete a completar el
                formulario de suscripción con el resto de datos personales que
                se le solicitará al registrarse a cualquiera de los CANALES
                VIRTUALES de LA COMPAÑIA, incluyendo el aporte de imágenes para
                personalizar el perfil de su cuenta.
              </p>
              <h2 className="text-lg font-bold text-gray-700 mt-4">
                Uso de la contraseña
              </h2>

              <p className="text-sm text-gray-700 mt-4">
                El usuario acepta que las contraseñas ingresadas al momento de
                su registro en los CANALES VIRTUALES de LA COMPAÑÍA, con la cual
                podrá iniciar sesión en su cuenta, son privadas e
                intransferibles, por lo que tendrá la obligación de custodia de
                las mismas, siendo el único responsable de las consecuencias
                derivadas del uso que otras personas o terceros hagan de ellas,
                por la falta del cumplimiento del deber de custodia de dichas
                contraseñas.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Por lo anterior, el usuario se compromete a informar a LA
                COMPAÑÍA sobre la pérdida o robo de su contraseña, del uso no
                autorizado de su contraseña por parte de terceros, o cualquier
                circunstancia que a su juicio deba ser conocida por LA COMPAÑÍA,
                a más tardar dentro del día hábil siguiente a tener conocimiento
                de tal situación, con el fin de evitar actos fraudulentos en
                contra de su propia persona, de LA COMPAÑÍA, o de terceros.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El usuario al hacer uso de su contraseña se obliga a abstenerse
                de realizar las siguientes acciones: a) acceder a documentos
                confidenciales o datos de salud de personas de las que no se
                encuentra legitimado por ley o por convención para hacerlo. b)
                suministrar información falsa a título personal o de su grupo
                familiar, así como omitir datos necesarios para la buena
                prestación del servicio y el registro clínico. b) dar un uso de
                los CANALES VIRTUALES de LA COMPAÑÍA contrario a la Ley, la
                moral y las buenas costumbres. c) realizar acciones tendientes a
                ocasionar daño o interrupción del servicio de los CANALES
                VIRTUALES de LA COMPAÑÍA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El usuario que viole cualquiera de las condiciones contenidas en
                este acuerdo de Términos y Condiciones de Uso, será responsable
                por los daños y perjuicios de cualquier naturaleza que pueda
                sufrir LA COMPAÑÍA, o cualquier tercero que resulte perjudicado
                por su actuación.
              </p>
              <h2 className="text-lg font-bold text-gray-700 mt-4">
                Obligaciones del Usuario
              </h2>

              <p className="text-sm text-gray-700 mt-4">
                El usuario se compromete a hacer uso de los CANALES VIRTUALES de
                LA COMPAÑÍA, de conformidad con la ley colombiana, a estos
                Términos y Condiciones de Uso, a la Política de Privacidad y a
                las demás instrucciones que sean puestas en su conocimiento por
                parte de LA COMPAÑÍA, así como de conformidad con el orden
                público, la moral y las buenas costumbres.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El usuario garantiza la autenticidad y veracidad de todos
                aquellos datos personales e información que entregue para
                completar el formulario de suscripción o registro. Así mismo, el
                usuario se compromete y se responsabiliza de mantener
                actualizada toda la información que haya entregado, permitiendo
                con ello prestar un mejor servicio por parte de LA COMPAÑÍA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Cuando el usuario inserte o incorpore cualquier información a
                los CANALES VIRTUALES de LA COMPAÑÍA, garantiza que la
                información es completa y veraz, que posee todos los derechos
                sobre la misma y que se encuentra autorizado para entregarla.
              </p>
              <p className="text-sm text-gray-700">
                El uso de los CANALES VIRTUALES de LA COMPAÑÍA únicamente se
                encuentra permitido para personas mayores de 18 años y para
                personas sin condiciones de incapacidad legal. Los menores de 18
                años de edad y las personas en condiciones de incapacidad legal,
                podrán usar los CANALES VIRTUALES siempre y cuando cuenten con
                la autorización de los padres o sus representantes legales. En
                ese sentido y por el principio de la buena fe, se entiende que
                la persona que está accediendo a los CANALES VIRTUALES de LA
                COMPAÑÍA es mayor de edad, no tiene condición de incapacidad
                legal, o está autorizada, monitorizada o acompañada por sus
                padres o representantes legales, razón por la que no existirá
                responsabilidad alguna para LA COMPAÑÍA, por las actuaciones del
                usuario.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                DERECHOS DE PROPIEDAD INDUSTRIAL E INTELECTUAL
              </h1>
              <p className="text-sm text-gray-700">
                Todas las marcas, nombres comerciales, signos distintivos,
                diseños industriales, modelos de utilidad, patentes, servicios,
                contenidos e informaciones de cualquier clase que aparecen en
                los CANALES VIRTUALES son propiedad de LA COMPAÑÍA, por lo que
                no podrán ser reproducidos, distribuidos, comunicados
                públicamente, transformados o modificados sin autorización
                expresa.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Por lo anterior, el usuario se abstendrá de obtener los
                contenidos de los CANALES VIRTUALES de LA COMPAÑÍA, empleando
                para ello medios o procedimientos distintos de los que, en
                algunos casos, se han puesto a su disposición o, en general, de
                los que se empleen habitualmente en internet siempre que, estos
                últimos, no entrañen un riesgo o daño o inutilización de los
                CANALES VIRTUALES de LA COMPAÑÍA y sus contenidos.
              </p>
              <p className="text-sm text-gray-700">
                En ningún caso se entenderá que el acceso y la navegación del
                usuario en los CANALES VIRTUALES de LA COMPAÑÍA, implica que LA
                COMPAÑÍA haya otorgado una autorización o haya renunciado,
                transmitido, cedido total o parcialmente sus derechos, ni la
                concesión de ningún derecho ni expectativa de derecho y en
                concreto, de la alteración, transformación, explotación,
                reproducción, distribución o comunicación pública sobre los
                mismos.
              </p>
              <p className="text-sm text-gray-700">
                En ningún caso se entenderá que el acceso y la navegación del
                usuario en los CANALES VIRTUALES de LA COMPAÑÍA, implica que LA
                COMPAÑÍA haya otorgado una autorización o haya renunciado,
                transmitido, cedido total o parcialmente sus derechos, ni la
                concesión de ningún derecho ni expectativa de derecho y en
                concreto, de la alteración, transformación, explotación,
                reproducción, distribución o comunicación pública sobre los
                mismos.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                DERECHOS DE AUTOR
              </h1>
              <p className="text-sm text-gray-700">
                Todo el contenido de cualquier clase que aparezca en los CANALES
                VIRTUALES de LA COMPAÑÍA, susceptible de ser objeto de derechos
                patrimoniales de autor, conforme a la Ley 23 de 1982 y demás
                normas que regulen esta materia, son propiedad de MEDICALL24
                SAS, por lo que no podrán ser reproducidos, distribuidos,
                comunicados públicamente, transformados, copiados o modificados
                sin autorización expresa.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Conforme a lo anterior, los CANALES VIRTUALES serán en todo
                momento de titularidad de LA COMPAÑÍA. El usuario no tendrá
                ningún derecho de dominio ni disposición sobre los CANALES
                VIRTUALES de LA COMPAÑÍA, por lo que no podrá realizar actos de
                disposición, gravámenes, licenciamientos, ni cesiones sobre
                ellos.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                En ningún caso se entenderá que el acceso y la navegación del
                usuario en los CANALES VIRTUALES de LA COMPAÑÍA, implica que LA
                COMPAÑÍA haya otorgado una autorización o haya renunciado,
                transmitido, cedido total o parcialmente sus derechos, ni la
                concesión de ningún derecho ni expectativa de derecho y en
                concreto, de la alteración, transformación, explotación,
                reproducción, distribución, copia o comunicación pública sobre
                los mismos.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                Respecto del contenido comercial sobre el cual el usuario tiene
                acceso, este será exclusivamente de los clientes de LA COMPAÑIA,
                por lo que los Licenciatarios, no se harán responsables del
                contenido comercial de sus clientes. La función de LA COMPAÑÍA
                solo se limitará a permitir el acceso comercial mediante los
                CANALES VIRTUALES.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                El Usuario se abstendrá de obtener los contenidos de los CANALES
                VIRTUALES de LA COMPAÑÍA empleando para ello medios o
                procedimientos distintos de los que, en algunos casos, se han
                puesto a su disposición o, en general, de los que se empleen
                habitualmente en internet, siempre que, estos últimos, no
                entrañen un riesgo, daño o inutilización de los CANALES
                VIRTUALES de LA COMPAÑÍA y sus contenidos.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                LA COMPAÑÍA, como titulares de los derechos patrimoniales de los
                CANALES VIRTUALES, se reservará el derecho de iniciar las
                acciones legales comerciales, civiles, penales o de cualquier
                clase, en contra del usuario que realicen actos contrarios a las
                reglas de derechos de autor contenidas en la ley o en el
                presente acuerdo de Términos y Condiciones de Uso.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                LIMITACIÓN DE RESPONSABILIDAD
              </h1>
              <p className="text-sm text-gray-700">
                El usuario utilizará los CANALES VIRTUALES bajo su exclusiva
                responsabilidad, teniendo en cuentas las siguientes
                circunstancias: • LA COMPAÑÍA garantiza al usuario que los
                servidores contarán con procedimientos de seguridad necesarios
                para evitar la pérdida, alteración o acceso de terceros a la
                información personal del usuario, sin embargo, cada situación
                deberá analizarse en particular, puesto que el acceso ilícito a
                la información podrá constituir un caso de fuerza mayor o caso
                fortuito, en caso de que los Licenciatarios cumplan con las
                garantías mínimas de seguridad. • LA COMPAÑÍA no será
                responsable de las destinaciones o transmisiones de dinero
                inválidas, fraudes y atentados a la seguridad de la información
                que se realicen por medio de las compañías proveedoras de
                internet. • Bajo ninguna circunstancia, LA COMPAÑÍA, sus
                clientes, patrocinadores, anunciantes o proveedores de bienes y
                servicios se harán responsables de manera enunciativa, de daños
                directos, indirectos, incidentales, especiales, consecuenciales,
                o de cualquier otra clase, que sufra el usuario o tercero, por
                la utilización indebida de los CANALES VIRTUALES, de cualquier
                información, producto, servicios y demás gráficos relacionados
                que se obtengan a través de los servicios ofrecidos por LA
                COMPAÑÍA, ya sea con fundamento contractual, extracontractual,
                negligencia, responsabilidad objetiva o de cualquier régimen.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                RESTRICCIONES Y PROHIBICIONES
              </h1>
              <p className="text-sm text-gray-700">
                El Usuario tendrá prohibido para sí o para terceras personas,
                autorizar la reproducción, copia, modificación o
                comercialización de los CANALES VIRTUALES de LA COMPAÑÍA y su
                contenido. El contenido de los CANALES VIRTUALES de LA COMPAÑÍA
                se extiende a textos, documentos, material audiovisual, imágenes
                gráficas, software, y sonidos en general, que genere la
                aplicación. Por lo anterior, el usuario bajo ninguna modalidad o
                circunstancia podrá explotar comercialmente, copiar, vender,
                distribuir, licenciar, ceder, o modificar el contenido de la
                aplicación. Tampoco podrá publicar el contenido de la aplicación
                en otras aplicaciones, blog´s o sitios web sin autorización
                previa, expresa y por escrito de LA COMPAÑÍA.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                También le estará prohibido al usuario la realización o
                promoción de actividades en la aplicación que sean contrarios a
                la ley, a las sanas costumbres, al orden público y a la moral.
              </p>

              <p className="text-sm text-gray-700 mt-4">
                Con carácter enunciativo y no limitativo, se describirán algunas
                conductas prohibidas para los usuarios:
              </p>

              <ul className="text-sm text-gray-700 mt-4">
                <li className="mt-4">
                  • Utilizar la aplicación para publicar contenido pornográfico,
                  explotación sexual en cualquiera de sus modalidades, actos de
                  racismo o apología del mismo, consumos de drogas, contenido de
                  propaganda política, estafa o cualquier actitud contraria a
                  las leyes de la República de Colombia y tratados
                  Internacionales de ius cogens.
                </li>
                <li className="mt-4">
                  • Publicar contenido contrario a las reglas establecidas en la
                  ley y en el presente acuerdo de Términos y Condiciones de Uso,
                  respecto a los derechos de autor y a la propiedad industrial,
                  así como cualquier acto de apología a la piratería o a la
                  realización de copias ilegales protegidas por las leyes
                  vigentes.
                </li>
                <li className="mt-4">
                  • Utilizar o fomentar el uso de los CANALES VIRTUALES de LA
                  COMPAÑÍA, destinados a violar la intimidad de las personas,
                  infringir la ley estatutaria de habeas data en cualquiera de
                  sus modalidades o enviar correos masivos o spam.
                </li>
                <li className="mt-4">
                  • Realizar o promover la modificación del contenido de la
                  aplicación, introducir de manera directa o indirecta virus,
                  gusanos, troyanos y, en general, cualquier actitud tendiente a
                  hackear el sistema y los ordenadores de los CANALES VIRTUALES
                  de LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  • En consecuencia, si LA COMPAÑÍA detecta cualquier contenido
                  que no guarde relación con el material de LA COMPAÑÍA, podrá
                  retirarlo de los CANALES VIRTUALES en cualquier momento y sin
                  previo aviso al usuario.
                </li>
              </ul>

              <h1 className="text-lg font-bold text-gray-700 mt-4">
                EXCLUSIÓN DE RESPONSABILIDADES Y GARANTÍAS
              </h1>

              <h3 className="text-lg font-bold text-gray-700 mt-4">
                Disponibilidad y continuidad
              </h3>

              <p className="text-sm text-gray-700 mt-4">
                Por las características y necesidades tecnológicas de los
                CANALES VIRTUALES de LA COMPAÑÍA es posible que se presenten
                problemas en la disponibilidad o continuidad en el acceso y uso
                de los servicios de la misma, así como la ocurrencia de fallas
                técnicas en los servidores de acceso a la red. Por lo anterior,
                el usuario entiende y acepta que frente a la ocurrencia de
                fallas en los CANALES VIRTUALES debido a la indisponibilidad del
                servicio por causas de fuerza mayor, errores en las redes
                telemáticas de transferencia de datos o por causas ajenas a la
                voluntad de LA COMPAÑÍA, ésta no será responsable por los daños
                y perjuicios de cualquier naturaleza que puedan generarse al
                usuario y en esa medida, el usuario exime a LA COMPAÑÍA de
                cualquier responsabilidad en relación con las consecuencias de
                la ocurrencia de este tipo de eventos.
              </p>

              <p className="text-sm text-gray-700 mt-4">
                El acceso a la información y servicios que prestan los CANALES
                VIRTUALES de LA COMPAÑÍA, tienen en principio una duración
                indefinida, pero la misma dependerá de la decisión de LA
                COMPAÑÍA en continuar con el servicio prestado a través de los
                CANALES VIRTUALES. No obstante lo anterior, el acceso a los
                CANALES VIRTUALES podrá suspenderse o terminarse en cualquier
                momento en caso de que se compruebe cualquier violación a los
                esquemas de seguridad informática, o en caso de que se verifique
                suplantación en la identidad del usuario. Por lo anterior, LA
                COMPAÑÍA no será responsable por el retiro de los CANALES
                VIRTUALES o suspensión de la prestación de los servicios a
                través de la misma.
              </p>
              <p className="text-sm text-gray-700 mt-4">
                En caso de que se pierda la calidad de usuario por cualquier
                causa, el usuario no podrá hacer uso de los CANALES VIRTUALES
                para consultar.
              </p>

              <h3 className="text-lg font-bold text-gray-700 mt-4">
                Exclusión de responsabilidad
              </h3>

              <p className="text-sm text-gray-700 mt-4">
                LA COMPAÑÍA no será responsable de los daños, pérdida de
                negocio, ingresos o beneficios, daño emergente, lucro cesante o
                de oportunidades de negocio, de ahorro de gastos y de
                desaparición o deterioro de datos, así como tampoco será en
                ningún caso responsable de: (a) Los costos, multas, sanciones,
                indemnizaciones, cargos, daños u honorarios que se deriven como
                consecuencia del incumplimiento por parte del usuario de sus
                obligaciones; (b) La violación del usuario de cualquier norma
                que pudiera resultar aplicable a causas o en relación con la
                utilización de los CANALES VIRTUALES, por lo tanto, el usuario
                es y será el único responsable de: (i) el uso que realice de los
                CANALES VIRTUALES; (ii) el cumplimiento íntegro de cualquier
                norma que pudiera resultar aplicable a causa o en relación con
                la utilización de los CANALES VIRTUALES, incluyendo, a título
                enunciativo pero no limitativo, las normas de uso de los CANALES
                VIRTUALES aquí contenidas, las disposiciones en materia de
                protección de datos, confidencialidad, secreto de las
                comunicaciones y derecho a la intimidad.
              </p>

              <h3 className="text-lg font-bold text-gray-700 mt-4">
                Virus y códigos maliciosos
              </h3>

              <p className="text-sm text-gray-700 mt-4">
                El usuario exime a LA COMPAÑÍA de cualquier responsabilidad por
                los daños y perjuicios de toda naturaleza que puedan ser
                causados por, o que puedan deberse a la presencia de virus u
                otros códigos maliciosos en los contenidos que puedan producir
                cualquier tipo de daños en el sistema informático, documentos
                electrónicos o ficheros de los usuarios, incluyendo a título
                meramente enunciativo y sin carácter limitativo, "virus
                informáticos", gusanos, "caballos de troya", errores en la
                funcionalidad y operatividad ("bugs"), "bombas de tiempo",
                "cancelbots", "Spyware", "phishing", "dialers", "hoaxes",
                "jokes" etc.
              </p>

              <h3 className="text-lg font-bold text-gray-700 mt-4">
                Uso ilícito
              </h3>

              <p className="text-sm text-gray-700 mt-4">
                LA COMPAÑÍA cuenta con normas y procedimientos, restricciones de
                acceso y uso a la información que garantizan que solamente
                personal altamente calificado e idóneo maneje las bases de datos
                o de archivos sensibles cumpliendo con los protocolos para el
                manejo de esta información.
              </p>

              <p className="text-sm text-gray-700 mt-4">
                Por lo anterior LA COMPAÑÍA garantiza que los CANALES VIRTUALES
                se manejarán con adecuados estándares de seguridad,
                confidencialidad de la información y confiabilidad, de manera
                que cada usuario pueda mantener la reserva de su información.
                Sin embargo, no se hace responsable del incumplimiento de
                cualquier norma aplicable en que puedan incurrir los usuarios en
                su acceso a los CANALES VIRTUALES y/o utilización de las
                informaciones contenidas en la misma. Tampoco se hace
                responsable del uso ilegítimo que terceras personas puedan hacer
                de la información allí contenida.
              </p>

              <h1 className="text-lg font-bold text-gray-700 mt-4">
                CLÁUSULA DE INDEMNIDAD A FAVOR DE LA COMPAÑÍA
              </h1>

              <p className="text-sm text-gray-700 mt-4">
                Por lo anterior LA COMPAÑÍA garantiza que los CANALES VIRTUALES
                se manejarán con adecuados estándares de seguridad,
                confidencialidad de la información y confiabilidad, de manera
                que cada usuario pueda mantener la reserva de su información.
                Sin embargo, no se hace responsable del incumplimiento de
                cualquier norma aplicable en que puedan incurrir los usuarios en
                su acceso a los CANALES VIRTUALES y/o utilización de las
                informaciones contenidas en la misma. Tampoco se hace
                responsable del uso ilegítimo que terceras personas puedan hacer
                de la información allí contenida.
              </p>

              <h1 className="text-lg font-bold text-gray-700 mt-4">
                LEGISLACIÓN Y JURISDICCIÓN
              </h1>

              <p className="text-sm text-gray-700 mt-4">
                Los presentes Términos y Condiciones de Uso se regirán por la
                Legislación colombiana, y la jurisdicción competente para
                conocer de cualquier demanda que el uso de los CANALES VIRTUALES
                de LA COMPAÑÍA suscite, será la de los Juzgados y Tribunales de
                la República de Colombia.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                NULIDAD E INEFICACIA DE LOS NUMERALES O CLÁUSULAS
              </h1>

              <p className="text-sm text-gray-700 mt-4">
                Si cualquier numeral o cláusula incluida en estos Términos y
                Condiciones de Uso fuese declarado, total o parcialmente, nulo o
                ineficaz, tal nulidad o ineficacia afectará tan sólo a dicha
                disposición o a la parte de la misma que resulte nula o
                ineficaz, subsistiendo los Términos y Condiciones de Uso en todo
                lo demás.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                NATURALEZA DE LA RELACIÓN COMERCIAL
              </h1>

              <p className="text-sm text-gray-700 mt-4">
                El usuario reconoce y acepta que por el solo hecho de utilizar
                los CANALES VIRTUALES de LA COMPAÑÍA y aceptar los Términos y
                Condiciones de Uso, no tendrá la calidad de socio, mandatario,
                agente, empleado o representante de LA COMPAÑÍA. Bajo ninguna
                circunstancia, el usuario podrá realizar actos a nombre de los
                Licenciatarios en representación directa ni indirecta.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                FUERZA MAYOR O CASO FORTUITO
              </h1>

              <p className="text-sm text-gray-700 mt-4">
                Salvo las obligaciones dinerarias, entre ellas, las de pago,
                ninguna parte será responsable por demoras o responsable por no
                cumplimiento de las obligaciones pactadas por caso fortuito o
                fuerza mayor, así como circunstancias imprevisibles o
                irresistibles, de manera enunciativa y o limitativa, actos de
                guerra o conflicto civil, desastres naturales, paros,
                revoluciones y demás que no cuenten con un margen de previsión
                por las partes.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                CLÁUSULA DE INTEGRACIÓN DE CONTRACTUAL
              </h1>

              <p className="text-sm text-gray-700 mt-4">
                Las partes acuerdan que los presentes Términos y Condiciones de
                Uso serán el acuerdo único y completo, por lo que se podrá tener
                como fuente de interpretación de la relación comercial y, en
                consecuencia, sustituye cualquier acuerdo previo, escrito o
                verbal que hayan estipulado las partes.
              </p>
              <h1 className="text-lg font-bold text-gray-700 mt-4">
                QUEJAS, SOLICITUDES O RECLAMOS
              </h1>

              <p className="text-sm text-gray-700 mt-4">
                En caso de que el usuario pretenda presentar una petición,
                queja, reclamo o solicitud, podrá enviarla por medio del
                siguiente link:{" "}
                <a href="https://medicall24.com.co/pqrs/">
                  https://medicall24.com.co/pqrs/
                </a>.
              </p>

              <h1 className="text-lg font-bold text-gray-700 mt-4">
                OBLIGACIONES DEL USUARIO
              </h1>

              <ul className="text-sm text-gray-700 mt-4">
                <li className="mt-4">
                  • Guardar confidencialidad y buen uso de su cuenta y clave
                  privada e intransferible de acceso a los CANALES VIRTUALES de
                  LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Ser el responsable de todas las transacciones realizadas a
                  través de su cuenta y clave privada e intransferible de acceso
                  a los CANALES VIRTUALES de LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Notificar por escrito debidamente suscrito a LA COMPAÑÍA
                  cualquiera de las siguientes situaciones:
                </li>
                <li className="mt-4 ml-3">
                  -	Pérdida o hurto de su cuenta o clave privada e
                  intransferible de acceso a los CANALES VIRTUALES.
                </li>
                <li className="mt-4 ml-3">
                  - Uso no autorizado de su cuenta o clave personal e
                  intransferible de acceso a los CANALES VIRTUALES.
                </li>
                <li className="mt-4 ml-3">
                  - Fallas, errores o hechos inusuales al recibir algún mensaje
                  en relación con una orden ejecutada por el usuario a través
                  del sistema electrónico, o que haya sido recibida y/o
                  ejecutada a través del mismo.
                </li>
                <li className="mt-4 ml-3">
                  - Anulación de órdenes no emitidas por el usuario, o de
                  impresiones o desacuerdos en la trasmisión de la información
                </li>
                <li className="mt-4">
                  •	Aceptar que la sesión de transacción no se cerrará hasta que
                  el usuario lo decida haciendo clic en el botón cerrar sesión.
                </li>
                <li className="mt-4">
                  •	Asumir la responsabilidad por las claves de acceso y las
                  cuentas de usuario que llegase a delegar.
                </li>
                <li className="mt-4">
                  •	Respetar la propiedad intelectual y derechos de autor sobre
                  cualquier signo distintivo, información, material o contenido
                  de los CANALES VIRTUALES de LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Aceptar los Términos y Condiciones de Uso que modifiquen o
                  deroguen las condiciones de acceso y uso de los CANALES
                  VIRTUALES de LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Será responsable del uso correcto de los CANALES VIRTUALES
                  de LA COMPAÑÍA, así como de la veracidad de los datos que
                  provea en el momento del registro de usuario.
                </li>
              </ul>

              <h1 className="text-lg font-bold text-gray-700 mt-4">
                EXIMENTES DE RESPONSABILIDAD
              </h1>

              <ul className="text-sm text-gray-700 mt-4">
                <li className="mt-4">
                  •	Publicidad de bienes o servicios no prestados directamente
                  por LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Intermitencia o suspensión del funcionamiento de los CANALES
                  VIRTUALES de LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Suspensión del usuario por causas no imputables a LA
                  COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Cambio sin previo aviso en el contenido de los CANALES
                  VIRTUALES de LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Enlaces o conexiones a otras páginas web que no sean de
                  propiedad de LA COMPAÑÍA.
                </li>
                <li className="mt-4">
                  •	Dar por terminado este servicio e impedir el acceso a los
                  CANALES VIRTUALES, cuando el usuario haya perdido dicha
                  calidad.
                </li>
              </ul>
            </div>

            {/* Footer con botones */}
            <div className="px-6 py-4 flex justify-between items-center bg-gray-100 rounded-b-lg">
            <label
            htmlFor="accept"
            className="flex items-center flex-1 cursor-pointer"
          >
            <input
              type="checkbox"
              name="accept"
              id="accept"
              className="peer hidden"
              onChange={handleChange}
            />
            <div className="w-5 h-4 border-2 border-pink-600 peer-checked:border-pink-600 peer-checked:bg-pink-600 rounded mr-2 flex items-center justify-center">
              {/* ✅ Agrega el check cuando está marcado */}
              <svg
                className="w-4 h-4 text-white opacity-1 peer-checked:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-base text-gray-700">
              Acepto los términos y condiciones
            </span>
          </label>

              {/* Sección de botones alineados a la derecha */}
              <div className="flex space-x-4">
                <button
                  onClick={onCloseTerm}
                  className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-all"
                >
                  Cancelar
                </button>
                <button
                  disabled={!accept}
                  onClick={NextToConfirm}
                  className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-700 transition-all"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermsModal;

TermsModal.propTypes = {
  isOpenTerm: PropTypes.bool.isRequired,
  onCloseTerm: PropTypes.func.isRequired,
  NextToConfirm: PropTypes.func.isRequired,
};
