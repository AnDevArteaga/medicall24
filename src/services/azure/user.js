import axios from "axios";
// import { apiAzure_test } from "../config/apiConfig";
import { apiAzure } from "../config/apiConfig";

export const fetchTypeIds = async () => {
    try {
        const response = await axios.get(
            `${apiAzure}/Users/GetTypeIdentification/paciente`,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar tipos de identificación:", error);
    }
};

export const userRegister = async (payload) => {
    try {
        // Realizar la petición POST con axios para registrar al usuario
        const response = await axios.post(`${apiAzure}/Patients`, payload);

        return response;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return error
    }
};

// Función para verificar si un usuario está registrado
export const checkUserRegistrationService = async (typeId, identification) => {
    try {
        const response = await axios.post(`${apiAzure}/Users/GetUser`, {
            typeId,
            identification,
        });
        return response.data.user; // Retorna el usuario si existe
    } catch (error) {
        console.error("Error al verificar el usuario:", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
