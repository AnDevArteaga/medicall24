import { useEffect, useState } from "react";
import {
  getDepartaments,
  getMunicipios,
} from "../../../../services/azure/getLocation";
import PropTypes from "prop-types";
import {
  Building2,
  Hash,
  Info,
  Mail,
  MessageSquareText,
  Phone,
  MapPin
} from "lucide-react";
import { usePlan } from "@/contexts/empresas/simulatedPlanContext";

const CombinedForm = ({ onSubmit, statusModalCotizeSendEmpresa }) => {
  // Datos de empresa
  const [companyData, setCompanyData] = useState({
    businessName: "", // Razón Social
    nit: "",
    dv: "",
    email: "",
    phone: "",
    city: "",
    departament: "",
    country: "COLOMBIA",
  });


  const [comments, setComments] = useState("");
  const [departaments, setDepartaments] = useState([]);
  const [municipios, setMunicipios] = useState([])

  const fetchDepartaments = async () => {
    try {
      const response = await getDepartaments();
      setDepartaments(response);
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
    }
  };

  useEffect(() => {
    fetchDepartaments();
  }, []);

  const fetchMunicipios = async (departamentoId) => {
    try {
      const response = await getMunicipios(departamentoId);
      setMunicipios(response);
    } catch (error) {
      console.error("Error al cargar municipios:", error);
    }
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;

    if (name === "nit") {
      // Solo números y máximo 10 dígitos
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "dv") {
      // Solo números y máximo 10 dígitos
      if (!/^\d*$/.test(value)) return;
      if (value.length > 1) return;
    }

    if (name === "phone") {
      // Solo números y máximo 10 dígitos
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "country") {
      const newValue = value.toUpperCase()
      setCompanyData((prev) => ({ ...prev, [name]: newValue }));
    }
 
   
    if (name === "departament") {
      const departamentoId = departaments.find((d) => {
        return d.nombre === value;
      })?.id;
      fetchMunicipios(departamentoId);
      setCompanyData((prev) => ({ ...prev, [name]: value }));
    }
    setCompanyData((prev) => ({ ...prev, [name]: value }));

    
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const cotizeData = {
      ...companyData,
      comments,
    };
    console.log(cotizeData)
    onSubmit(cotizeData);
  };

  const isFormValid = () =>
    String(companyData.businessName).trim() !== "" &&
    String(companyData.nit).trim() !== "" &&
    String(companyData.dv).trim() !== "" &&
    String(companyData.email).trim() !== "" &&
    String(companyData.phone).trim() !== "" &&
    String(companyData.country).trim() !== "" &&
    String(companyData.departament).trim() !== "" &&
    String(companyData.city).trim() !== "";
 

  useEffect(() => {
    if (!statusModalCotizeSendEmpresa) {
      setCompanyData({
        businessName: "",
        nit: "",
        dv: "",
        email: "",
        phone: "",
        country: "COLOMBIA",
        departament: "",
        city: "",
      });

      setMunicipios([]);
      setComments("");

    }
  }, [statusModalCotizeSendEmpresa]);

  const inputClass =
    "w-full border-b border-pink-600 focus:outline-none focus:border-orange-500 py-2 text-gray-700 bg-transparent text-sm";

  return (
    <div className="flex flex-col justify-center items-center sm:justify-start sm:pt-20 min-h-screen px-4">
      <div className="mb-8 sm:mb-2 text-center">
        <span className="text-pink-600 text-4xl sm:text-xl font-semibold">
          Ingresa los datos de la empresa
        </span>
      </div>
      <div className="bg-white rounded-xl px-0 sm:px-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-20 sm:p-0 sm:p-2 "
        >
          <div className="flex mb-4 sm:mb-2">
            <div className="w-full bg-white space-y-2 sm:space-y-0 sm:p-4">
              <h3 className="text-xl sm:text-lg font-semibold text-gray-700">
                Completa los campos para solicitar la cotización
              </h3>

              {/* NIT y DV */}
              <div className="flex space-x-4">
                {/* NIT */}
                <div className="relative w-2/3">
                  <Hash
                    className="absolute left-2 top-3 text-gray-400"
                    size={15}
                  />
                  <input
                    type="text"
                    name="nit"
                    placeholder="NIT"
                    value={companyData.nit}
                    onChange={handleCompanyChange}
                    className={`${inputClass} pl-8`}
                  />
                </div>

                {/* DV */}
                <div className="relative w-1/3">
                  <Hash
                    className="absolute left-2 top-3 text-gray-400"
                    size={15}
                  />
                  <input
                    type="text"
                    name="dv"
                    placeholder="DV"
                    value={companyData.dv}
                    onChange={handleCompanyChange}
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </div>
              {/* Razón Social */}
              <div className="relative">
                <Building2
                  className="absolute left-2 top-3 text-gray-400"
                  size={15}
                />
                <input
                  type="text"
                  name="businessName"
                  placeholder="Razón Social"
                  value={companyData.businessName}
                  onChange={handleCompanyChange}
                  className={`${inputClass} pl-8`}
                />
              </div>

              {/* Correo */}
              <div className="relative">
                <Mail
                  className="absolute left-2 top-3 text-gray-400"
                  size={15}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={companyData.email}
                  onChange={handleCompanyChange}
                  className={`${inputClass} pl-8`}
                />
              </div>

              {/* Teléfono */}
              <div className="flex space-x-4">
              <div className=" relative w-1/2">
              <MapPin
               className="absolute left-2 top-3 text-gray-400"
               size={15}
             />
             <input
               type="text"
               name="country"
               placeholder="Pais"
               value={companyData.country}
              //  onChange={handleCompanyChange}
               className={`${inputClass} pl-8 disabled`}
               disabled
             />
           </div>
           <div className="w-1/2 relative">

                <Phone
                  className="absolute left-2 top-3 text-gray-400"
                  size={15}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  value={companyData.phone}
                  onChange={handleCompanyChange}
                  className={`${inputClass} pl-8`}
                />
              </div>
              </div>

              <div className="flex space-x-4">
        
                <div className="w-1/2">
      
                  <select
                    name="departament"
                    value={companyData.departament}
                    onChange={handleCompanyChange}
                    className={`${inputClass}`}
                  >
                    <option value="">Selecciona un departamento</option>
                    {departaments.map((dept) => (
                      <option key={dept.id} value={dept.name}>{dept.nombre}</option>
                    ))}
                  </select>
                </div>

                <div className="w-1/2">
         
                  <select
                    name="city"
                    value={companyData.city}
                    onChange={handleCompanyChange}
                    className={`${inputClass}`}
                    disabled={!municipios.length}
                  >
                    <option value="">Selecciona un municipio</option>
                    {municipios.map((municipio) => (
                      <option key={municipio.id} value={municipio.name}>
                        {municipio.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
           
         
          </div>
          {/* Comentarios */}
          <div className="relative">
            <MessageSquareText
              className="absolute left-2 top-3 text-gray-400"
              size={20}
            />
            <textarea
              placeholder="Comentarios adicionales"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className={`w-full border border-pink-600 focus:outline-none focus:border-orange-500 py-2 text-gray-700 bg-transparent pl-8 rounded-xl resize-none`}
              rows="3"
              maxLength={300}
            />
          </div>
          {/* Botón Enviar */}
          <div className="pt-4 sm:pt-0 flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-1/4 py-2 rounded-3xl font-semibold text-white ${
                isFormValid()
                  ? "bg-orange-500 hover:bg-orange-600 transition"
                  : "bg-gray-300"
              }`}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CombinedForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default CombinedForm;
