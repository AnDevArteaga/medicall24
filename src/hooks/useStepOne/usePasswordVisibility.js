import { useState, useCallback } from "react";

export const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const toggleConfirmPasswordVisibility = useCallback(() => {
        setShowConfirmPassword((prev) => !prev);
    }, []);

    return {
        showPassword,
        togglePasswordVisibility,
        showConfirmPassword,
        toggleConfirmPasswordVisibility,
    };
};