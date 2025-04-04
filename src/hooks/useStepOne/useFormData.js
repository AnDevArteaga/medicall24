import { useState, useEffect } from "react";

// Hook para manejar datos del formulario
export const useFormData = (onRegisterData, validateEmail, validateIdentification, resetFieldRegister) => {
    const [formData, setFormData] = useState({
        user: {
            identification: "",
            typeId: "",
            name1: "",
            name2: "",
            lastName1: "",
            lastName2: "",
            email: "",
            password: "",
        },
        epsId: null,
        regimenId: null,
    });

    useEffect(() => {
            setFormData({
                user: {
                    identification: "",
                    typeId: "",
                    name1: "",
                    name2: "",
                    lastName1: "",
                    lastName2: "",
                    email: "",
                    password: "",
                },
                epsId: null,
                regimenId: null,
            });
        
    }, [resetFieldRegister]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validar campos según el nombre
        if (name === "identification" && validateIdentification) {
            validateIdentification(value);
        }
        if (name === "email" && validateEmail) {
            validateEmail(value);
        }

        // Actualizar estado del formulario
        setFormData((prevData) => ({
            ...prevData,
            user: {
                ...prevData.user,
                [name]: value,
            },
        }));
    };

    useEffect(() => {
        onRegisterData(formData);
    }, [formData]);

    return {
        formData,
        handleChange,
        setFormData
    };
};
