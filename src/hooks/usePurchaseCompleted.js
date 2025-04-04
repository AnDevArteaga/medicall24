import { useState, useEffect } from "react";
import { fetchPaymentStatus } from "../services/azure/payment";


export const usePaymentStatus = (transactionId) => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");



  useEffect(() => {
    const handleFetchPaymentStatus = async () => {
      try {
        const paymentData = await fetchPaymentStatus(transactionId);
        setPaymentData(paymentData);
        setMessage(paymentData.message);
        setLoading(false);

        const redirect_url = `${paymentData.data.redirect_url}?id=${transactionId}`;
        if (paymentData.order.status === "aprobada" || paymentData.order.status === "rechazada" || paymentData.order.status === "error") {
          clearInterval(intervalId);
          window.open(redirect_url, "_blank");
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        setLoading(false);
      }
    };

    const intervalId = setInterval(() => {
      handleFetchPaymentStatus();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [transactionId]);

  return { paymentData, loading, message };
};
