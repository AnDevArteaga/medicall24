import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import Loader from "../../components/common/Loader";
import "../../styles/noScroll.css";
import { useFormValidation } from "../../hooks/useStepOne/useFormValidation";
import PropTypes from "prop-types";


const Modal = ({ isModalOpenBilling, onCloseBilling, billingData, openAlertEmailModal }) => {
  const { validateDomainEmail } = useFormValidation(openAlertEmailModal);
  const [formData, setFormData] = useState({
    tipopersona_factura: "",
    tipoid_factura: "",
    numid_factura: "",
    dv_factura: "",
    nombre_factura: "",
    direccion_factura: "",
    correo_factura: "",
    pais_factura: "Colombia",
    num_factura: 0,
    envio_factura: false,
  });
  const [terminosAceptados, setTerminosAceptados] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumericField = ["numid_factura", "dv_factura"].includes(name);
    const newValue = isNumericField ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    // Agregar o quitar la clase `no-scroll` según el estado del modal
    if (isModalOpenBilling) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    // Limpieza: Elimina la clase si el componente se desmonta
    return () => document.body.classList.remove("no-scroll");
  }, [isModalOpenBilling]);

  const validateFormData = () => {
    return (
      formData.tipopersona_factura &&
      formData.tipoid_factura &&
      formData.numid_factura &&
      formData.dv_factura &&
      formData.nombre_factura &&
      formData.correo_factura &&
      terminosAceptados
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loading) {
      console.log("click");
      setLoading(true);
      setTimeout(() => {
        billingData(formData);
        setLoading(false);
        onCloseBilling();
      }, 1000);
    }
  };

  if (!isModalOpenBilling) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg w-1/2 sm:w-full">
          {/* Encabezado */}
          <div className="bg-pink-600 text-white text-lg font-bold py-4 sm:py-2 px-6 rounded-t-lg text-center">
            Solicitud de Factura Electrónica
          </div>

          {/* Contenido */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="space-y-2 p-6"
            >
              <div className="sm:overflow-scroll sm:h-[30rem] sm:px-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="space-y-2 ">
                    <label
                      htmlFor="tipopersona_factura"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> Tipo de Persona
                    </label>
                    <select
                      required
                      id="tipopersona_factura"
                      name="tipopersona_factura"
                      value={formData.tipopersona_factura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 text-sm disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200"
                    >
                      <option value="">Seleccione...</option>
                      <option value="0">Persona Natural</option>
                      <option value="1">Persona Jurídica</option>
                    </select>
                  </div>
                  {/* Tipo de Documento */}
                  <div className="space-y-2">
                    <label
                      htmlFor="tipoid_factura"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> Tipo de Documento
                    </label>
                    <select
                      required
                      id="tipoid_factura"
                      name="tipoid_factura"
                      value={formData.tipoid_factura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 text-sm disabled:text-gray-600 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200"
                    >
                      <option value="">Seleccione...</option>
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="CE">Cédula de Extranjería</option>
                      <option value="NIT">NIT</option>
                      <option value="NITOP">NIT de otro país</option>
                      <option value="NITOP">NUIP</option>
                      <option value="NITOP">Pasaporte</option>
                      <option value="NITOP">Registro Civil</option>
                      <option value="NITOP">Tarjeta de indentidad</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  {/* Número de Documento */}
                  <div className="space-y-2 w-full">
                    <label
                      htmlFor="numid_factura"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span>{" "}
                      Número de Documento
                    </label>
                    <input
                      required
                      type="text"
                      id="numid_factura"
                      name="numid_factura"
                      value={formData.numid_factura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
                      pattern="[0-9]*"
                    />
                  </div>
                  {/* Número de Documento */}
                  <div className="space-y-2">
                    <label
                      htmlFor="dv_factura"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> DV
                    </label>
                    <input
                      required
                      type="text"
                      maxLength={1}
                      id="dv_factura"
                      name="dv_factura"
                      value={formData.dv_factura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
                      pattern="[0-9]*"
                    />
                  </div>
                  {/* Nombre y Apellido / Razón Social */}
                  <div className="space-y-2 w-full">
                    <label
                      htmlFor="nombre_factura"
                      className="block text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span>{" "}
                      Nombre y Apellido / Razón Social
                    </label>
                    <input
                      required
                      type="text"
                      id="nombre_factura"
                      name="nombre_factura"
                      value={formData.nombre_factura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-2">
                  {/* País */}
                  <div className="space-y-2">
                    <label
                      htmlFor="pais_factura"
                      className="block text-sm font-medium text-gray-700"
                    >
                      País
                    </label>
                    <select
                      id="pais_factura"
                      name="pais_factura"
                      value={formData.pais_factura}
                      disabled
                      className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-300"
                    >
                      <option value="Colombia">Colombia</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="naciudad_facturame"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="ciudad_factura"
                      name="ciudad_factura"
                      value={formData.ciudad_factura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="direccion_factura"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="direccion_factura"
                      name="direccion_factura"
                      value={formData.direccion_factura}
                      onChange={handleChange}
                      className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
                    />
                  </div>
                </div>
                {/* Correo Electrónico */}
                <div className="space-y-2">
                  <label
                    htmlFor="correo_factura"
                    className="block text-sm font-medium text-gray-700"
                  >
                    <span className="text-red-500">*</span> Correo Electrónico
                  </label>
                  <input
                    required
                    type="email"
                    id="correo_factura"
                    name="correo_factura"
                    value={formData.correo_factura}
                    onBlur={(e) => validateDomainEmail(e.target.value)}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-sm border-2 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all"
                  />
                  {
                    /* <p className="mt-1 text-xs text-gray-500">
                  Ingrese un correo electrónico válido para recibir
                  notificaciones importantes
                </p> */
                  }
                </div>


                {/* Mensaje de Atención */}
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-md">
                  <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    En este correo recibirás el documento tributario en un plazo
                    máximo de 48 horas
                  </p>
                </div>

                
         

                {/* Checkbox de Términos */}
                <div className="flex items-start space-x-2">
                <span className="text-red-500">*</span>

                  <input
                    required
                    type="checkbox"
                    id="terms"
                    checked={terminosAceptados}
                    onChange={() => setTerminosAceptados(!terminosAceptados)}
                    name="termsAccepted"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500">
                    Confirmo que los datos son correctos y que coinciden con los
                    reportados ante la Dirección de Impuestos y Aduanas
                    Nacionales (DIAN) de colombia
                  </p>
                </div>

                <p className="text-sm mt-2">
                  <span className="text-red-500">*</span> Campos obligatorios
                </p>
              </div>

              {/* Botón */}
              <div className="px-6 py-4 flex justify-between rounded-b-lg text-center">
                <button
                  onClick={onCloseBilling}
                  className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300"
                >
                  Cerrar
                </button>

                <button
                  //   onClick={saveBilling}
                  className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition-colors duration-300 disabled:bg-gray-400"
                  disabled={!validateFormData()}
                >
                  {loading ? <Loader /> : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  isOpenConfirm: PropTypes.bool,
  onCloseConfirm: PropTypes.func,
  payload: PropTypes.object,
  registrar: PropTypes.func,
};
