import { useState } from "react";

export const useLoaderModal = () => {
    const [loadingModal, setLoadingModal] = useState(false);

    const handleOpenLoaderModal = () => {
        setLoadingModal(true);
    };

    const handleCloseLoaderModal = () => {
        setLoadingModal(false);
    };

    return {
        loadingModal,
        handleOpenLoaderModal,
        handleCloseLoaderModal,
    };
};