import { useState } from 'react';

const useRedirectButton = (initialLabel) => {
  const [buttonText, setButtonText] = useState(initialLabel);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (newText, resetDelay) => {
    if (isDisabled) return;

    if (buttonText !== 'Colombia') {
    setIsDisabled(true);
    setIsTransitioning(true);

    // Cambiar el texto a "Próximamente"
    setTimeout(() => {
      setButtonText(newText);
      setIsTransitioning(false);
    }, 200);

    // Restaurar el texto original después del delay
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setButtonText(initialLabel);
        setIsTransitioning(false);
        setIsDisabled(false);
      }, 200);
    }, resetDelay);
  }
  };

  return {
    buttonText,
    isTransitioning,
    handleClick,
  };
};

export default useRedirectButton;
