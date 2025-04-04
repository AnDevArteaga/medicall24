import cabina from "../../../../assets/empresas/cabina.jpg";
import { CheckCircle } from "lucide-react";

const InfoText = () => {
    return (
        <div className="container mx-auto items-center justify-center space-y-8 sm:space-y-2">
            <div>
            <h1 className="text-5xl md:text-3xl sm:text-4xl font-bold leading-tight md:leading-normal text-gray-600">
                        En los planes de Telemedicina se pueden usar nuestras Cabinas Insonorizadas
                </h1>
            </div>
            <div className=" flex flex-row md:flex-col sm:flex-col gap-8">

            <div className="w-full text-left md:text-center">
                {/* Secciones con CheckCircle */}
                <div className="mt-4 flex items-start gap-3 text-gray-600">
                    <p className="md:text-left md:text-2xl text-sm">
                        Las cabinas cuentas con los siguientes servicios:
                    </p>
                </div>

                {/* Secciones con CheckCircle */}
                <div className="mt-4 flex items-center gap-3 text-gray-600">
                    <CheckCircle className="text-pink-600 w-6 h-6 sm:w-3 sm:h-3 md:w-8 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Internet Satelital de alta velocidad.
                    </p>
                </div>

                <div className="mt-4 flex items-start gap-3 text-gray-600">
                    <CheckCircle className="text-pink-600 w-6 h-6 sm:w-3 sm:h-3 md:w-8 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Software de Telemedicina que permite la realización de
                        consultas médicas por videollamadas en tiempo real.
                    </p>
                </div>

                <div className="mt-4 flex items-center gap-3 text-gray-600">
                    <CheckCircle className="text-pink-600 w-6 h-6 sm:w-3 sm:h-3 md:w-8 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Equipos Biomédicos para la toma de signos vitales.
                    </p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-gray-600">
                    <CheckCircle className="text-pink-600 w-6 h-6 sm:w-3 sm:h-3 md:w-8 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Equipos Biomédicos para la medición de la Saturación de
                        Oxígeno en la Sangre.
                    </p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-gray-600">
                    <CheckCircle className="text-pink-600 w-6 h-6 sm:w-3 sm:h-3 md:w-8 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Sistema de medición de la talla del paciente.
                    </p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-gray-600">
                    <CheckCircle className="text-pink-600 w-6 h-6 sm:w-3 sm:h-3 md:w-8 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Peso incorporado.
                    </p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-gray-600">
                    <CheckCircle className="text-pink-600 w-6 h-6 sm:w-3 sm:h-3 md:w-8 md:h-8 mt-1 flex-shrink-0" />
                    <p className="md:text-left md:text-2xl text-sm">
                        Software que realiza al análisis de la Composición
                        Corporal.
                    </p>
                </div>
            </div>
            <div className="w-full md:w-full rounded-3xl overflow-hidden">
                <img
                    src={cabina}
                    alt="imagen"
                    className="w-full h-auto"
                    style={{ userSelect: "none", pointerEvents: "none" }}
                />
            </div>


            </div>

        </div>
    );
};

export default InfoText;
