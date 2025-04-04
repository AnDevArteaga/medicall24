import axios from "axios";
// import { apiAzure_test } from "../config/apiConfig";
import { apiAzure } from "../config/apiConfig";

export const fetchPaymentStatus = async (transactionId) => {
    try {
        const response = await axios.get(
            `${apiAzure}/Payments/GetStatusOrder/${transactionId}`,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching payment status:", error);
        throw error;
    }
};

export const loadBankPse = async () => {
    try {
        const response = await axios.get(
            `${apiAzure}/Payments/FinancialInstitutions`,
        );

        return response.data.data;
    } catch (error) {
        console.error("Error al cargar el banco:", error);
    }
};

export const getDetailPayment = async (productId, paymentMethod, discount) => {
    try {
        const response = await axios.post(
            `${apiAzure}/Payments/GetDetailPayment`,
            { productId, paymentMethod, discount },
        );
        return response.data;
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
    }
};

export const performPurchase = async (paidObject) => {

    try {
        // const type = paidObject.paymentMethod.type;
        const createTransactionResponse = await axios.post(
            `${apiAzure}/Payments/PatientPlan`,
            paidObject,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
                },
            },
        );

        const { success, message, data } = createTransactionResponse.data;

        if (!success || message !== "Transacción generada exitosamente!.") {
            console.log(success, message, data);
            throw new Error(
                "Algo ha pasado con la transacción, inténtelo más tarde.",
            );
        }

        console.log("Transacción generada exitosamente:", data);

        // Segunda solicitud: Consultar el estado de la transacción
        const { transactionId } = data;
        return transactionId;

    } catch (error) {
        console.error("Error en la compra:", error);
        return error;
    }
};



export const checkAsyncPaymentUrl = async (transactionId) => {
    const maxAttempts = 10;
    const delay = 1000;
    let attempts = 0;
    console.log("transactionId", transactionId)

    while (attempts < maxAttempts) {
      try {
        // Realiza la solicitud al endpoint
        const statusResponse = await axios.get(
          `${apiAzure}/Payments/GetStatusOrder/${transactionId}`
        );
        const paymentData = statusResponse.data?.data?.payment_method;

        // Verifica si async_payment_url está disponible
        if (paymentData?.extra?.async_payment_url) {
          console.log(
            "URL de pago obtenida:",
            paymentData.extra.async_payment_url
          );
          return paymentData.extra.async_payment_url;
        }

        console.log(
          `Intento ${attempts + 1}: URL aún no disponible, reintentando...`
        );
      } catch (error) {
        console.error(
          `Error al obtener el estado de la transacción en el intento ${
            attempts + 1
          }:`,
          error.message
        );
      }

      // Espera antes de volver a intentar
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempts += 1;
    }

    console.error(
      "Se alcanzó el máximo número de intentos sin obtener una URL válida."
    );
    return null;
  };



export const getOrder = async (transactionId) => {
    try {
      // Realiza la solicitud al endpoint
      const statusResponse = await axios.get(
        `${apiAzure}/Payments/GetStatusOrder/${transactionId}`
      );

      return statusResponse;
    } catch (error) {
      console.error(
        `Error al obtener el estado de la transacción en el intento`,
        error.message
      );
    }
  };
