import { useState, useEffect } from "react";
import { getMunicipios, getInstitucionesId } from "../services/azure/getLocation";

export const useTermsModalLogic = ({
  aliados,
  departamentos,
  savedAliados,
  infoToModalPayment,
  isOpenTerm,
  onCloseTerm,
  dataPayment,
  saveDataAliadoEmail,
  resetFields,
  product
}) => {
  const [loading, setLoading] = useState(false);
  const [municipios, setMunicipios] = useState([]);
  const [aliadosModal, setAliadosModal] = useState([]);

  // Estado para guardar los datos del aliado seleccionado (Direccion y telefono, requerido en un endpoint)
  const [infoAliado, setInfoAliado] = useState({});
  // Estado para guardar los datos del departamento, municipio y aliado seleccionado, cuando el aliado tambien es gestor
  const [selectedAliado, setSelectedAliado] = useState({
    departamento: "",
    municipio: "",
    aliado: "",
  });
  // Estado para guardar todos los datos del aliado necesario para enviar el email
  const [selectedAliadoEmail, setSelectedAliadoEmail] = useState({
      nombre_institucion: "",
      telefono_institucio: "",
      direccion_institucion: "",
      ciudad_institucion: "",
      departamento_institucion: "",
      pais_institucion: "COLOMBIA",
  });

  // Esto es solo para cuando el aliado tambien es gestor
  const saveInfoModalPayment = (info) => {
    if (product.id_aliado && product.id_aliado !== null) {
      setSelectedAliado({
        departamento: info.departamento,
        municipio: info.municipio,
        aliado: aliados[0].nombre_prestador || "",
      });
      savedAliados(aliados[0].id_aliado);
      handleGetInstitucionesId(aliados[0].num_identificacion, aliados[0].tipo_identificacion, info);
      console.log('nombre', aliados[0].nombre_prestador)
      setSelectedAliadoEmail((prevState) => ({
      
        ...prevState,
        nombre_institucion: aliados[0].nombre_prestador,
        ciudad_institucion: info.municipio,
        departamento_institucion: info.departamento
      }));
    }
  };

  const handleGetInstitucionesId = async (id, tipo) => {
    try {
      const response = await getInstitucionesId(id, tipo);
      setInfoAliado({
        address: response.address,
        phone: response.phone1,
      });
      setSelectedAliadoEmail((prevData) => ({
        ...prevData,
        direccion_institucion: response.address,
        telefono_institucio: response.phone1,
      }));
    } catch (error) {
      console.error("Error al cargar instituciones:", error);
    }
  };

  useEffect(() => {
    if (isOpenTerm) {
      saveInfoModalPayment(infoToModalPayment);
    }
  }, [isOpenTerm]);

  useEffect(() => {
    resetData()
    console.log("Campos reseteados en TermsModal");
    // Aquí reseteas los campos del modal
  }, [resetFields]); // Se ejecuta cuando `resetFields` cambia


  const handleLoadMunicipios = async (departamentoId) => {
    if (!departamentoId) return;
    try {
      const data = await getMunicipios(departamentoId);
      const municipiosFiltrados = data.filter((municipio) =>
        aliados.some((aliado) => aliado.id_municipio === parseInt(municipio.id))
      );
      setMunicipios(municipiosFiltrados);
    } catch (error) {
      console.error("No se pudieron cargar los municipios:", error);
    }
  };

  // Manejo cuando cambio el departamento
  const handleChange = async (e) => {
    
    const value = e.target.value;
   console.log('value', value)
    if (!value) {
      setMunicipios([]);
      setAliadosModal([]);
      setInfoAliado({});
    } else {
      setSelectedAliadoEmail( (prevData) => ({
        ...prevData,
        departamento_institucion: value,
      }));
      const departamentoId = departamentos.find((d) => d.nombre === value)?.id;
      if (departamentoId) await handleLoadMunicipios(departamentoId);
    }
  };

  // Manejo cuando cambio el municipio
  const handleChangeMunicipio = (e) => {
    const [id, nombre] = e.target.value.split("-");
    console.log('municipioSeleccionado', id, nombre)
    if (!id || id === "Selecciona") {
      setAliadosModal([]);
      setInfoAliado({});
    } else {
      const aliadosFiltrados = aliados.filter(
        (aliado) => aliado.id_municipio === parseInt(id)
      );
      setAliadosModal(aliadosFiltrados);
      setSelectedAliadoEmail((prevData) => ({
        ...prevData,
        ciudad_institucion: nombre,
      }));
    }
  };

  // Manejo cuando cambio el aliado
  const handleChangeAliado = (e) => {
    const { value } = e.target;
    const [id, tipo, id_aliado, nombre] = value.split("-");
    if (!value) {
      setInfoAliado({});
    }
    handleGetInstitucionesId(id, tipo);

    savedAliados(id_aliado);
    setSelectedAliadoEmail((prevData) => ({
      ...prevData,
      nombre_institucion: nombre,

    }));
    console.log('selectedAliado', selectedAliado)

  };

  // Efecto para guardar los datos del aliado seleccionado, en el objeto de registro compra del padre
  useEffect(() => {
    if (selectedAliadoEmail) {
      console.log('selectedemail', selectedAliadoEmail)
      saveDataAliadoEmail(selectedAliadoEmail);
    }
  }, [selectedAliadoEmail]);

  // Funcion para pasar al siguiente paso, se ejecuta la funcion datapayment en el padre
  const handleNext = () => {
    dataPayment();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  // Funcion para cerrar el modal, se resetean los estados 
  const funcOnCloseTerm = () => {
    resetData()
  };

  // Validacion de los campos
  const validate =
    selectedAliadoEmail.departamento_institucion &&
    selectedAliadoEmail.departamento_institucion !== "Selecciona" &&
    selectedAliadoEmail.ciudad_institucion &&
    selectedAliadoEmail.ciudad_institucion !== "Selecciona" &&
    selectedAliadoEmail.nombre_institucion &&
    selectedAliadoEmail.nombre_institucion !== "Selecciona";
    selectedAliadoEmail.direccion_institucion &&
    selectedAliadoEmail.telefono_institucio

  const resetData = () => {
    setSelectedAliado({
      departamento: "",
      municipio: "",
      aliado: "",
    });
  setSelectedAliadoEmail({
    nombre_institucion: "",
    telefono_institucio: "",
    direccion_institucion: "",
    ciudad_institucion: "",
    departamento_institucion: "",
    pais_institucion: "COLOMBIA",
  });
  setInfoAliado({});
  onCloseTerm();
  setMunicipios([]);
  setAliadosModal([]);
}

  return {
    loading,
    municipios,
    aliadosModal,
    infoAliado,
    selectedAliado,
    handleChange,
    handleChangeMunicipio,
    handleChangeAliado,
    saveInfoModalPayment,
    validate,
    setLoading,
    setMunicipios,
    setAliadosModal,
    setInfoAliado,
    setSelectedAliado,
    handleNext,
    funcOnCloseTerm,
    selectedAliadoEmail
  };
};
