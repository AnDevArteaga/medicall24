import axios from "axios";
import { apiAzure_test } from "../config/apiConfig";
import { apiAzure } from "../config/apiConfig";

export const getDepartaments = async () => {
  try {
    const response = await axios.get(
      `${apiAzure_test}/Departments/ListDepartments`
    );
    // Limpiar nombres con espacios adicionales
    const cleanedDepartments = response.data.map((dept) => ({
      ...dept,
      nombre: dept.nombre.trim(), // Elimina espacios al inicio y final
    }));

    console.log("Departamentos limpios:", cleanedDepartments);

    return cleanedDepartments;
  } catch (error) {
    console.error("Error al cargar departamentos:", error);
  }
};

// Cargar municipios basados en el departamento seleccionado
export const getMunicipios = async (departamentoId) => {
  try {
    const response = await axios.get(
      `${apiAzure_test}/Departments/ListMunicipalties/${departamentoId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error al cargar municipios:", error);
  }
};

export const getInstitucionesId = async (id, tipo) => {
  try {

    const identificationCleaned = id.trim(); //
    const tipoCompleto = tipo === 'NI' ? tipo + 'T' : tipo

    const body = {
      identification: identificationCleaned,
      typeId: tipoCompleto,
    };
    console.log("body", body);
    const response = await axios.post(
      `${apiAzure}/Institutions/GetInstitution`,
      body,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        },
      }
    );
    console.log("Institution", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cargar instituciones:", error);
  }
};
