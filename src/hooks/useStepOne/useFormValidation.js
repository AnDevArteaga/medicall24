import { useState } from "react";

export const useFormValidation = (openAlertEmailModal) => {
    const [formErrors, setFormErrors] = useState({
        identification: "",
        email: "",
    });

    const validateIdentification = (value) => {
        if (!/^[0-9]*$/.test(value)) {
            setFormErrors((prev) => ({
                ...prev,
                identification: "La identificación solo debe contener números.",
            }));
        } else {
            setFormErrors((prev) => ({ ...prev, identification: "" }));
        }
    };

    const validateEmail = (value) => {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
            setFormErrors((prev) => ({
                ...prev,
                email: "Este campo debe contener un correo electrónico válido.",
            }));
        } else {
            setFormErrors((prev) => ({ ...prev, email: "" }));
        }
    };

    //Función para validar dominio del correo, con  el fin de evitar que se ingrese un correo mal escrito o incorrecto
    const validateDomainEmail = (value) => {
        const dominiosPermitidos = [
            "@yahoo.es",
            "@hotmail.com",
            "@gmail.com",
            "@emepece.com",
            "@yahoo.com",
            "@correo.unicordoba.edu.co",
            "@outlook.com",
            "@hotmail.es",
            "@prospectivus.co",
            "@live.com",
            "@outlook.es",
            "@nuevaeps.com.co"
        ];
        console.log("value", value);
        // Extraer la parte del dominio después del @
        const dominio = value.substring(value.indexOf("@"));
        console.log("dominio", dominio);
        if (!dominiosPermitidos.includes(dominio)) {
            openAlertEmailModal();
        }
        };

    return {
        formErrors,
        validateIdentification,
        validateEmail,
        validateDomainEmail,
    };
};
