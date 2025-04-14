import axios from "axios";
import { apiSupabase } from "../config/apiConfig";
import toast from "react-hot-toast";

export const registrarDatosAutorizacion = async (formData) => {
    console.log("formData", formData);
    try {
        const response = await axios.post(
            `${apiSupabase}/registro_usuario_credito`,
            formData,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization:
                        import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                    "Content-Type": "application/json",
                    Prefer: "return=minimal",
                },
            },
        );
        if (response.status === 201 || response.status === 200) {
            toast.success("Datos guardados correctamente");
        }

        console.log("response", response);

        return response.status;
    } catch (error) {
        console.error("Error al insertar los datos:", error);
        toast.error("Error al guardar los datos");
    }
};

export const obtenerDatosAutorizacion = async () => {
    try {
        const response = await axios.get(
            `${apiSupabase}/registro_usuario_credito?select=*`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization:
                        import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            },
        );
        if (response.status === 201 || response.status === 200) {
            toast.success("Datos obtenidos correctamente");
        }
        return response;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        toast.error("Error al obtener los datos");
    }
};

export const validarCodigoAutorizacion = async (code, identification) => {
    try {
        const response = await axios.get(
            `${apiSupabase}/registro_usuario_credito?identificacion_usuario=eq.${identification}&select=*`,
            {
                headers: {
                    apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                    Authorization:
                        import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
                },
            },
        );

        const registros = response.data;

        const esValido = registros.some(
            (item) =>
              item.codigo_credito === code &&
              item.identificacion_usuario === identification &&
              item.validado === true
          );

          return esValido;

    } catch (error) {
        console.error("Error al validar código:", error);
        toast.error("Código inválido");
        return false;

    }
};
 
