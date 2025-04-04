import { useEffect, useState } from "react";
import {
    checkUserRegistrationService,
    fetchTypeIds,
} from "../../services/azure/user";

export const useFetchData = (formData, registered, modalOpen, setFormData, onSuccessfulRegistration, type) => {
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [typeIds, setTypeIds] = useState([]);

    const handleFetchTypeIds = async () => {
        try {
            const response = await fetchTypeIds();
            // console.log(response.data);
            setTypeIds(response);
        } catch (error) {
            console.error("Error al cargar tipos de identificación:", error);
        }
    };

    // Cargar tipos de identificación
    useEffect(() => {
        handleFetchTypeIds();
    }, []);

    const checkUserRegistration = async () => {
        const { typeId, identification } = formData.user;

        if (typeId && identification) {
            try {
                const DataUser = await checkUserRegistrationService(
                    typeId,
                    identification,
                );

                // console.log(DataUser);
                if (DataUser) {
                    setFormData((prev) => ({
                        ...prev,
                        user: {
                            ...prev.user,
                            id: DataUser.id,
                            identification: DataUser.identification,
                            typeId: DataUser.typeId,
                            name1: DataUser.name1,
                            name2: DataUser.name2,
                            lastName1: DataUser.lastname1,
                            lastName2: DataUser.lastname2,
                            email: DataUser.email,
                            password: DataUser.password,
                        },
                    }));

                    // console.log("modal", true);
                    if (type === "Compra") {
                        console.log("compra");
                    setIsUserRegistered(true);
                    registered();}

                    modalOpen(true);
                } else {
                    setIsUserRegistered(false);
                    modalOpen(false);
                }
            } catch (error) {
                console.error("Error al verificar el usuario:", error);
            }
        }
    };

    useEffect(() => {
        setIsUserRegistered(onSuccessfulRegistration);
      }, [onSuccessfulRegistration]);

    return {
        isUserRegistered,
        typeIds,
        checkUserRegistration,
    };
};
