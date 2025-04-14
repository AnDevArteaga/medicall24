import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLocalFormData } from "../../store/slices/dataAddSlice";
import { setFormData } from "../../store/slices/formDataSlice";
import { validarCodigoAutorizacion } from "../../services/supabase/saveDataCredit";


export const useUserData = (payload, departaments, fetchMunicipios, openAlertEmailModal, statusCodeAutorizationGeneral) => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({
    email: "",
  });
  const [localFormData, setLocalFormDataAdd] = useState({
    address: "",
    phone: "",
    email: "",
    departamento: "",
    municipio: "",
  });
  const [statusCodeAutorization, setStatusCodeAutorization] = useState(null);
  const [dataVerified, setDataVerified] = useState({});

  const errors = {
    typeId:
      "Para métodos de pago PSE, el tipo de identificación debe ser Cédula de Ciudadanía.",
  };


  const [enableField, setEnableField] = useState(false);

  useEffect(() => {
    if (
      dataVerified.type === "PSE" &&
      dataVerified.typeId !== "CC" &&
      dataVerified.typeId !== "NIT"
    ) {
      setDataVerified((prevData) => ({
        ...prevData,
        typeId: "", // Reinicia el typeId si no es válido
      }));
    }
  }, [dataVerified.type, dataVerified.typeId, setDataVerified]);

  const validateAndEnableField = () => {
    if (
      dataVerified.type === "PSE" &&
      dataVerified.typeId !== "CC" &&
      dataVerified.typeId !== "NIT"
    ) {
      setEnableField(true);
    } else {
      setEnableField(false);
    }
  };

  useEffect(() => {
    validateAndEnableField();
  }, [dataVerified]);



  
  // Sincronizar el estado local con `payload.user` solo cuando cambia
  useEffect(() => {
    if (payload.user) {
      const { email, address, phone } = payload.user;
      setLocalFormDataAdd((prevData) => ({
        ...prevData,
        email: email || "",
        address: address || "",
        phone: phone || "",
      }));
    }
  }, [payload.user]);





  let fullName = "";
  let fullLastName = "";

  if (payload.user) {
    const { name1, name2, lastName1, lastName2 } = payload.user;

    const names = [name1, name2].filter(Boolean).join(" ");
    const lastNames = [lastName1, lastName2].filter(Boolean).join(" ");

    fullName = names;
    fullLastName = lastNames;
  }
 



  // Validar correo electrónico
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


  useEffect(() => {
    if (payload.user) {
      const { email, address, phone } = payload.user;
      setLocalFormDataAdd((prevData) => ({
        ...prevData,
        email: email || "",
        address: address || "",
        phone: phone || "",
      }));
    }
  }, [payload.user]);

   // Manejar cambios en los campos address, phone, departamento y municipio
    const handleChange = (e) => {
      const { name, value } = e.target;
      // Validar email si se cambia
      if (name === "email") validateEmail(value);
      // Si cambia el departamento, cargar municipios y reiniciar municipio
  
      if (name === "departamento") {
        const departamentoId = departaments.find((d) => {
          return d.nombre === value;
        })?.id;
        fetchMunicipios(departamentoId);
        setLocalFormDataAdd((prevData) => {
          const updatedData = {
            ...prevData,
            departamento: value, // Actualizar departamento
            municipio: "", // Reiniciar municipio
          };
          dispatch(setLocalFormData(updatedData));
          return updatedData;
        });
        return; // Salir después de manejar departamento
      }
  
      // Actualizar localFormData para los demás campos (address, phone, municipio)
      setLocalFormDataAdd((prevData) => {
        const updatedData = {
          ...prevData,
          [name]: value,
        };
        // console.log("updatedData general", updatedData);
        dispatch(setLocalFormData(updatedData));
        return updatedData;
      });
    };


      // Pasar datos finales al componente padre
  const onFormDataChange = (data) => {
    const updatedData = {
      ...payload.user, // Mantener los datos previos
      ...data, // Combinar con los datos del formulario
    };
    // console.log("payload.user", payload.user);
    // console.log("data", data);
    // console.log("updatedata32", updatedData);
    setDataVerified(updatedData);
    // console.log(dataVerified);

    if (updatedData.type === "PSE") {
      // Validar tipo de identificación para PSE
      if (updatedData.typeId !== "CC" && updatedData.typeId !== "NIT") {
        setEnableField(true);
      } else {
        setEnableField(false);
      }
      setLocalFormDataAdd((prevData) => {
        const updatedData = {
          ...prevData,
          names: fullName || "",
          lastNames: fullLastName || "",
          typeId: "CC",
          identification: payload.user?.identification || "",
        };
        // console.log("updatedData general", updatedData);
        dispatch(setLocalFormData(updatedData));
        return updatedData;
      });
    } else {
      // Si no es PSE, establecer typeId como el valor predeterminado de payload.user
      setLocalFormDataAdd((prevData) => {
        const updatedData = {
          ...prevData,
          typeId: payload.user?.typeId || "",
          identification: payload.user?.identification || "",
          names: fullName || "",
          lastNames: fullLastName || "",
        };
        // console.log("updatedData general", updatedData);
        dispatch(setLocalFormData(updatedData));
        return updatedData;
      });
      setEnableField(false); // Deshabilitar si no es PSE
    }

    dispatch(setFormData(updatedData)); // Enviar los datos actualizados al padre
  };

  const validateCodeAutorization = async(code) => {
    console.log("code", code);
    console.log("id", payload.user.identification);
    const isValid = await validarCodigoAutorizacion(code, payload.user.identification);
    console.log("isValid", isValid);
    if (isValid) {
      setStatusCodeAutorization('valid');
    } else {
      setStatusCodeAutorization('invalid');
    }
    statusCodeAutorizationGeneral(statusCodeAutorization)
  }

  return { localFormData, handleChange, onFormDataChange, formErrors, validateEmail, enableField, errors, dataVerified, fullName, fullLastName, validateDomainEmail, validateCodeAutorization, statusCodeAutorization, setStatusCodeAutorization };
};
