import StepOne from "../components/purchase/StepOne";
import StepTwo from "../components/purchase/StepTwo";
import StepThree from "../components/purchase/StepThree";
import Stepper from "../components/common/Stepper";
import Modal from "../components/modals/StatusRegister/isRegistered";
import ModalNotRegistered from "../components/modals/StatusRegister/isNotRegistered";
import ModalTerms from "../components/modals/TermAndConditions/Term&Cond";
import ModalConfirm from "../components/modals/DataUser/ConfirmData";
import ModalBilling from "../components/billing/e-billing";
import ModalVerifiedMessage from "../components/modals/verifiedMessage.jsx";
import ModalAlertEmail from "../components/modals/alertEmail.jsx";
import "../styles/heightDinamic.css";
// import Finally from "../components/finally/FinallyVoucher";
import pse from "../json/formPse.json";
import nequi from "../json/formNequi.json";
import card from "../json/formCard.json";
import ban from "../json/formBancolombia.json";
import registro from "../json/registro_compra.json";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedFormDataPaid } from "../store/slices/paidObject";
import { clearProduct } from "../store/slices/productSlice";
import usePreventUnload from "../hooks/usePreventUnload.js";
import ModalPayment from "../components/modals/Payment/ModalPayment";
import BuyFailed from "../components/modals/Payment/BuyFailed";
import RestrictedAccess from "../components/NotFound/RestrictedAccessPayment";

import { lazy, Suspense, useEffect, useState } from "react";
import { userRegister } from "../services/azure/user";
import { activateAccount, resendActivationCode } from "../services/azure/activateAccount.js";
import {
  checkAsyncPaymentUrl,
  getOrder,
  performPurchase,
} from "../services/azure/payment";
import { registroCompra } from "../services/supabase/registroCompra";
import { getMunicipios as getMunicipiosFetch } from "../services/azure/getLocation";
import { getAliados } from "../services/supabase/getAliados&Gestores";

import { useModals } from "../hooks/modals/useModals.js";
import { useLoaderModal } from "../hooks/useLoaderModal.js";

