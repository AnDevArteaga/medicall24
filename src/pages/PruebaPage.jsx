import StepOne from "../components/purchase/StepOne";

import "../styles/heightDinamic.css";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useDispatch } from "react-redux";
import { clearProduct } from "../store/slices/productSlice";

import ModalTerms from "../components/modals/TermAndConditions/Term&Cond";
import ModalConfirm from "../components/modals/DataUser/ConfirmData";
import { useEffect, useState } from "react";
import { userRegister } from "../services/azure/user";
import Modal from "../components/modals/StatusRegister/isRegisteredPrueba";
import ModalNotRegistered from "../components/modals/StatusRegister/isNotRegistered";
import Card from "../components/modals/Payment/cardData";
import CardVinculed from "../components/modals/cardVinculed";
import ModalAlertEmail from "../components/modals/alertEmail.jsx";
import { useModals } from "../hooks/modals/useModals.js";

const StepWizard = () => {
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({});
    const [modal, setModal] = useState(false);
    const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenCard, setIsModalOpenCard] = useState(false);
    const [isModalOpenCardVinculed, setIsModalOpenCardVinculed] = useState(
        false,
    );
    const [status, setStatus] = useState("");
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [showPasswordisUserRegistered, setShowPasswordisUserRegistered] =
        useState(true);

    const [errorRegisterMessage, setErrorRegisterMessage] = useState("");

    const [isModalOpenTerm, setIsModalOpenTerm] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [resetFieldRegister, setResetFieldRegister] = useState(false);

    const { isModalAlertEmailOpen, handleCloseAlertEmailModal, handleOpenAlertEmailModal } = useModals();

    useEffect(() => {
        const handleBeforeUnload = () => {
            dispatch(clearProduct());
        };

        // Agregar evento para antes de salir
        window.addEventListener("unload", handleBeforeUnload);

        // Limpieza del evento cuando el componente se desmonta
        return () => {
            window.removeEventListener("unload", handleBeforeUnload);
        };
    }, [dispatch]);

    //Efecto para detectar cuando se cierra el modal de registro exitoso y abrir el modal de tarjeta
    useEffect(() => {
        if (!isModalOpen && status === "success") {
            setTimeout(() => {
                setIsModalOpenCard(true);
            }, 100); // Pequeño delay para asegurar la actualización
        }
    }, [isModalOpen, status]);

    const OpenTerm = () => {
        setIsModalOpenTerm(true);
    };

    const handleAlertEmail = () => {
        handleOpenAlertEmailModal();
    };

    const onRegisterData = (data) => {
        setPayload(data);
        console.log("payload", payload);
    };

    const cardDataSubmit = (data) => {
        console.log("data", data);
        setIsModalOpenCardVinculed(true);
    };

    const fetchData = async () => {
        handleCloseModalConfirm();
        // Mostrar el modal con mensaje de "Cargando"
        setStatus("load");
        setIsModalOpen(true);

        try {
            // Realizar la petición POST con axios para registrar al usuario
            const response = await userRegister(payload);
            console.log("response", response);
            // Verificar si el registro fue exitoso
            if (response.status === 201 || response.status === 200) {
                setStatus("success");

        
                showPassword();
                const userId = response.data.id;
                setPayload((prevPayload) => ({
                    ...prevPayload,
                    user: {
                        ...prevPayload.user,
                        id: userId,
                    },
                }));
            } else {
                console.log("error", response);
                setStatus("error");

                setErrorRegisterMessage(response.response.data.message);
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setStatus("error");
        }
    };

    const registered = () => {
        setIsUserRegistered(false);
    };

    const handleCloseModalCardVinculed = () => {
        setIsModalOpenCardVinculed(false);
        setIsModalOpenCard(false);
        setResetFieldRegister(!resetFieldRegister);
    };

    const handleCloseModalCard = () => {
        setIsModalOpenCard(false);
    };

    const showPassword = () => {
        setShowPasswordisUserRegistered(true);
    };

    const modalOpen = (isUserRegistered) => {
        if (isUserRegistered) {
            setModal(true);
        } else {
            setModal(false);
        }
    };

    const onCloseIsRegistered = () => {
        setModal(false);
        setResetFieldRegister(!resetFieldRegister);
    };

    const next = (isValid) => {
        setIsValid(isValid);
    };

    const handleCloseModalConfirm = () => setIsModalOpenConfirm(false);

    const handleCloseModalTerm = () => setIsModalOpenTerm(false);

    const handleNextToConfirm = () => {
        handleCloseModalTerm();
        setIsModalOpenConfirm(true);
    };


    // Cerrar el modal y redirigir si es exitoso
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main>
            <>
                <Header />
                <div className="mt-4 relative w-full max-w-5xl mx-auto bg-white p-6 h-auto shadow-md rounded-md">
                    <p className="text-center text-4xl text-gray-600 sm:text-2xl mb-4">
                        Regístrate para acceder a la prueba gratuita
                    </p>

                    {/* Contenedor del formulario de registro */}
                    <StepOne
                        onRegisterData={onRegisterData}
                        modalOpen={modalOpen}
                        onSuccessfulRegistration={isUserRegistered}
                        registered={registered}
                        showPasswordisUserRegistered={showPasswordisUserRegistered}
                        openAlertEmailModal={handleAlertEmail}
                        next={next}
                        resetFieldRegister={resetFieldRegister}
                    />

                    {!isValid && (
                        <div className="animate-fade-in bg-gray-200 p-1 rounded-lg mt-4">
                            <h3 className="text-base font-bold text-pink-600 text-center">
                                Diligencia todos los campos para continuar
                            </h3>
                        </div>
                    )}

                    {/* Botón de registro */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={OpenTerm}
                            className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 transition-all disabled:opacity-50"
                            disabled={!isValid}
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
                <Footer />
            </>
            <CardVinculed
                isOpen={isModalOpenCardVinculed}
                onClose={handleCloseModalCardVinculed}
            />

            <Modal isOpen={modal} onClose={onCloseIsRegistered} />
            <Card
                isOpen={isModalOpenCard}
                onClose={handleCloseModalCard}
                cardDataSubmit={cardDataSubmit}
            />
            <ModalConfirm
                isOpenConfirm={isModalOpenConfirm}
                onCloseConfirm={handleCloseModalConfirm}
                payload={payload}
                registrar={fetchData}
            />
            <ModalTerms
                isOpenTerm={isModalOpenTerm}
                onCloseTerm={handleCloseModalTerm}
                NextToConfirm={handleNextToConfirm}
            />
            <ModalNotRegistered
                status={status}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                errorRegisterMessage={errorRegisterMessage}
                handleCloseModal={handleCloseModal}
            />

            <ModalAlertEmail
                isModalAlertEmailOpen={isModalAlertEmailOpen}
                handleCloseAlertEmailModal={handleCloseAlertEmailModal}
            />
        </main>
    );
};

export default StepWizard;
