import {useState, useEffect} from "react";


// Hook para manejar contraseñas y validaciones
export const usePasswordValidation = (formData, setFormData, resetFieldRegister) => {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    useEffect(() => {
        setConfirmPassword("");
        setErrorMessage("");
        setPasswordError(false);
    }, [resetFieldRegister]);

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
    
        if (name === "password") {
          setFormData((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              [name]: value,
            },
          }));
    
          // Verificar inmediatamente si las contraseñas coinciden
          if (confirmPassword && value !== confirmPassword) {
            setPasswordError(true);
            setErrorMessage("Las contraseñas no coinciden.");
          } else if (confirmPassword && value === confirmPassword) {
            setPasswordError(false);
            setErrorMessage("");
          }
        }
    
        if (name === "confirmPassword") {
          setConfirmPassword(value);
    
          // Validar confirmación de contraseña
          if (value !== formData.user.password) {
            setPasswordError(true);
            setErrorMessage("Las contraseñas no coinciden.");
          } else {
            setPasswordError(false);
            setErrorMessage("");
          }
        }
      };
    
    return {
        confirmPassword,
        errorMessage,
        passwordError,
        handleChangePassword,
    };
};