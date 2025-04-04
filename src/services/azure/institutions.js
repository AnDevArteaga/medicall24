import axios from "axios";
import { apiAzure } from "../config/apiConfig";

export const listInstitutionsById = async (items) => {
    try {
        const responses = await Promise.all(
            items.map((item) =>
                axios.get(
                    `${apiAzure}/Institutions/GetInstitution/${item.id_institucion}`, 
            {
                headers: {
                    Authorization:
                        `Bearer ${import.meta.env.VITE_PATIENTS_TOKEN}`,
                },
            },
                )
            ),
        );
        console.log("responses", responses);
        const dataWithImage = responses.map((response, index) => ({
            ...items[index],
            cover: response.data.institution.cover,
        }));

        return dataWithImage;
    } catch (error) {
        console.error("Error al cargar instituciones:", error);
    }
};
