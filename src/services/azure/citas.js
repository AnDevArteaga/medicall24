import axios from "axios";
import { apiAzure_test, apiAzure } from "../config/apiConfig";


export const getListBexaAllies = async () => {
    try {
        const response = await axios.get(
            `${apiAzure_test}/Institutions/ListByBexaConsultation`,
            {
                headers: {
                    Authorization:
                        `Bearer ${import.meta.env.VITE_PATIENTS_TOKEN}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener los aliados:", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const getSedesByListSpecialists = async (
    institutionId,
    specialtyId,
) => {
    console.log("institutionId", institutionId);
    console.log("specialtyId", specialtyId);
    try {
        const response = await axios.post(
            `${apiAzure}/Sedes/ListBySpecialty`,
            {
                institutionId,
                specialtyId,
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${import.meta.env.VITE_PATIENTS_TOKEN}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener las sedes:", error);
        if (error.response.data.message === 'No se encontraron resultados') {
            return error.response.data.message;
        }
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const getProfessionalsByListSpecilists = async (
    institutionId,
    specialtyId,
    sedeId,
) => {
    try {
        console.log("institutionsId", institutionId);
        console.log("specialityId", specialtyId);
        console.log("sedeId", sedeId);
        const response = await axios.post(
            `${apiAzure}/Professionals/ListByInstitutionSpecialty`,
            {
                institutionId,
                specialtyId,
                sedeId,
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${import.meta.env.VITE_PATIENTS_TOKEN}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener los profesionales:", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const getDaysAvailable = async (
    institutionId,
    specialtyId,
    professionalId,
    sedeId,
    typeServiceId,
) => {
    try {
        console.log("institutionId", institutionId);
        console.log("specialtyId", specialtyId);
        console.log("professionalId", professionalId);
        console.log("sedeId", sedeId);
        console.log("typeServiceId", typeServiceId);
        const response = await axios.post(
            `${apiAzure}/Schedules/GetDaysAvailable`,
            {
                institutionId,
                specialtyId,
                professionalId,
                sedeId,
                typeServiceId,
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${import.meta.env.VITE_PATIENTS_TOKEN}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener los dias disponibles:", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const getHoursAvailable = async (
    institutionId,
    specialtyId,
    professionalId,
    sedeId,
    typeServiceId,
    date,
) => {
    try {
        console.log("institutionsId", institutionId);
        console.log("specialityId", specialtyId);
        console.log("professionalId", professionalId);
        console.log("sedeId", sedeId);
        console.log("typeServiceId", typeServiceId);
        console.log("date", date);
        const response = await axios.post(
            `${apiAzure}/Schedules/GetHoursAvailables`,
            {
                institutionId,
                specialtyId,
                professionalId,
                sedeId,
                typeServiceId,
                date,
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${import.meta.env.VITE_PATIENTS_TOKEN}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error("Error al obtener los horarios disponibles:", error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};
