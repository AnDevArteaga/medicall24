import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabaseClient";

const RutaProtegida = ({ children }) => {
    const [cargando, setCargando] = useState(true);
    const [autenticado, setAutenticado] = useState(false);

    useEffect(() => {
        const verificarSesion = async () => {
            const { data } = await supabase.auth.getSession();
            setAutenticado(!!data.session);
            setCargando(false);
        };

        verificarSesion();
    }, []);

    if (cargando) return null; // o spinner

    return autenticado ? children : <Navigate to="/iniciar-sesion" replace />;
};

export default RutaProtegida;
