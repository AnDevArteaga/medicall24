import { useEffect, useState } from "react";
import {
    getProfessionalsByListSpecilists,
    getSedesByListSpecialists,
    getDaysAvailable,
    getHoursAvailable
} from "../services/azure/citas"; // Importa el endpoint
import { useAppointment } from "../contexts/agendCitas";

export const useAgendCita = (onclose) => {
    const { appointment, setAppointment, cover, institutions } = useAppointment();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedSede, setSelectedSede] = useState(null);
    const [professionals, setProfessionals] = useState([]);
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [view, setView] = useState("sedes");

    useEffect(() => {
        const fetchSedes = async () => {
            if (!appointment?.institutionsId || !appointment?.idSpecialist) {
                return;
            }

            console.log("Fetching data with:", {
                institutionsId: appointment.institutionsId,
                idSpecialist: appointment.idSpecialist,
            });

            setLoading(true);
            setError(null);
            try {
                const response = await getSedesByListSpecialists(
                    appointment.institutionsId,
                    appointment.idSpecialist,
                );
                console.log("Response received:", response);
                if (response === "No se encontraron resultados") {
                    setError(response);
                    setView("error");
                    return;
                }
                setData(response);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSedes();
    }, [appointment]);

    const handleViewBack = (view) => {
        setView(view);
    };

    const handleSedeSelect = async (sede) => {
        setSelectedSede(sede);
        setView("professionals");
        setLoading(true);
        setAppointment((prev) => ({ ...prev, idSede: sede.id }));
        try {
            const response = await getProfessionalsByListSpecilists(
                appointment.institutionsId,
                appointment.idSpecialist,
                sede.id,
            ); // Endpoint para obtener profesionales
            console.log("response", response);
            setProfessionals(response);
        } catch (error) {
            console.error("Error fetching professionals:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfesionalSelect = async (professional) => {
        setView("days");
        setLoading(true);
        console.log("professionalArray", professional);
        setAppointment((prev) => ({ ...prev, idProfessional: professional.id }));
        try {
            const response = await getDaysAvailable(
                appointment.institutionsId,
                appointment.idSpecialist,
                professional.id,
                appointment.idSede,
                appointment.idTypeServices
            ); // Endpoint para obtener profesionales
            console.log("response", response);
            setDays(response);
        } catch (error) {
            console.error("Error fetching professionals:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDaysSelect = async (days) => {
        setView("hours");
        setLoading(true);
        console.log("days", days);
        try {
            const response = await getHoursAvailable(
                appointment.institutionsId,
                appointment.idSpecialist,
                appointment.idProfessional,
                appointment.idSede,
                appointment.idTypeServices,
                days.date
            ); // Endpoint para obtener profesionales
            console.log("response", response);
            setHours(response);
        } catch (error) {
            console.error("Error fetching professionals:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setAppointment(null);
        setView("sedes");
        onclose();
    };

    return {
        data,
        loading,
        error,
        selectedSede,
        professionals,
        handleSedeSelect,
        handleProfesionalSelect,
        view,
        days,
        hours,
        handleDaysSelect,
        handleViewBack,
        handleClose,
        cover,
        appointment,
        institutions
        // handleHoursSelect
    };
};
