import { useState, useEffect } from "react";
import { fetchTypeIds } from "../services/azure/user";

export const usePaymentValidation = (dataVerified) => {
  const [typeIds, setTypeIds] = useState([]);
  const [enableField, setEnableField] = useState(false);

  useEffect(() => {
    if (
      dataVerified.type === "PSE" &&
      dataVerified.typeId !== "CC" &&
      dataVerified.typeId !== "NIT"
    ) {
      setEnableField(true);
    } else {
      setEnableField(false);
    }
  }, [dataVerified]);

  useEffect(() => {
    const getTypeIds = async () => {
      try {
        const response = await fetchTypeIds();
        setTypeIds(response);
      } catch (error) {
        console.error("Error al cargar tipos de identificación:", error);
      }
    };
    getTypeIds();
  }, []);

  return { typeIds, enableField };
};