const StepWizard = () => {
  const {
    isModalVerifiedMessageOpen,
    isModalAlertEmailOpen,
    handleOpenVerifiedMessageModal,
    handleCloseVerifiedMessageModal,
    handleOpenAlertEmailModal,
    handleCloseAlertEmailModal,
  } = useModals();

  const { loadingModal, handleOpenLoaderModal, handleCloseLoaderModal } =
    useLoaderModal();

  const [resetFields, setResetFields] = useState(false);
  const [isDirty, setIsDirty] = usePreventUnload();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [payload, setPayload] = useState({});
  const [modal, setModal] = useState(false);
  const [isModalOpenTerm, setIsModalOpenTerm] = useState(false);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formDataPayment, setFormDataPayment] = useState({});
  const [transaction, setTransaction] = useState(null);
  const [paidObject, setPaidObject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [stepClass, setStepClass] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const [isModalOpenPayment, setIsModalOpenPayment] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showPasswordisUserRegistered, setShowPasswordisUserRegistered] =
    useState(true);
  const [productWithDiscount, setProductWithDiscount] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [registerTemplate, setRegisterTemplate] = useState({});
  const [dataSaved, setDataSaved] = useState({});
  const [aliados, setAliados] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [infoToModalPayment, setInfoToModalPayment] = useState({});
  const [restrictedAccess, setRestrictedAcces] = useState(false);
  const [errorRegisterMessage, setErrorRegisterMessage] = useState("");
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [isModalOpenBilling, setIsModalOpenBilling] = useState(false);
  const [methodClass, setMethodClass] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [statusCodeAutorizationGeneralData, setStatusCodeAutorizationGeneralData] = useState(null);


  const Finally = lazy(() =>
    import("../components/purchase/purchaseCompleted.jsx")
  );
  const formData = useSelector((state) => state.formData.formData);
  const localFormData = useSelector((state) => state.localFormData);
  const product = useSelector((state) => state.product.selectedProduct);

  const combinedFormData = {
    ...formData,
    ...localFormData,
  };

  const getDepartamentos = (data) => {
    setDepartamentos(data);
  };


  useEffect(() => {
    statusCodeAutorizationGeneral()
  }, [statusCodeAutorizationGeneralData]);

  const statusCodeAutorizationGeneral = (statusCodeAutorization) => {
    setStatusCodeAutorizationGeneralData(statusCodeAutorization);
  };


  const getMunicipios = (data) => {
    if (aliados.length === 1) {
      const mun = aliados[0].id_municipio; // ID del municipio
      const dep = aliados[0].id_departamento;
      // console.log("departamentos", departamentos);
      // Verificar si existe un ID de municipio
      if (data) {
        // Buscar el municipio correspondiente al ID
        const munSelected = data.find((m) => m.id === mun).nombre;
        const DepSelected = departamentos.find(
          (d) => d.id === String(dep),
        )?.nombre;
        console.log("munSelected", munSelected);
        console.log("DepSelected", DepSelected);

        setInfoToModalPayment({
          departamento: DepSelected,
          municipio: munSelected,
        });
      }
    }
  };

  // Cargar municipios basados en el departamento seleccionado
  const getMunicipiosToModalPayment = async (departamentoId) => {
    try {
      console.log(departamentoId);
      const response = await getMunicipiosFetch(departamentoId);
      console.log("haola", response);
      getMunicipios(response);
    } catch (error) {
      console.error("Error al cargar municipios:", error);
    }
  };

  const fetchAliados = async () => {
    try {
      const response = await getAliados(product);
      // Procesa la respuesta
      setAliados(response);
      console.log("aliados:", response);
    } catch (error) {
      // Maneja errores
      console.error("Error al obtener los códigos y productos:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!product) {
      setRestrictedAcces(true);
    }
  }, []);

  useEffect(() => {
    if (product) {
      fetchAliados();
    }
  }, []);

  useEffect(() => {
    console.log("registerTemplateEffect", registerTemplate);
    setDataSaved(registerTemplate);
    // console.log("dataSaved", dataSaved);
  }, [registerTemplate]);

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

  useEffect(() => {
    if (product) {
      const json = updateJsonWithLocalFormData(localFormData);
      setRegisterTemplate(json);
      // console.log("registerTemplateNuevo", registerTemplate);
    }
  }, [localFormData]);

  const handleDataBilling = (data) => {
    // Plantilla inicial del JSON
    const jsonTemplate = registerTemplate;
    // Aquí defines cómo mapear los datos del payload al JSON
    const updatedJson = {
      ...jsonTemplate,
      tipopersona_factura: data.tipopersona_factura,
      tipoid_factura: data.tipoid_factura,
      numid_factura: data.numid_factura,
      dv_factura: data.dv_factura,
      nombre_factura: data.nombre_factura,
      direccion_factura: data.direccion_factura || "0",
      correo_factura: data.correo_factura,
      pais_factura: "Colombia",
      num_factura: 0,
      envio_factura: false,
    };

    console.log("updatedJson", updatedJson);
    setRegisterTemplate(updatedJson);
  };

  const InfoProductEmail = {
    terminos: {
      17: "1",
      16: "2",
    },
    banner: {
      17:
        "https://medicall24.com.co/wp-content/uploads/2025/01/Examen-Bexa.jpg",
      16:
        "https://medicall24.com.co/wp-content/uploads/2025/02/Paquete-Tamizaje.jpg",
    },
  };

  const saveDataAliadoEmail = (data) => {
    console.log("data", data);
    // Plantilla inicial del JSON
    console.log("producto informacion", productInfo);
    const jsonTemplate = registerTemplate;
    // Aquí defines cómo mapear los datos del payload al JSON
    const updatedJson = {
      ...jsonTemplate,
      telefono_institucio: data.telefono_institucio,
      direccion_institucion: data.direccion_institucion,
      ciudad_institucion: data.ciudad_institucion,
      dpto_institucion: data.departamento_institucion,
      pais_institucion: data.pais_institucion,
      nombre_institucion: data.nombre_institucion,
      producto: productInfo.nombre,
      link_terminos: `https://appmedicall24.com/terminos-y-condiciones/${
        InfoProductEmail.terminos[product.id_producto] || ""
      }`,
      // link_pasos: `https://appmedicall24.com/pasos-bexa`,
      link_ayuda: InfoProductEmail.banner[product.id_producto],
    };

    console.log("updatedJson", updatedJson);
    setRegisterTemplate(updatedJson);
  };

  useEffect(() => {
    if (product) {
      console.log("product", product);
      setProduct(product);
    }
  }, [product]);

  const setProduct = (product) => {
    console.log("product en setProduct", product);
    if (product.id_producto_pago) {
      setProductInfo({
        id_producto: product.id_producto,
        nombre: product.producto,
        discount: product.procentaje_descuento_compra,
      });
      setProductWithDiscount(true);
    } else if (product.id_producto) {
      setProductInfo({
        id_producto: product.id_producto,
        nombre: product.nombre,
        discount: product.procentaje_descuento_compra,
      });
    } else {
      console.error("El objeto no contiene un id válido.");
    }
  };

  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, []);

  const validateCardNumber = (data) => {
    console.log("data", data);
    setCardNumberValid(data);
  };

  const validatePhoneNumber = (data) => {
    console.log("data", data);
    setPhoneNumberValid(data);
  };

  const validateFormData = () => {
    const type = formData.type || "CARD";
    // console.log("formData", formData);
    // console.log("localFormData", localFormData);
    // Validación para "PSE"
    if (type === "PSE") {
      return (
        formData.userType &&
        formData.financialInstitutionCode &&
        formData.financialInstitutionCode !== "0" &&
        localFormData.address &&
        localFormData.phone &&
        localFormData.departamento &&
        localFormData.municipio &&
        localFormData.names &&
        localFormData.lastNames &&
        localFormData.typeId === "CC"
      );
    }

    // Validación para "card"
    if (type === "CARD") {
      return (
        formData.number &&
        formData.cardHolder &&
        formData.expMonth &&
        formData.expYear &&
        formData.installments &&
        formData.cvc &&
        localFormData.address &&
        localFormData.phone &&
        localFormData.departamento &&
        localFormData.municipio &&
        cardNumberValid
      );
    }

    // Validación para "ban" (puedes añadir más campos según sea necesario)
    if (type === "BANCOLOMBIA_TRANSFER") {
      return (
        localFormData.address &&
        localFormData.phone &&
        localFormData.departamento &&
        localFormData.municipio
      );
    }

    if (type === "NEQUI") {
      return (
        formData.phoneNumber && localFormData.phone && localFormData.address && localFormData.departamento &&
        localFormData.municipio && phoneNumberValid
      );
    }

    if (type === "MEDDIPAY") {
      return ( formData.meddipayAuthorization && localFormData.address && localFormData.departamento &&
        localFormData.municipio && localFormData.phone && statusCodeAutorizationGeneralData === 'valid' );
    }

    // Agregar validaciones para otros tipos si es necesario
    return false;
  };

  const isButtonDisabled = !validateFormData();

  const updateNestedField = (obj, key, value) => {
    for (const field in obj) {
      if (field === key) {
        obj[field] = value;
      } else if (typeof obj[field] === "object" && obj[field] !== null) {
        updateNestedField(obj[field], key, value);
      }
    }
  };

  const preparePaymentData = () => {
    console.log("producto en preparacion", product);
    const type = combinedFormData.type || "CARD"; // Obtener el tipo de pago del objeto recibido

    // Seleccionar la plantilla adecuada según el tipo
    let template = null;
    if (type === "PSE") {
      template = pse;
    } else if (type === "CARD") {
      template = card;
    } else if (type === "BANCOLOMBIA_TRANSFER") {
      template = ban;
    } else if (type === "NEQUI") {
      template = nequi;
    }
    // Crear y actualizar la plantilla con los datos de combinedFormData
    const updatedFormData = JSON.parse(JSON.stringify(template));

    if (combinedFormData) {
      // Campos específicos
      if (combinedFormData.typeId) {
        updateNestedField(
          updatedFormData,
          "userLegalIdType",
          combinedFormData.typeId,
        );
      }

      if (combinedFormData.identification) {
        updateNestedField(
          updatedFormData,
          "userLegalId",
          combinedFormData.identification,
        );
      }

      const combinedNames = [combinedFormData.name1, combinedFormData.name2]
        .filter(Boolean)
        .join(" ");
      const combinedLastNames = [
        combinedFormData.lastName1,
        combinedFormData.lastName2,
      ]
        .filter(Boolean)
        .join(" ");

      updateNestedField(updatedFormData, "names", combinedNames);
      updateNestedField(updatedFormData, "lastNames", combinedLastNames);
    }

    // Actualizar el campo productId
    // if (product.id_producto_pago) {
    //   updateNestedField(updatedFormData, "productId", product.id_producto_pago);
    // } else if (product.id_producto) {
    //   updateNestedField(updatedFormData, "productId", product.id_producto);
    // }

    if (product.id_producto) {
      updateNestedField(updatedFormData, "productId", product.id_producto);
    }

    if (!updatedFormData.phoneNumber && combinedFormData.phone) {
      updateNestedField(updatedFormData, "phoneNumber", combinedFormData.phone);
    }

    if (combinedFormData.email) {
      updatedFormData.email = combinedFormData.email;
    }

    if (product.procentaje_descuento_compra) {
      console.log(
        "product.porcentaje_descuento_compra",
        product.procentaje_descuento_compra,
      );
      updateNestedField(
        updatedFormData,
        "discount",
        product.procentaje_descuento_compra,
      );
    }

    // Actualizar todos los demás campos genéricos
    for (const [key, value] of Object.entries(combinedFormData)) {
      updateNestedField(updatedFormData, key, value);
    }
    return updatedFormData;
  };

  const dataPayment = () => {
    // Procesar los datos fuera del setFormDataPayment
    const updatedFormData = preparePaymentData();
    // console.log("updatedFormData", updatedFormData);

    // Usar el resultado procesado para actualizar el estado y despachar acciones
    setFormDataPayment(updatedFormData);
    dispatch(setUpdatedFormDataPaid(updatedFormData));
    setPaidObject(updatedFormData);
    setPaymentMethod(updatedFormData.paymentMethod.type);

    // const json = addPaymentMethod(updatedFormData.paymentMethod.type)
    // setRegisterTemplate(json)
    // console.log("registerTemplatefinal", registerTemplate);

    // Proceder al siguiente paso después de un tiempo
    setTimeout(() => {
      console.log("paidObject", updatedFormData);
      setIsModalOpenPayment(false);
      nextStep();
    }, 2000);
  };

  const loadPayloadToFormData = (payload) => {
    setFormDataPayment((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      // Copiar valores específicos al formulario
      if (payload.typeId) {
        updateNestedField(updatedFormData, "userLegalIdType", payload.typeId);
      }
      if (payload.identification) {
        updateNestedField(
          updatedFormData,
          "userLegalId",
          payload.identification,
        );
      }

      // Combinar nombres y apellidos del payload
      const combinedNames = [payload.name1, payload.name2]
        .filter(Boolean)
        .join(" ");
      const combinedLastNames = [payload.lastName1, payload.lastName2]
        .filter(Boolean)
        .join(" ");

      updateNestedField(updatedFormData, "names", combinedNames);
      updateNestedField(updatedFormData, "lastNames", combinedLastNames);

      // Actualizar con el resto de los campos del payload
      for (const [key, value] of Object.entries(payload)) {
        updateNestedField(updatedFormData, key, value);
      }
      return updatedFormData;
    });
  };

  const next = (isValid) => {
    if (!isValid) {
      setDisabled(true);
    } else {
      setDisabled(false);
      setValid(true);
    }
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    if (currentStep === 3) setResetFields((prev) => !prev);
    // Call the reset function when currentStep is 3
  };
  const onRegisterData = (data) => {
    setPayload(data);
    loadPayloadToFormData(data);
    console.log("payload", payload);
    const json = updateJsonWithPayload(payload);
    // console.log("json", json);
    setRegisterTemplate(json);
    // console.log("registerTemplate", registerTemplate);
  };

  const updateJsonWithPayload = (payload) => {
    // Plantilla inicial del JSON
    const jsonTemplate = registro;

    // Aquí defines cómo mapear los datos del payload al JSON
    const updatedJson = {
      ...jsonTemplate,
      identificacion_comprador: payload.user?.identification || null,
      nombre_comprador: `${payload.user?.name1 || ""} ${
        payload.user?.name2 || ""
      } ${payload.user?.lastName1 || ""} ${payload.user?.lastName2 || ""}`
        .trim(),
      email_comprador: payload.user?.email || null,
      id_usuario_medicall: payload.user?.id || 0,
    };

    return updatedJson;
  };

  const updateJsonWithLocalFormData = (localFormData) => {
    if (product.codigo_promocional) {
      // console.log("codigo_promocional", product.codigo_promocional);
    }
    // Plantilla inicial del JSON
    const jsonTemplate = registerTemplate;
    console.log("productInfo", product);
    // Aquí defines cómo mapear los datos del payload al JSON
    const updatedJson = {
      ...jsonTemplate,
      direccion_comprador: localFormData.address || null,
      departamento_comprador: localFormData.departamento || null,
      ciudad_comprador: localFormData.municipio || null,
      telefono_comprador: localFormData.phone || null,
      email_comprador: localFormData.email || null,
      id_producto: product.id_producto || 0,
      id_codigo_promo: product.id_codigo || 0,
      id_gestor: product.id_gestor || 0,
      porcentaje_comision_gestor: product.porcentaje_gestor || 0,
    };

    if (product.codigo_promocional) {
      // console.log("codigo_promocional", product.codigo_promocional);

      return {
        ...updatedJson,
        id_codigo_promo: product.id_codigo_promo,
      };
    }

    return updatedJson;
  };

  const savedAliados = (data) => {
    // console.log("data", data);
    const jsontemplate = registerTemplate;

    const updatedJson = {
      ...jsontemplate,
      id_aliado: parseInt(data),
      link_pasos: `https://appmedicall24.com/pasos-bexa/${data}`,
    };
    setRegisterTemplate(updatedJson);
    // console.log("registerTemplate", registerTemplate);
  };

  const updateJsonWithOrder = (
    trId,
    paymentMethod,
    status,
    description,
    ip,
  ) => {
    const templatejson = registerTemplate;
    // Plantilla inicial del JSON
    if (trId && paymentMethod && status) {
      console.log(
        "Información de pago obtenida:",
        trId,
        paymentMethod,
        status,
        description,
        ip,
      );
      // Aquí defines cómo mapear los datos del payload al JSON
      const updatedJson = {
        ...templatejson,
        id_transaccion: trId,
        fecha_pago: new Date().toISOString(),
        fecha_compra: new Date().toISOString(),
        metodo_pago: paymentMethod,
        estado_transaccion: status,
        descripcion_compra: description,
        ip_transaccion: ip,
      };
      return updatedJson;
    }
  };

  // const addPaymentMethod = (method) => {
  //   const templatejson = registerTemplate
  //   // Aquí defines cómo mapear los datos del payload al JSON
  //   const updatedJson = {
  //     ...templatejson,
  //     metodo_pago: method || null,
  //   };
  //   return updatedJson;
  // }

  const infoPayment = (data) => {
    // console.log("datas", data);
    const templatejson = registerTemplate;
    // Aquí defines cómo mapear los datos del payload al JSON
    const updatedJson = {
      ...templatejson,
      subtotal: data.subtotal,
      iva: data.iva,
      comision_transaccion: data.commission,
      total: data.total,
      id_producto: productInfo.id_producto,
      total_centavos: (data.total * 100).toFixed(2),
    };
    setRegisterTemplate(updatedJson);
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
        setIsSuccess(true);
        setIsUserRegistered(true);
        showPassword();
        const userId = response.data.id;
        setPayload((prevPayload) => ({
          ...prevPayload,
          user: {
            ...prevPayload.user,
            id: userId,
          },
        }));
        // Activar la cuenta
        const activationResponse = await resendActivationCode(payload.user.email);
        console.log("activationResponse", activationResponse);
      } else {
        console.log("error", response);
        setStatus("error");
        setIsSuccess(false);
        setErrorRegisterMessage(response.response.data.message);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setStatus("error");
      setIsSuccess(false);
    }
  };

  const handleResendCode = async () => {
    console.log("payload", payload.user);
    await resendActivationCode(payload.user.email);
  };

  const registered = () => {
    setIsUserRegistered(true);
  };

  const showPassword = () => {
    setShowPasswordisUserRegistered(true);
  };

  // Cerrar el modal y redirigir si es exitoso
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isSuccess) {
      const json = updateJsonWithPayload(payload);
      console.log("json", json);
      console.log("payload 2 ", payload);
      setRegisterTemplate(json);
      console.log("departa", aliados[0].id_departamento);
      getMunicipiosToModalPayment(aliados[0].id_departamento);
      // Redirigir si el registro es exitoso
      setCurrentStep(2); // Cambiar la ruta según corresponda
    }
  };

  const modalOpen = (isUserRegistered) => {
    if (isUserRegistered) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  const handleNextStep = () => {
    const json = updateJsonWithPayload(payload);
    console.log("json", json);
    console.log("payload 2 ", payload);
    setRegisterTemplate(json);
    // console.log("registerTemplate", registerTemplate);
    console.log("departa", aliados[0].id_departamento);
    getMunicipiosToModalPayment(aliados[0].id_departamento);
    setCurrentStep(2);
    setModal(false);
  };

  const handlePerformPurchase = async () => {
    if (!paidObject) {
      console.error("No se ha proporcionado ningún objeto de pago.");
      return;
    }
    handleOpenLoaderModal();
    try {
      // const type = paidObject.paymentMethod.type;
      const createTransactionResponse = await performPurchase(paidObject);
      console.log("createTransactionResponse", createTransactionResponse);
      setTransaction(createTransactionResponse);

      const type = paidObject.paymentMethod.type;

      // Verificar si el pago fue exitoso
      if (
        createTransactionResponse &&
        createTransactionResponse.status === 500
      ) {
        // Error en la respuesta, se muestra el modal de error
        setShowErrorModal(true);
        return; // Evitar ejecutar el resto del código en caso de error
      }

      if (type === "PSE" || type === "BANCOLOMBIA_TRANSFER") {
        const asyncPaymentUrl = await checkAsyncPaymentUrl(
          createTransactionResponse,
        );

        if (asyncPaymentUrl) {
          // Redirigir a la URL en una nueva pestaña
          window.open(asyncPaymentUrl, "_blank");
          handleCloseLoaderModal();
          handleCloseVerifiedMessageModal();
          setCurrentStep(4);
        } else {
          setShowErrorModal(true);
          console.error("No se pudo obtener una URL válida para el pago.");
        }
      } else if (type === "CARD") {
        // Redireccionar a la página de pago
        handleCloseLoaderModal();
        handleCloseVerifiedMessageModal();
        setCurrentStep(4);
      } else if (type === "NEQUI") {
        handleCloseLoaderModal();
        handleCloseVerifiedMessageModal();
        // Redireccionar a la página de pago
        setCurrentStep(4);
      }
      handleGetOrder(createTransactionResponse);
      return {
        success: true,
        transactionData: createTransactionResponse,
      };
    } catch (error) {
      console.error("Error en la compra:", error);
      // Aquí verificamos si el error es un error de tipo Axios y si el código es 500
      if (error.response && error.response.status === 500) {
        setShowErrorModal(true);
        // Puedes agregar un mensaje de error más específico, por ejemplo, "Tarjeta inválida"
        console.error("Tarjeta inválida o error en el servidor.");
      }
      setShowErrorModal(true);
      return {
        success: false,
        error: error,
      };
    }
  };

  const handleGetOrder = async (transactionId) => {
    try {
      // Realiza la solicitud al endpoint
      const statusResponse = await getOrder(transactionId);

      const trId = statusResponse.data?.data?.id;
      // const created = statusResponse.data?.data?.created_at;
      const paymentMethod = statusResponse.data?.data?.payment_method_type;
      const status = statusResponse.data?.data?.status;
      const description = statusResponse.data?.order?.description;
      const ip = statusResponse.data?.order?.paymentRemoteIP;

      if (trId && paymentMethod && status) {
        const order = updateJsonWithOrder(
          trId,
          paymentMethod,
          status,
          description,
          ip,
        );
        // console.log("order", order);
        setRegisterTemplate(order);
        handleSubmit(order);
      }
    } catch (error) {
      console.error(
        error,
        `Error al obtener el estado de la transacción en el intento`,
        error.message,
      );
    }
  };

  useEffect(() => {
    if (currentStep === 1) setStepClass("step-1");
    else if (currentStep === 2) setStepClass("step-2");
    else if (currentStep === 3) setStepClass("step-3");
    else if (currentStep === 4) setStepClass("step-4");
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 2) {
      if (selectedMethod === "CARD") setMethodClass("method-a");
      else if (selectedMethod === "PSE" || selectedMethod === "MEDDIPAY") setMethodClass("method-b");
      else if (selectedMethod === "BANCOLOMBIA_TRANSFER") setMethodClass("method-c");
      else if (selectedMethod === "NEQUI") setMethodClass("method-d");

      else setMethodClass(""); // Si no hay método seleccionado
    } else {
      setMethodClass(""); // Resetear si no estamos en step 2
    }
  }, [selectedMethod, currentStep]);
  

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  //Funcion para mostrar modal de verificacion de correo
  const handleAlertEmail = () => {
    handleOpenAlertEmailModal();
  };

  const OpenTerm = () => {
    if (valid) {
      setIsModalOpenTerm(true);
    }
  };
  const handleCloseModalTerm = () => setIsModalOpenTerm(false);

  const handleNextToConfirm = () => {
    handleCloseModalTerm();
    setIsModalOpenConfirm(true);
  };
  const handleCloseModalConfirm = () => setIsModalOpenConfirm(false);

  const OpenModalPayment = () => {
    setIsModalOpenPayment(true);
  };

  const handleCloseModalPayment = () => setIsModalOpenPayment(false);

  const handleCloseModalBilling = () => setIsModalOpenBilling(false);
  const handleOpenModalBilling = () => setIsModalOpenBilling(true);

  const handleSubmit = async (order) => {
    // console.log("registerTemplateParaGuardar", order);
    try {
      const response = await registroCompra(order);
      // console.log("response", response);
      if (response === 201 || response === 200) {
        console.log("Datos insertados correctamente");
      }
    } catch (error) {
      console.error("Error al insertar los datos:", error);
    }
  };

  return (
    <main>
      {restrictedAccess ? <RestrictedAccess /> : (
        <>
          <Header />
          <div
            className="mt-4 relative w-full max-w-5xl mx-auto bg-white p-6 h-auto shadow-md rounded-md"
            onChange={() => setIsDirty(true)}
          >
            <p className="text-center text-4xl text-gray-600 sm:text-2xl mb-4">
              PASOS PARA REALIZAR LA COMPRA
            </p>
            <Stepper currentStep={currentStep} />
            {/* Contenedor de los pasos */}

            <div className={`${stepClass} ${methodClass} relative overflow-hidden`}>
            {/* Paso 1 */}
              <br />
              <div
                className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
                  currentStep === 1
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full pointer-events-none"
                }`}
              >
                <StepOne
                  onRegisterData={onRegisterData}
                  modalOpen={modalOpen}
                  next={next}
                  onSuccessfulRegistration={isUserRegistered}
                  registered={registered}
                  showPasswordisUserRegistered={showPasswordisUserRegistered}
                  openAlertEmailModal={handleAlertEmail}
                  type={"Compra"}
                />
              </div>
              {/* Paso 2 */}
              <div
                className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
                  currentStep === 2
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full pointer-events-none"
                }`}
              >
                <StepTwo
                  payload={payload}
                  getDepartamentos={getDepartamentos}
                  numberValid={validateCardNumber}
                  openModal={handleOpenModalBilling}
                  openAlertEmailModal={handleAlertEmail}
                  phoneNumberValid={validatePhoneNumber}
                  onMethodChangeProps={handleMethodChange}
                  statusCodeAutorizationGeneral={statusCodeAutorizationGeneral}
                />
              </div>
              {/* Paso 3 */}
              <div
                className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
                  currentStep === 3
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-full pointer-events-none"
                }`}
              >
                {currentStep === 3 && (
                  <StepThree
                    paymentMethod={paymentMethod}
                    productInfo={productInfo}
                    productWithDiscount={productWithDiscount}
                    infoPayment={infoPayment}
                  />
                )}

                {/* <StepThree paymentMethod={paymentMethod}/> */}
              </div>
              {/* Paso 4 */}
              <div
                className={`absolute top-0 left-0 w-full transition-all duration-500 transform ${
                  currentStep === 4
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full pointer-events-none"
                }`}
              >
                {currentStep === 4 && (
                  <Suspense fallback={<div>Cargando...</div>}>
                    <Finally transactionId={transaction} />
                  </Suspense>
                )}
              </div>
            </div>
            {(disabled) || (currentStep === 2 && isButtonDisabled) && !(isUserRegistered && currentStep === 1) && (

            <div className="animate-fade-in bg-gray-200 p-1 rounded-lg">
            <h3 className="text-base font-bold text-pink-600 text-center">
              Diligencia todos los campos para continuar
            </h3>
          
          </div>
            )}
            {/* Navegación entre pasos */}

            <div className="flex justify-between mt-6">
              {currentStep != 4 && (
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-4 py-2 text-white font-semibold rounded-md bg-pink-600 hover:bg-orange-500 disabled:bg-gray-200 transition-all"
                >
                  Anterior
                </button>
              )}

              {isUserRegistered && currentStep === 1
                ? (
                  <button
                    className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 transition-all disabled:opacity-50"
                    onClick={nextStep}
                  >
                    Siguiente
                  </button>
                )
                : isUserRegistered && currentStep === 2
                ? (
                  <button
                    onClick={OpenModalPayment}
                    disabled={isButtonDisabled}
                    className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 transition-all disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                )
                : isUserRegistered && currentStep === 3
                ? (
                  <button
                    onClick={handleOpenVerifiedMessageModal}
                    className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 transition-all disabled:opacity-50"
                  >
                    {/* {loading ? <Loader /> :"Pagar"} */}
                    Continuar
                  </button>
                )
                : (
                  currentStep != 4 && ( // Si no está registrado y no es el paso 3
                    <button
                      onClick={OpenTerm}
                      disabled={disabled}
                      className="w-auto px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-4 transition-all disabled:opacity-50"
                    >
                      Registrarse
                    </button>
                  )
                )}
            </div>
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
            <Modal isOpen={modal} handleNext={handleNextStep} />
            <ModalNotRegistered
              status={status}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              errorRegisterMessage={errorRegisterMessage}
              onResendCode={handleResendCode}
            />

            <ModalPayment
              resetFields={resetFields}
              isOpenTerm={isModalOpenPayment}
              onCloseTerm={handleCloseModalPayment}
              dataPayment={dataPayment}
              departamentos={departamentos}
              aliados={aliados}
              savedAliados={savedAliados}
              product={product}
              infoToModalPayment={infoToModalPayment}
              saveDataAliadoEmail={saveDataAliadoEmail}
            />

            <BuyFailed
              isVisible={showErrorModal}
              onClose={() => setShowErrorModal(false)}
            />
            <ModalBilling
              isModalOpenBilling={isModalOpenBilling}
              onCloseBilling={handleCloseModalBilling}
              billingData={handleDataBilling}
              openAlertEmailModal={handleAlertEmail}
            />

            <ModalVerifiedMessage
              isModalVerifiedMessageOpen={isModalVerifiedMessageOpen}
              handleCloseVerifiedMessageModal={handleCloseVerifiedMessageModal}
              purchaseProduct={handlePerformPurchase}
              email={paidObject?.email}
              loading={loadingModal}
            />

            <ModalAlertEmail
              isModalAlertEmailOpen={isModalAlertEmailOpen}
              handleCloseAlertEmailModal={handleCloseAlertEmailModal}
            />
          </div>

          <Footer />
        </>
      )}
    </main>
  );
};

export default StepWizard;
