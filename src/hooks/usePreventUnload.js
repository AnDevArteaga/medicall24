import { useState, useEffect } from 'react';

const usePreventUnload = () => {
  const [isDirty, setIsDirty] = useState(false);

  const handleBeforeUnload = (e) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = 'No has completado el proceso, ¿estás seguro de salir?';
    }
  };

  useEffect(() => {
    // Registrar el listener para el evento beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]); // Solo se activa cuando isDirty cambia

  return [isDirty, setIsDirty]; // Retornamos el estado y el setter para que puedan ser utilizados
};

export default usePreventUnload;
