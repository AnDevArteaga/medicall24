import axios from "axios";
import { apiSupabase } from "../config/apiConfig";

// Función para obtener códigos y productos
export const fetchCodigosXProductos = async () => {
  const url = `${apiSupabase}/codigos_x_productos?select=*`;

  try {
    const response = await axios.get(url, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
        Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
      },
    });

    const fecha_actual = new Date();
    const codigos_filtrados = response.data.filter((codigo) => {
      const fechaInicio = new Date(codigo.fecha_inicio);
      const fechaFin = new Date(codigo.fecha_fin);
    
      return (
        codigo.cuenta_compra <= codigo.compra_maxima &&
        fecha_actual >= fechaInicio && fecha_actual <= fechaFin && codigo.estado_producto
      ) 
    })

    return codigos_filtrados;
  } catch (error) {
    console.error("Error al obtener los códigos y productos:", error);
    throw error; 
  }
};

export const getProducts = async () => {
  const urlProducts = `${apiSupabase}/producto?select=*`;
  // Mapeo de nombres personalizados según el ID de producto
  const nombresPersonalizadosProductos = {
    17: "EXAMEN BEXA PARA DETECTAR MASAS EN MAMA",
    16: "PAQUETE DE SERVICIOS COMPLEMENTARIOS PARA DETECTAR CÁNCER DE MAMA",
  };

  try {
    const response = await axios.get(urlProducts, {
      headers: {
        apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_API,
        Authorization: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY_AUTH,
      },
    });
    // Mapea los productos y actualiza el campo nombre
    const productosActualizados = response.data.map((producto) => {
      return {
        ...producto,
        nombre:
          nombresPersonalizadosProductos[producto.id_producto] ||
          producto.nombre,
      };
    });
    return productosActualizados;
  } catch (error) {
    // Maneja errores
    console.error("Error al obtener productos:", error);
    throw error;
  }
};
