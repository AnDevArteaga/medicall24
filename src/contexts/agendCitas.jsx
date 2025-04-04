import { createContext, useContext, useState } from "react";

// Crear el contexto
const AppointmentContext = createContext();

// Proveedor del contexto
export const AppointmentProvider = ({ children }) => {
  const [appointment, setAppointment] = useState({
    institutionsId: "",
    idSpecialist: 140,
    idSede: "",
    idProfessional: "",
    idTypeServices: 3,
    date: ""
  });
  const [cover, setCover] = useState("");
  const [institutions, setInstitutions] = useState({});

  return (
    <AppointmentContext.Provider value={{ appointment, setAppointment, cover, setCover, institutions, setInstitutions }}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppointment = () => {
  return useContext(AppointmentContext);
};
