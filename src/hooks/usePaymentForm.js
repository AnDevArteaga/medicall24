import { useState, useEffect } from "react";
import { loadBankPse } from "../services/azure/payment";

export const usePaymentForms = (onFormDataChange, numberValid, phoneNumberValid, onMethodChangeProps) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [bankPse, setBankPse] = useState([]);
  
  useEffect(() => {
    onMethodChangeProps(selectedMethod);
  }, [selectedMethod]);

  const handleloadBankPse = async () => {
    try {
      const bankPse = await loadBankPse();
      setBankPse(bankPse);
    } catch (error) {
      console.error("Error al cargar el banco:", error);
    }
  };

  useEffect(() => {
    handleloadBankPse();
  }, []);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    const newFormData = { type: method };
    onFormDataChange(newFormData); // Notifica el cambio al padre
  };

  const methods = [
    {
      id: "CARD",
      // icon: <CreditCard className="w-12 h-12 text-pink-500" />,
      label: "Tarjeta de crédito\no débito",
      activeColor: "bg-white border",
      textColor: "text-gray-700",
    },
    {
      id: "PSE",
      // icon: <Landmark className="w-12 h-12 text-blue-500" />,
      label: "PSE",
      activeColor: "bg-white border",
      textColor: "text-gray-700",
    },
    {
      id: "BANCOLOMBIA_TRANSFER",
      // icon: <BanknotesIcon className="w-12 h-12 text-yellow-500" />,
      label: "Bancolombia",
      activeColor: "bg-white border",
      textColor: "text-gray-700",
    },
    {
      id: "NEQUI",
      label: "Nequi",
      activeColor: "bg-white border",
      textColor: "text-gray-700",
    },
  ];

    // Maneja el cambio de método de pago
    const onMethodChange = (method) => {
      setSelectedMethod(method);
      handleMethodChange(method);
  
      const resetData = {
        type: method,
        ...(method === "CARD" && {
          financialInstitutionCode: "0",
          userType: "PERSON",
          phoneNumber: "",
        }),
        ...(method === "PSE" && {
          number: "",
          cvc: "",
          expMonth: "",
          expYear: "",
          cardHolder: "",
          installments: "0",
          phoneNumber: "",
          userType: "",
          financialInstitutionCode: "0",
        }),
        ...(method === "BANCOLOMBIA_TRANSFER" && {
          financialInstitutionCode: "0",
          userType: "PERSON",
          number: "",
          cvc: "",
          expMonth: "",
          expYear: "",
          installments: "0",
          phoneNumber: "",
          cardHolder: "",
        }),
        ...(method === "NEQUI" && {
          number: "",
          cvc: "",
          expMonth: "",
          expYear: "",
          cardHolder: "",
          installments: "0",
          financialInstitutionCode: "0",
          userType: "PERSON",
        }),
      };
  
      // Actualiza `formValues` y llama a `onFormDataChange`
      setFormValues((prev) => {
        const updatedData = { ...prev, ...resetData };
        onFormDataChange(updatedData); // Envía los datos actualizados al padre
        return updatedData; // Devuelve el objeto actualizado
      });
    };


      const baseTemplate = {
        type: 'CARD',
        number: "",
        cvc: "",
        expMonth: "",
        expYear: "",
        cardHolder: "",
        installments: "0",
        phoneNumber: "",
        userType: "PERSON",
        financialInstitutionCode: "0",
      };
    
      const [formValues, setFormValues] = useState(baseTemplate); // Almacena valores del formulario
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
    
      const validateCardNumber = (value) => { 
        setLoading(true); // Mostrar loader
    
        if (value?.length !== 16) {
          setError("Por favor ingrese un número de tarjeta válido.");
          numberValid(false);
        } else {
          setError("");
          numberValid(true);
        }
        setLoading(false); // Ocultar loader
      };

      const validatePhoneNumber = (value) => { 
        if (value?.length !== 10) {
          setError("Por favor ingrese un número de teléfono válido.");
          phoneNumberValid(false);
        } else {
          setError("");
          phoneNumberValid(true);
        
      };
      };
    
      const handleInputChange = (field, value) => {
        if (field === "number") {
          setTimeout(() => {
            validateCardNumber(value);
          }, 100);
        }

        if (field === "phoneNumber") {
          setTimeout(() => {
            validatePhoneNumber(value);
          }, 100);
        }
        console.log("value", value);
        setFormValues((prev) => {
          // Si no tiene la plantilla del método actual, inicialízala
          const currentTemplate = {
            ...baseTemplate,
            type: selectedMethod,
          };
    
          const updatedData = { ...currentTemplate, ...prev, [field]: value }; // Aplica la plantilla y actualiza el campo específico
          onFormDataChange(updatedData); // Envía los datos actualizados al callback
          // console.log("updatedata2", updatedData);
          return updatedData; // Devuelve el objeto actualizado para actualizar el estado
        });
      };
    
    

  return { selectedMethod, bankPse, methods, onMethodChange, formValues, handleInputChange, error, loading, validateCardNumber };
};
