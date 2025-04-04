import { useEffect } from "react";
import { usePlan } from "../contexts/empresas/simulatedPlanContext";

// Función para calcular los valores de un plan con usuarios adicionales
const calcularValorConUsuarios = (base) => {
  const firstUser = base * 0.30004;
  const secondUser = base * 0.20002;
  const thirdUser = base * 0.10001;
  return Math.round(base + firstUser + secondUser + thirdUser);
};

// Función para calcular costos fijos totales
const calcularCostosFijos = (NT, totalCFM, totalCCC, totalP) => {
  const CT = 75 * (totalCCC * 30);  // Costo Tecnología
  const CP = NT * 2500;  // Costo Póliza
  const CM = 40000 * (NT * totalP); // Costo Medicamentos

  const CF = totalCFM + CT + CP; // Costo Fijo sin medicamentos
  const CFpersonasTotal = CF + CM; // Costo Fijo para personas
  return { CF, CFpersonasTotal };
};

// Función para calcular el resultado final
const calcularResultadoFinal = (NT, valuePlan, planValues) => {
  let topeSelected = null;
  let plan = null;
  let result = valuePlan;

  if (NT < 100) {
    plan = planValues.find((item) => item.tope === 100);
    topeSelected = plan?.tope;
  } else if (NT >= 6400) {
    topeSelected = 6400;
  } else {
    plan = planValues.find((item, index) => {
      const siguienteTope = planValues[index + 1]?.tope || Infinity;
      return NT >= item.tope && NT < siguienteTope;
    });
    topeSelected = plan?.tope;
  }

  if (plan) {
    result = Math.round(valuePlan + valuePlan * plan.valuePercentaje);
  }

  return { result, topeSelected };
};

const usePlanCalculation = (onNext, especialidadesDisponibles) => {
  const {
    NT, setNT,
    especialidadesSeleccionadas, setEspecialidadesSeleccionadas,
    resultadoFinal, setResultadoFinal,
    discount, setDiscount,
    valueMonthly, setValueMonthly,
    valueAnnually, setValueAnnually,
    planValues, setResultadoFinalPersonas
  } = usePlan();

  const handleNext = () => {
    if (NT && resultadoFinal) {
      onNext({ NT, resultadoFinal });
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const toggleEspecialidad = (id) => {
    setEspecialidadesSeleccionadas((prev) => {
      const existe = prev.some((esp) => esp.id === id);
      const nuevasEspecialidades = existe
        ? prev.filter((esp) => esp.id !== id)
        : [...prev, especialidadesDisponibles.find((esp) => esp.id === id)];

      if (nuevasEspecialidades.length === 0) {
        setNT("");
        setDiscount(0);
        setValueMonthly(0);
        setValueAnnually(0);
      }

      return nuevasEspecialidades;
    });
  };

  const handleTopeChange = () => {
    if (!NT || especialidadesSeleccionadas.length === 0) {
      setResultadoFinal("");
      setDiscount(0);
      setValueMonthly(0);
      setValueAnnually(0);
      return;
    }

    const CU = NT * 4; // Cálculo de consulta única
    const calcularValores = (esp) => ({
      CCC: esp.proyeccion * CU,
      CFM: esp.proyeccion * CU * esp.promedio_valor_consulta,
      P: esp.proyeccion
    });

    const { totalCCC, totalCFM, totalP } = especialidadesSeleccionadas.reduce(
      (totales, esp) => {
        const { CCC, CFM, P } = calcularValores(esp);
        return {
          totalCCC: totales.totalCCC + CCC,
          totalCFM: totales.totalCFM + CFM,
          totalP: totales.totalP + P
        };
      },
      { totalCCC: 0, totalCFM: 0, totalP: 0 }
    );

    const { CF, CFpersonasTotal } = calcularCostosFijos(NT, totalCFM, totalCCC, totalP);

    const CFP = CF / NT * 1.04978;
    const CFPpersonasTotal = CFpersonasTotal * 1.142422;

    const valuePlan = calcularValorConUsuarios(CFP);
    const valuePlanPersonas = calcularValorConUsuarios(CFPpersonasTotal);

    setResultadoFinalPersonas({
      resultadoFinal: valuePlanPersonas,
      valorSinUsuarioAdicional: CFPpersonasTotal
    });

    const { result, topeSelected } = calcularResultadoFinal(NT, valuePlan, planValues);
    setResultadoFinal(result);

    const plan = planValues.find((p) => p.tope === topeSelected);
    const discount = plan ? plan.discount : 0;
    const valueMonthly = NT * result;
    const valueAnnually = valueMonthly * 12;

    setDiscount(discount);
    setValueMonthly(valueMonthly);
    setValueAnnually(valueAnnually);
  };

  useEffect(() => {
    handleTopeChange();
  }, [NT, especialidadesSeleccionadas]);

  return {
    NT,
    setNT,
    especialidadesSeleccionadas,
    toggleEspecialidad,
    resultadoFinal,
    discount,
    valueMonthly,
    valueAnnually,
    handleNext,
  };
};

export default usePlanCalculation;
