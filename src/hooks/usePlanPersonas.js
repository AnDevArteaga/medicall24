import { useState, useEffect } from "react";

// Función para calcular el valor mensual con usuarios adicionales
const calcularValorMensual = (valorAnual, meses) => {
  const valorMesSinUsuarios = Math.round(valorAnual / meses);
  const firstUser = Math.round(valorMesSinUsuarios * 0.30004);
  const secondUser = Math.round(valorMesSinUsuarios * 0.20002);
  const thirdUser = Math.round(valorMesSinUsuarios * 0.10001);
  return Math.round(valorMesSinUsuarios + firstUser + secondUser + thirdUser);
};

// Función para calcular descuentos
const calcularDescuento = (base, comparado) => Math.round(((base - comparado) / base) * 100);

const usePlanPersonas = (valorBase) => {
  const [valores, setValores] = useState({
    valorMes3: 0,
    valorMes6: 0,
    valorMes12: valorBase.resultadoFinal,
    promedio3: 0,
    promedio6: 0,
    promedio12: 0,
    descuento6: 0,
    descuento12: 0
  });

  useEffect(() => {
    if (!valorBase || !valorBase.valorSinUsuarioAdicional) return;

    const valorAnual12Meses = Math.round(valorBase.valorSinUsuarioAdicional * 12);
    const valorAnual6Meses = Math.round(valorAnual12Meses * 0.62508);
    const valorAnual3Meses = Math.round(valorAnual12Meses * 0.39071);

    const valorMes3 = calcularValorMensual(valorAnual3Meses, 3);
    const valorMes6 = calcularValorMensual(valorAnual6Meses, 6);
    const valorMes12 = Math.round(valorBase.resultadoFinal);

    const promedio3 = Math.round(valorMes3 / 4);
    const promedio6 = Math.round(valorMes6 / 4);
    const promedio12 = Math.round(valorMes12 / 4);

    const descuento6 = calcularDescuento(promedio3, promedio6);
    const descuento12 = calcularDescuento(promedio3, promedio12);
    console.log("descuento6", descuento6);
    console.log("descuento12", descuento12);

    setValores({ valorMes3, valorMes6, valorMes12, promedio3, promedio6, promedio12, descuento6, descuento12 });
  }, [valorBase]);

  return valores;
};

export default usePlanPersonas;
