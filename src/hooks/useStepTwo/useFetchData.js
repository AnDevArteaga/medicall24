import { useState, useEffect } from "react";
import { getDepartaments, getMunicipios } from "../../services/azure/getLocation";
import { fetchTypeIds } from "../../services/azure/user";


export const useFetchData = (getDepartamentos) => {
  const [departaments, setDepartaments] = useState([]);
  const [municipios, setMunicipios] = useState([])
  const [typeIds, setTypeIds] = useState([]);

  const handleFetchTypeIds = async () => {
    try {
      const response = await fetchTypeIds();
      // console.log(response);
      setTypeIds(response);
    } catch (error) {
      console.error("Error al cargar tipos de identificación:", error);
    }
  };

    const fetchDepartaments = async () => {
      try {
        const response = await getDepartaments();
        setDepartaments(response);
        getDepartamentos(response);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      }
    };

  useEffect(() => {
    handleFetchTypeIds();
    fetchDepartaments();
  }, []);

  const fetchMunicipios = async (departamentoId) => {
    try {
      const response = await getMunicipios(departamentoId);
      setMunicipios(response);
    } catch (error) {
      console.error("Error al cargar municipios:", error);
    }
  };

  return { departaments, municipios, fetchMunicipios, typeIds };
};
