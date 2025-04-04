import { useState } from "react";

export const useModals = () => {
  const [isModalVerifiedMessageOpen, setIsModalVerifiedMessageOpen] = useState(false);
  const [isModalAlertEmailOpen, setIsModalAlertEmailOpen] = useState(false);


  const handleOpenVerifiedMessageModal = () => {
    setIsModalVerifiedMessageOpen(true);
  };
  const handleCloseVerifiedMessageModal = () => setIsModalVerifiedMessageOpen(false);

  const handleOpenAlertEmailModal = () => {
    setIsModalAlertEmailOpen(true);
  };
  const handleCloseAlertEmailModal = () => setIsModalAlertEmailOpen(false);


  return {
    isModalVerifiedMessageOpen,
    isModalAlertEmailOpen,
    handleCloseVerifiedMessageModal,
    handleOpenVerifiedMessageModal,
    handleOpenAlertEmailModal,
    handleCloseAlertEmailModal,
  };
};