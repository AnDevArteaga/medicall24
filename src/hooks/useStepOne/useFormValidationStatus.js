import { useState, useEffect } from "react";


export const useFormValidationStatus = (formData, confirmPassword, passwordError, formErrors, next) => {
const [isValid, setIsValid] = useState(false);


useEffect(() => {
  const { name1, lastName1, email, identification, password, typeId } =
    formData.user;
  const allFieldsValid =
    name1 &&
    lastName1 &&
    email &&
    identification &&
    typeId &&
    password &&
    !formErrors.email &&
    !formErrors.identification;
  const passwordsMatch = password === confirmPassword && !passwordError;

  setIsValid(allFieldsValid && passwordsMatch);
}, [formData, confirmPassword, passwordError, formErrors]);

useEffect(() => {
  next(isValid);
}, [isValid, next]);

};