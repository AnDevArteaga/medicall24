import axios from "axios";
import { apiSupabase } from "../config/apiConfig";



export const registroCompra = async (order) => {
    console.log("registerTemplateParaGuardar", order);
    try {
      const response = await axios.post(
        `${apiSupabase}/registro_compra`,
        order,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
            Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
        }
      );
      console.log("response", response);
      if (response.status === 201 || response.status === 200) {
        console.log("Datos insertados correctamente");
      }
      return response.status
    } catch (error) {
      console.error("Error al insertar los datos:", error);
    }
  };
