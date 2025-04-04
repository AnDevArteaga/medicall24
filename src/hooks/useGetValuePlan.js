import { useState } from "react";

const usePlan = () => {
  const [tope, setTope] = useState(""); // El valor que el usuario ingresa
  const [valorPlan, setValorPlan] = useState(""); // El valor del plan calculado

  const updateTope = (newTope) => {
    setTope(newTope);
  };

  const updateValorPlan = (newValorPlan) => {
    setValorPlan(newValorPlan);
  };

  return {
    tope,
    setTope: updateTope,
    valorPlan,
    setValorPlan: updateValorPlan,
  };
};

export default usePlan;
