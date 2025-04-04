import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Crear el contexto
const simulatedPlanContext = createContext();


// Proveedor del contexto
export const PlanProvider = ({ children }) => {
  const [NT, setNT] = useState("");
  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState([]);
  const [resultadoFinal, setResultadoFinal] = useState("");
  const [resultadoFinalPersonas, setResultadoFinalPersonas] = useState({
    resultadoFinal: 0,
    valorSinUsuarioAdicional: 0,
  });
  const [discount, setDiscount] = useState(0);
  const [valueMonthly, setValueMonthly] = useState(0);
  const [valueAnnually, setValueAnnually] = useState(0);
  const [options, setOptions] = useState({
    lifeInsurance: false,
    deliveryMedicine: false,
    cabin: false,
  });

  // 🔥 Forzar el estado inicial correcto cuando el componente se monta
  useEffect(() => {
    setOptions({
      lifeInsurance: true,
      deliveryMedicine: true,
      cabin: true,
    });
  }, []);

  const handleCheckboxChange = (opcion) => {
    setOptions((prev) => ({
      ...prev,
      [opcion]: !prev[opcion],
    }));
  };

  // Mapeo de los rangos de "Tope de Usuarios" y los valores del plan correspondientes
const planValues = [
  { tope: 100, valuePercentaje: 0.50146, discount: 0 },
  { tope: 150, valuePercentaje: 0.45146, discount: 3 },
  { tope: 200, valuePercentaje: 0.40312, discount: 7 },
  { tope: 300, valuePercentaje: 0.35639, discount: 10 },
  { tope: 400, valuePercentaje: 0.31122, discount: 13 },
  { tope: 600, valuePercentaje: 0.26755, discount: 16 },
  { tope: 800, valuePercentaje: 0.22534, discount: 18 },
  { tope: 1200, valuePercentaje: 0.18453, discount: 21 },
  { tope: 1600, valuePercentaje: 0.14509, discount: 24 },
  { tope: 2400, valuePercentaje: 0.10695, discount: 26 },
  { tope: 3200, valuePercentaje: 0.07009, discount: 29 },
  { tope: 4800, valuePercentaje: 0.03445, discount: 31 },
  { tope: 6400, valuePercentaje: 0, discount: 33 }
];

  const especialidadesDisponibles = [
    {
      id: 1,
      nombre: "Psiquiatría",
      proyeccion: 0.05,
      promedio_valor_consulta: 30871,
    },
    {
      id: 2,
      nombre: "Medicina General",
      proyeccion: 0.20,
      promedio_valor_consulta: 13275,
    },
    {
      id: 3,
      nombre: "Pediatría",
      proyeccion: 0.04,
      promedio_valor_consulta: 30871,
    },
    {
      id: 4,
      nombre: "Ginecología",
      proyeccion: 0.04,
      promedio_valor_consulta: 37045,
    },
    {
      id: 5,
      nombre: "Psicología",
      proyeccion: 0.04,
      promedio_valor_consulta: 20066,
    },
    {
      id: 6,
      nombre: "Medicina Interna",
      proyeccion: 0.06,
      promedio_valor_consulta: 30871,
    },
    {
      id: 7,
      nombre: "Neurología",
      proyeccion: 0.03,
      promedio_valor_consulta: 67917,
    },
    {
      id: 8,
      nombre: "Urología",
      proyeccion: 0.06,
      promedio_valor_consulta: 46307,
    },
    {
      id: 9,
      nombre: "Medicina Familiar",
      proyeccion: 0.03,
      promedio_valor_consulta: 37045,
    },
    {
      id: 10,
      nombre: "Cardiología",
      proyeccion: 0.05,
      promedio_valor_consulta: 77178,
    },
    {
      id: 11,
      nombre: "Gastroenterología",
      proyeccion: 0.05,
      promedio_valor_consulta: 77178,
    },
  ];


  const toggleEspecialidad = (id, type) => {
    if (type === "personas") {
    setNT(1);
    }
    setEspecialidadesSeleccionadas((prev) => {
      const existe = prev.find((esp) => esp.id === id);
      const nuevasEspecialidades = existe
        ? prev.filter((esp) => esp.id !== id)
        : [...prev, especialidadesDisponibles.find((esp) => esp.id === id)];

      if (nuevasEspecialidades.length === 0) {
        setNT("");
        setDiscount(0);
        setValueMonthly(0);
        setValueAnnually(0);
      }
      return nuevasEspecialidades; // 

    });
  };


  return (
    <simulatedPlanContext.Provider
      value={{
        NT,
        setNT,
        especialidadesSeleccionadas,
        resultadoFinal,
        setResultadoFinal,
        discount,
        setDiscount,
        valueMonthly,
        setValueMonthly,
        valueAnnually,
        setValueAnnually,
        toggleEspecialidad,
        especialidadesDisponibles,
        planValues,
        setEspecialidadesSeleccionadas,
        resultadoFinalPersonas,
        setResultadoFinalPersonas,
        options,
        handleCheckboxChange,
        setOptions

      }}
    >
      {children}
    </simulatedPlanContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const usePlan = () => useContext(simulatedPlanContext);

usePlan.propTypes = {
  children: PropTypes.node,
};