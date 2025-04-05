import Aliados from "../../../Aliados/ListaAliados";
import { useEffect, useState, lazy } from "react";
import { getAliadosLista } from "../../../../../services/supabase/getAliados&Gestores";
import { listInstitutionsById } from "../../../../../services/azure/institutions";
// import { getListBexaAllies } from "../services/azure/citas";
import { useAppointment } from "../../../../../contexts/agendCitas";
import "../../../../../styles/noScroll.css";

const Modal = lazy(() => import("../../../../modals/agendCita/agendCita"));

const ListaAliados = () => {
    const { setAppointment, setCover, setInstitutions } = useAppointment();
    const [isOpen, setIsOpen] = useState(false); // Estado para el modal
    const [institutionsFromSupabase, setInstitutionsFromSupabase] = useState([]);
    const [institutionsWithCover, setInstitutionsWithCover] = useState([]);

    const handleGetAliados = async () => {
        try {
            const aliados = await getAliadosLista();
            console.log('aliados lista', aliados)
            setInstitutionsFromSupabase(aliados)
            console.log("aliados", aliados);
        } catch (error) {
            console.error("error al obtner aliados para lista", error);
        }
    };

    const handleOnSelect = (institutions) => {
        setAppointment((prev) => ({ ...prev, institutionsId: institutions.id_institucion })); // Setear el id en el contexto
        setCover(institutionsWithCover.find((item) => item.id_institucion === institutions.id_institucion).cover);
        setInstitutions(institutions);
        setIsOpen(true); // Abrir modal

    }
    useEffect(() => {
        handleGetAliados()
    }, []);

    const handleGetInstitutions = async () => {
        try {
            const dataCover = await listInstitutionsById(institutionsFromSupabase);
            console.log("dataCover", dataCover);
            setInstitutionsWithCover(dataCover);
        } catch (error) {
            console.error("Error al obtener las instituciones:", error);
        }
    };

    useEffect(() => {
        handleGetInstitutions();
    }, [institutionsFromSupabase]);

    const close = () => {
        setIsOpen(false);
        setAppointment({
            institutionsId: "",
            idSpecialist: 140,
            idSede: "",
            idProfessional: "",
            idTypeServices: 3,
            date: ""
        });
        setCover("");
        setInstitutions({});
    };

    useEffect(() => {
        // Agregar o quitar la clase `no-scroll` según el estado del modal
        if (isOpen) {
            document.body.classList.add("noScroll");
        } else {
            document.body.classList.remove("noScroll");
        }

        // Limpieza: Elimina la clase si el componente se desmonta
        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);

    return (
        <main>
            <Aliados items={institutionsWithCover} onSelect={handleOnSelect} type={'carrousel'} />
            <Modal isOpen={isOpen} onClose={close} />
        </main>
    );
};

export default ListaAliados;
