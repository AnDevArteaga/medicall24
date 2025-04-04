import axios from "axios";
import { apiSupabase } from "../config/apiConfig";

export const getAliados = async (product) => {
    const url = `${apiSupabase}/aliados_gestores?${
        product.id_aliado != null
            ? `id_aliado=eq.${product.id_aliado}&select=*`
            : "select=*"
    }`;
    try {
        const response = await axios.get(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization:
                    import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener aliados:", error);
    }
};

export const getAliadosLista = async () => {
    const url = `${apiSupabase}/aliados_gestores?select=*`;
    try {
        const response = await axios.get(url, {
            headers: {
                apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
                Authorization:
                    import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener aliados:", error);
    }
};
