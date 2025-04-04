import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useSelectSpeciality from "../../../../hooks/useSelectSpeciality";
import { usePlan } from "../../../../contexts/empresas/simulatedPlanContext";
import PropTypes from "prop-types";

const styles = `
.custom-input::placeholder {
    font-size: 0.9rem;
    font-weight: lighter;
  }

`;

//NT: Numero de tomadores
//CU: Cantidad de usuarios
//CCC: Cantidad de consultas por usuario
//CFM: Costo fijo mensual unitario
//CF: Costo fijo total
//CFP: Costo fijo final
//CT: Costo de Técnología

const Table = ({ onNext, openModal, openModalSelectSpeciality }) => {
  const {
    NT,
    setNT,
    especialidadesSeleccionadas,
    resultadoFinal,
    discount,
    valueMonthly,
    valueAnnually,
    handleNext,
  } = useSelectSpeciality(onNext);

  const {
    especialidadesDisponibles,
    toggleEspecialidad,
    options,
    handleCheckboxChange,
  } = usePlan();

  const [prevDiscount, setPrevDiscount] = useState(discount);
  const [isDiscountNew, setIsDiscountNew] = useState(false);

  useEffect(() => {
    console.log("discount", discount);
    if (discount > 0 && discount !== prevDiscount) {
      setIsDiscountNew(true);
      const timer = setTimeout(() => setIsDiscountNew(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsDiscountNew(false);
    }
    setPrevDiscount(discount);
  }, [discount, prevDiscount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 24 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const discountVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: { duration: 0.1 },
    },
  };

  const pricingItems = [
    ...(discount > 0
      ? [{
        label: "Descuento",
        value: `${discount}%`,
        symbol: "%",
        isDiscount: true,
      }]
      : []),
    {
      label: "Valor mensual",
      value: `$${valueMonthly.toLocaleString("en-US")}`,
      symbol: "$",
      isDiscount: false,
    },
    {
      label: "Valor anual",
      value: `$${valueAnnually.toLocaleString("en-US")}`,
      symbol: "$",
      isDiscount: false,
    },
  ];
  return (
    <div className="p-6 md:p-8 sm:p-3">
      <style>{styles}</style>
      {/* Título */}
      <h1 className="text-5xl md:text-5xl sm:text-4xl font-bold text-center mb-6 text-gray-700 md:mb-16">
        Arma el plan perfecto para tus trabajadores
      </h1>
      <div className="max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {especialidadesDisponibles.length > 0
          ? (
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-1 md:gap-4 w-full mb-4">
              {especialidadesDisponibles.map((esp) => (
                <li
                  key={esp.id}
                  onClick={() => toggleEspecialidad(esp.id)}
                  className={`flex items-center w-40 sm:w-32 md:w-48 md:p-0 gap-1 p-1 sm:p-0  rounded-xl cursor-pointer transition-all duration-300 
                  ${
                    especialidadesSeleccionadas.some((e) => e.id === esp.id)
                      ? "bg-pink-50 border-pink-200 border shadow-sm"
                      : "bg-transpartent hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`w-6 h-6 sm:w-4 sm:w-4  rounded-full flex items-center justify-center transition-transform duration-300 
                    ${
                        especialidadesSeleccionadas.some((e) => e.id === esp.id)
                          ? "scale-110"
                          : "scale-100"
                      }`}
                    >
                      {especialidadesSeleccionadas.some((e) => e.id === esp.id)
                        ? (
                          <div className="w-4 h-4 rounded-full bg-pink-500 border-4 border-pink-300">
                          </div>
                        )
                        : <div className="w-4 h-4 rounded-full bg-white"></div>}
                    </div>
                  </div>
                  <span className="text-gray-800 font-regular text-sm sm:text-xs md:text-lg">
                    {esp.nombre}
                  </span>
                </li>
              ))}
            </ul>
          )
          : (
            <div className="bg-gray-50 flex min-h-72 justify-center items-center rounded-xl text-center p-8">
              <span className="text-gray-500 text-lg">
                No hay especialidades disponibles
              </span>
            </div>
          )}
      </div>
      {especialidadesSeleccionadas.length < 3 && (
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-1 md:mb-6 md:mt-4">
          <span className="text-pink-600 text-sm sm:text-xs md:text-xl">
            Selecciona al menos 3 especialidades
          </span>
        </div>
      )}

      <div className="flex flex-row md:flex-col sm:flex-col sm:space-x-0 sm:space-y-4 justify-center space-x-12 md:space-x-0 md:space-y-4 mb-6 sm:mb-4">
        <div>
          {/* Label pequeño y Input */}
          <label className="block text-sm md:text-4xl md:mt-8 font-medium text-gray-600 mb-2 md:mb-6 text-center">
            Cantidad de empleados
          </label>
          <div className="flex flex-col justify-center items-center">
            <input
              disabled={especialidadesSeleccionadas.length < 3}
              id="tope"
              type="text"
              maxLength={5}
              value={especialidadesSeleccionadas.length >= 3 ? NT : ""}
              onChange={(e) => {
                let rawValue = e.target.value;

                // Opcional: Si solo quieres permitir dígitos, puedes limpiar cualquier otro caracter
                rawValue = rawValue.replace(/[^0-9]/g, "");
                if (rawValue === "") {
                  // Si el input quedó vacío, seteamos NT como null o ""
                  setNT(""); // o setNT("") si prefieres string vacío
                } else if (rawValue == 0) {
                  setNT("");
                } else {
                  setNT(Number(rawValue));
                }
              }}
              className={`w-4/10 md:w-1/3 sm:w-2/4 self-center p-2 sm:p-1 md:p-2 font-regular placeholder-gray-400 border rounded-xl focus:outline-none focus:ring mb-0 
                transition-colors duration-300
                ${
                especialidadesSeleccionadas.length < 3
                  ? "bg-gray-200 text-gray-400 border-gray-300"
                  : "text-gray-600 bg-white border-orange-400 focus:ring-orange-500"
              }`}
            />
          </div>
        </div>
        <div>
          {/* Descripción */}
          <label className="block text-sm md:text-2xl font-medium text-gray-600 mb-2 sm:mb-0 text-center">
            Valor del plan
          </label>

          {/* Label grande */}
          <label className="block text-center text-5xl md:text-7xl sm:text-4xl font-bold text-gray-700 hover:text-pink-600 transition ease-in-out">
            {resultadoFinal !== "" && especialidadesSeleccionadas.length >= 3
              ? `$ ${resultadoFinal.toLocaleString("en-US")}`
              : "$0"}
          </label>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <span className="text-pink-600 text-2xl md:text-4xl sm:text-base text-center">
          Liquidación del plan de telemedicina para 12 meses
        </span>
      </div>

      {/* 3 Inputs en línea horizontal */}
      <motion.div
        className="flex flex-row sm:text-sm justify-center items-start md:items-center gap-4 sm:gap-2 mt-6 sm:mt-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        <AnimatePresence mode="popLayout">
          {pricingItems.map((item) => (
            <motion.div
              key={item.label}
              layout
              className={`flex flex-col md:items-center ${
                discount > 0 ? "w-full" : "w-96"
              }`}
              variants={item.isDiscount && isDiscountNew
                ? discountVariants
                : itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.label
                layout
                className="text-sm md:text-2xl sm:text-xs font-semibold text-gray-600 mb-2 sm:mb-0"
              >
                {item.label}
              </motion.label>
              <motion.div
                layout
                className="flex items-center w-full justify-center"
              >
                <motion.input
                  layout
                  disabled
                  type="text"
                  value={item.value}
                  className={`w-full md:text-2xl text-gray-600 font-bold p-2 rounded-xl bg-white border-2 text-sm border border-gray-300 sm:p-1 sm:text-xs`}
                  placeholder={item.value}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center mb-6 relative mt-4 sm:mt-3 sm:mb-2 md:mt-12 md:mb-12">
        <div className="flex-1 border-t border-gray-300/50"></div>
        <span className="text-sm text-gray-700 mx-4 px-2 sm:text-xs md:text-2xl">
          Agregar Servicios Adicionales
        </span>
        <div className="flex-1 border-t border-gray-300/50"></div>
      </div>

      <div className="flex gap-4 sm:gap-2 mt-4 sm:flex-col md:flex-col md:items-start sm:items-center md:ml-16">
        {["cabin", "deliveryMedicine", "lifeInsurance"].map((opcion, index) => (
          <label
            key={index}
            className="flex items-center gap-1 cursor-pointer justify-center"
          >
            <input
              type="checkbox"
              className="hidden peer"
              checked={options[opcion] ?? false}
              onChange={() => handleCheckboxChange(opcion)}
            />
            <div className="w-5 h-5 sm:w-3 sm:h-3 border-2 border-gray-300 rounded-full bg-white peer-checked:border-pink-300 peer-checked:border-4 peer-checked:bg-pink-500 transition-all duration-300">
            </div>
            <span className="text-gray-700 text-sm sm:text-xs md:text-2xl">
              {opcion === "cabin"
                ? "Cabina de Telemedicina Insonorizada"
                : opcion === "deliveryMedicine"
                ? "Entrega de medicamentos a domicilio para el tomador del plan"
                : opcion === "lifeInsurance"
                ? "Póliza de Vida para el tomador del plan"
                : ""}
            </span>
          </label>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          className={`bg-orange-500 text-white font-bold py-2 px-6 rounded-3xl md:text-3xl w-5/12 mt-6 md:mt-12 w-auto ${
            NT === "" || especialidadesSeleccionadas.length < 3 || NT === 0
              ? "opacity-50"
              : "hover:bg-orange-600 transition duration-300 hover:border-orange-400 cursor-pointer"
          }`}
          disabled={NT === 0 || NT === "" ||
            especialidadesSeleccionadas.length < 3}
          onClick={handleNext}
        >
          Solicitar Cotización
        </button>
      </div>
    </div>
  );
};

export default Table;

Table.propTypes = {
  onNext: PropTypes.func,
  openModalCotize: PropTypes.func,
  openModalSelectSpeciality: PropTypes.func,
};
