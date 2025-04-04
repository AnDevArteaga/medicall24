import axios from "axios";
import { apiAzure_test, apiAzure } from "../config/apiConfig";

export const resendActivationCode = async (email) => {
    try {
        console.log("Email", email);
        const response = await axios.post(
            `${apiAzure}/Users/ResendActivationCode`,
            {
                email,
            },
        );
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.error("Error al activar la cuenta:", error);
        return error;
    }   
};

export const activateAccount = async (code) => {
    const body = {
        type: "string",
        validationCode: code,
    };
    console.log("body", body);
    try {
        console.log("Code", code);
        const response = await axios.post(
            `${apiAzure}/Patients/ActivateAccount`,
            {
                ...body,
            },
        );
        console.log("response", response);
        return response;
    } catch (error) {
        console.error("Error al activar la cuenta:", error);
        return error.response;
    }
};
