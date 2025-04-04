import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../../../store/slices/productSlice";
import { useNavigate } from "react-router-dom";
import "../../../../../styles/noScroll.css";
import PropTypes from "prop-types";

import { CheckCircle, ChevronRight, Info } from "lucide-react";

import TermCondBexaPackage from "../../../../modals/TermAndConditions/TermCondBexaPackage";
import TermCondBexaPackageNext from "../../../../modals/TermAndConditions/TermCondBexaPackageNext";
import TermCondBexaNext from "../../../../modals/TermAndConditions/TermCondBexaNext";
import TermCondBexa from "../../../../modals/TermAndConditions/TermCondBexa";
import ProductCotize from "../../../../modals/Products/ProductCotize";
import InvalidCode from "../../../../modals/Products/InvalidCode";
import useProductModal from "../../../../../hooks/useProductCotize";

const MainContent = ({ codigosxproductos, productos }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [promoCode, setPromoCode] = useState("");

  const [codeValidByQr, setCodeValidByQr] = useState(false); // Estado para el descuento del paquete
  const [isOpenModalTerm, setIsOpenModalTerm] = useState(false);
  const [isOpenModalTermNext, setIsOpenModalTermNext] = useState(false);
  const [isOpenModalTermPackage, setIsOpenModalTermPackage] = useState(false);
  const [isOpenModalTermPackageNext, setIsOpenModalTermPackageNext] = useState(
    false,
  );
  const [isVisibleInvalidCode, setIsVisibleInvalidCode] = useState(false);
  const {
    productInfo,
    isOpenModalCotize,
    name,
    value,
    id,
    discount,
    inputValues,
    isValidCode,
    applicableCode,
    hiddenInputValue,
    setInputValues,
    setIsValidCode,
    setApplicableCode,
    setHiddenInputValue,
    handleOpenModalCotize,
    handleCloseModalCotize,
    setIsOpenModalCotize,
    setProductInfo,
    setDiscount,
    modalCotizeByQr,
    codigoPromo,
    product,
  } = useProductModal();

  const openModal = () => {
    console.log("id modal", id);
    if (id === 16) {
      handleOpenModalTermPackageNext();
    } else {
      handleOpenModalTermNext();
    }
  };

  const isAnyModalOpen = isOpenModalTerm ||
    isOpenModalTermNext ||
    isOpenModalTermPackage ||
    isOpenModalTermPackageNext ||
    isOpenModalCotize;

  useEffect(() => {
    // Agregar o quitar la clase `no-scroll` según el estado del modal
    if (isAnyModalOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    // Limpieza: Elimina la clase si el componente se desmonta
    return () => document.body.classList.remove("no-scroll");
  }, [isAnyModalOpen]);

  useEffect(() => {
    if (modalCotizeByQr && product) {
      handleOpenModalCotizeByQr(product);
      console.log("product", product, "modalCotizeByQr", modalCotizeByQr);
    }
  }, [modalCotizeByQr, product]);

  const handleOpenModalCotizeByQr = (product) => {
    const foundProduct = productos.find((item) => item.id_producto == product);
    console.log("foundProduct", foundProduct);
    if (foundProduct) {
      handleOpenModalCotize(foundProduct);

      // Escribe automáticamente el código promocional en el input
      setInputValues((prevValues) => ({
        ...prevValues,
        [foundProduct.id_producto]: codigoPromo, // Asigna el código promo al input
      }));
      setCodeValidByQr(true);
    }
  };

  // Ejecutar validación en cuanto se actualice el inputValues con el código promocional
  useEffect(() => {
    if (codeValidByQr && product && inputValues[product]) {
      handleValidateCode(product);
      setCodeValidByQr(false);
    }
  }, [inputValues, product, codeValidByQr]);

  const handleAccept = () => {
    if (applicableCode) {
      console.log("applicableCode", applicableCode);
      dispatch(setProduct(applicableCode));
    } else {
      console.log("productInfo", productInfo);
      dispatch(setProduct(productInfo));
    }
    handleCloseModalTermNext();
    setTimeout(() => {
      navigate("/compra");
    }, 2000);
  };

  const handleOpenModalTerm = () => {
    setIsOpenModalTerm(true);
  };
  const handleCloseModalTerm = () => {
    setIsOpenModalTerm(false);
  };

  const handleOpenModalTermNext = () => {
    setIsOpenModalTermNext(true);
    setIsOpenModalCotize(false);
  };

  const handleCloseModalTermNext = () => {
    setIsOpenModalTermNext(false);
  };
  const handleOpenModalTermPackage = () => {
    setIsOpenModalTermPackage(true);
    setIsOpenModalCotize(false);
  };
  const handleCloseModalTermPackage = () => {
    setIsOpenModalTermPackage(false);
  };

  const handleOpenModalTermPackageNext = () => {
    setIsOpenModalTermPackageNext(true);
    setIsOpenModalCotize(false);
  };
  const handleCloseModalTermPackageNext = () => {
    setIsOpenModalTermPackageNext(false);
  };

  const onCloseInvalidCode = () => {
    setIsVisibleInvalidCode(false);
  };

  // // Lista de códigos promocionales con sus respectivos descuentos
  // const promoCodes = {
  //   CODE5: 5,
  //   CODE10: 10,
  //   CODE15: 15,
  //   CODE20: 20,
  // };

  const handleValidateCode = (id) => {
    console.log("inputvalue", inputValues);
    const code = (inputValues[id] || "").toUpperCase(); // Convertir el código a mayúsculas

    const productId = productos.find(
      (product) => product.id_producto === parseInt(id),
    );
    const applicablePromo = codigosxproductos.find(
      (promo) =>
        promo.id_producto === productId.id_producto && promo.cod_promo === code,
    );

    if (applicablePromo && applicablePromo.procentaje_descuento_compra === 0) {
      setHiddenInputValue(true);
    } else {
      setHiddenInputValue(false);
    }

    console.log("code", code);
    console.log("id", id);
    console.log("productId", productId);
    console.log("applicablePromo", applicablePromo);

    if (!code) {
      setDiscount(0);
      setProductInfo(productId);
      setApplicableCode(null);
    } else if (applicablePromo) {
      setApplicableCode(applicablePromo);
      setDiscount(applicablePromo.procentaje_descuento_compra);
      setIsValidCode(true);
    } else {
      setDiscount(0); // Código inválido
      setIsValidCode(false);
      setIsVisibleInvalidCode(true);
      setApplicableCode(null);
      setProductInfo(productId);
      setHiddenInputValue(false);
    }
  };

  const handleInputChange = (e) => {
    const code = e.target.value.toUpperCase(); // Mantener el valor del input
    const id = e.target.id;

    // Actualizar solo el valor del input correspondiente
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: code, // Asignar el valor al input con el id correspondiente
    }));
  };

  const discountValue = (value * discount) / 100;
  const totalToPay = value - discountValue;

  const Eslogan = ({ text, value }) => (
    <span className="flex items-center">
      <p
        className={value === 1
          ? "text-gray-700 text-xl md:text-2xl sm:text-2xl"
          : "text-gray-700 text-sm md:text-2xl sm:text-lg"}
      >
        {text}
      </p>
    </span>
  );

  const Price = ({ price }) => (
    <p className="text-xl sm:text-lg md:text-2xl text-gray-700 flex items-center space-x-2">
      Por solo
      <span className="text-6xl sm:text-4xl md:text-7xl font-semibold ml-2">
        {price}
      </span>
      <span>COP</span>
    </p>
  );

  const AdditionalServices = () => (
    <div className="space-y-3 md:space-y-2">
      <p className="text-gray-700 text-sm md:text-2xl sm:text-base mb-2">
        Beneficios que incluye:
      </p>
      <ServiceItem
        icon={
          <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
        }
        text="Valoración por médico general para establecer la condición de salud de la paciente."
      />
      <ServiceItem
        icon={
          <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
        }
        text="⁠La realización del examen en las dos mamas."
      />
      <ServiceItem
        icon={
          <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
        }
        text="El análisis clínico para interpretar el resultado del examen, identificar si hay masas anormales en las mamas, y prescribir estudios complementarios."
      />
      <ServiceItem
        icon={
          <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
        }
        text="⁠La educación para que las mujeres se realicen el autoexamen correctamente."
      />
      <ServiceItem
        icon={
          <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
        }
        text="⁠La historia clínica de la atención."
      />
      <ServiceItem
        icon={
          <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200 flex-shrink-0" />
        }
        text="⁠La entrega inmediata del resultado del examen."
      />
    </div>
  );

  const ServiceItem = ({ icon, text }) => (
    <div className="flex items-start space-x-2 hover:translate-x-2 transition-transform duration-200 w-4/5 sm:w-full md:w-full">
      {icon}
      <p className="text-gray-700 text-sm md:text-xl sm:text-base hover:text-gray-800">
        {text}
      </p>
    </div>
  );

  return (
    <main className="mx-auto">
      {/* Section 1: Text Left, Image Right */}

      <section className="grid grid-cols-2 -mt-12 md:grid-cols-1 sm:grid-cols-1 gap-8 items-center px-24 md:px-8 sm:px-8 py-16 h-[750px] md:h-auto sm:h-auto bexa">
        {/* Contenido */}
        <div className="sm:space-y-12 space-y-6 md:flex md:flex-col md:items-center sm:flex sm:flex-col">
          <div className="space-y-2">
            {/* Título */}
            <h2 className="text-4xl md:text-center md:text-3xl sm:text-4xl font-bold text-gray-600 leading-tight tracking-wide">
              Examen BEXA para Detectar Masas en Mama
            </h2>
            {/* Descripción */}
            <Eslogan
              text="Sin dolor, sin radiación, con resultados inmediatos."
              value={1}
            />
          </div>

          <div className="relative bg-gray-100 hidden sm:block rounded-2xl overflow-hidden max-w-lg md:max-w-xl mx-auto shadow-lg">
            <video
              className="w-full h-auto rounded-2xl"
              src="https://medicall24.com.co/wp-content/uploads/2024/12/bexa2.mp4"
              autoPlay
              loop
              muted
            />
          </div>

          <div className="space-y-2">
            {/* Nuevos servicios */}
            <AdditionalServices />
            {/* Precio */}
            <Price price="$139.900" />

            {/* Botón de compra */}
            <div className="flex flex-col w-1/2 sm:w-full">
              <button
                className="bg-pink-600 w-full mb-4 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg font-bold services-bexa text-sm md:text-3xl"
                onClick={() =>
                  handleOpenModalCotize(
                    productos.find((product) => product.id_producto === 17),
                  )}
              >
                Comprar
              </button>
            </div>
            <div className="flex flex-col w-1/2 sm:w-full">
              {/* Términos y condiciones */}
              <p
                onClick={handleOpenModalTerm}
                className="cursor-pointer text-left sm:text-center md:text-center mt-2 text-gray-600 text-sm md:text-base underline"
              >
                Ver Términos y Condiciones
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-12 ">
          <div className="relative bg-gray-100 sm:hidden rounded-2xl overflow-hidden max-w-lg md:max-w-xl mx-auto shadow-lg">
            <video
              className="w-full h-auto rounded-2xl"
              src="https://medicall24.com.co/wp-content/uploads/2024/12/bexa2.mp4"
              autoPlay
              loop
              muted
            />
          </div>
          <div>
            <a href="/aliados">
              <button className="bg-pink-600 w-full mt-0 text-white px-32 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg font-bold services-bexa text-sm md:text-3xl">
                Ver agenda
              </button>
            </a>
          </div>
        </div>
      </section>
      <section
        id="servicio"
        className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-1 sm:gap-12 gap-0 items-center px-24 py-12 md:px-4 sm:px-4"
      >
        {/* Contenedor del Video */}
        <div className="relative bg-gray-100 order-1 sm:hidden md:order-2 sm:order-2 rounded-2xl overflow-hidden max-w-lg mx-auto shadow-lg">
          <video
            className="w-full h-full rounded-2xl object-cover object-right"
            src="https://medicall24.com.co/wp-content/uploads/2025/01/bexa3.mp4"
            autoPlay
            loop
            muted
          />
        </div>

        {/* Contenedor de Información */}
        <div className="sm:space-y-12 space-y-6 md:space-y-3 p-8  order-2 md:order-1 sm:order-1 bg-gray-100 rounded-lg shadow-lg transition-transform duration-300 md:flex md:flex-col md:items-center md:justify-center">
          <div className="space-y-2">
            {/* Título */}
            <h2 className="text-4xl md:text-center sm:text-4xl font-bold text-gray-600 hover:text-pink-500 transition-colors duration-200">
              Paquete de Servicios Complementarios para Detectar Cáncer de Mama
            </h2>
            <Eslogan
              text="¡Recibe una atención integral y asegúrate de estar bien!"
              value={1}
            />
          </div>

          <div className="relative bg-gray-100 order-1 hidden sm:block md:order-2 sm:order-2 rounded-2xl overflow-hidden max-w-lg mx-auto shadow-lg">
            <video
              className="w-full h-full rounded-2xl object-cover object-right"
              src="https://medicall24.com.co/wp-content/uploads/2025/01/bexa3.mp4"
              autoPlay
              loop
              muted
            />
          </div>
          <div className="space-y-2">
            {/* Servicios incluidos */}
            <p className="md:text-center text-gray-700 text-sm md:text-2xl">
              Beneficios que incluye el paquete:
            </p>

            <ul className="space-y-0 md:space-y-2">
              {/* Ecografía de mama */}
              <li className="flex space-x-3 hover:translate-x-2 transition-transform duration-200">
                <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                <span className="text-gray-600 text-sm md:text-xl group-hover:text-gray-700 transition-colors duration-200">
                  Ecografía de mama
                </span>
                <div className="ml-2 group relative flex">
                  <Info className="w-4 h-4 md:w-6 md:h-6 text-gray-500 hover:text-pink-600 cursor-pointer" />
                  <div className="absolute bottom-full left-1/2 transform translate-y-[-5px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md w-96 sm:text-xs sm:w-60 sm:-translate-x-48">
                    <p className="text-white ml-2 text-sm md:text-base sm:text-base">
                      Se garantiza en caso de hallazgo de masas en mama con el
                      examen BEXA
                    </p>
                  </div>
                </div>
              </li>

              {/* Consultas complementarias */}
              <li>
                <div className="flex space-x-3 hover:translate-x-2 transition-transform duration-200">
                  <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" />
                  <span className="text-gray-600 text-sm  md:text-xl group-hover:text-gray-700 transition-colors duration-200">
                    Consultas complementarias por:
                  </span>
                  <div className="ml-2 group relative flex">
                    <Info className="w-4 h-4 md:w-6 md:h-6 text-gray-500 hover:text-pink-600 cursor-pointer" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 translate-y-[-5px] invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all bg-gray-800 text-white text-sm p-2 rounded-lg shadow-md w-96 sm:text-xs sm:w-72 sm:-translate-x-72">
                      <p className="text-white ml-2 text-sm md:text-base sm:text-base">
                        Se garantiza por prescripción del profesional de la
                        salud o especialista que realice el examen BEXA o la
                        ecografía
                      </p>
                    </div>
                  </div>
                </div>
                <ul className="ml-8 mt-2 md:ml-0 space-y-0">
                  <li className="flex space-x-3">
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
                    <span className="text-gray-600 text-sm md:text-xl">
                      Mastología
                    </span>
                  </li>
                  <li className="flex space-x-3">
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
                    <span className="text-gray-600 text-sm md:text-xl">
                      Psicología
                    </span>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Precio */}
            <Price price="$249.500" />
            <div className="flex justify-center md:items-center flex-col w-2/3 md:w-full sm:w-full">
              {/* Botón de Acción */}
              <button
                className="bg-pink-600 w-auto md:w-2/4 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-pink-700 transition-colors shadow-md hover:shadow-lg mt-2 mb-4 text-sm md:text-3xl"
                onClick={() =>
                  handleOpenModalCotize(
                    productos.find((product) => product.id_producto === 16),
                  )}
              >
                Comprar Paquete
              </button>
            </div>
            <div className="flex flex-col w-1/2 sm:w-full">
              {/* Términos y condiciones */}
              <p
                onClick={handleOpenModalTermPackage}
                className="cursor-pointer text-left sm:text-center mt-2 text-gray-600 text-sm md:text-base md:text-center underline"
              >
                Ver Términos y Condiciones
              </p>
            </div>
          </div>
        </div>
      </section>
      {isOpenModalCotize && (
        <ProductCotize
          resetData={isOpenModalCotize}
          productName={name}
          packageValue={value}
          promoCode={promoCode}
          discount={discount}
          totalToPay={totalToPay}
          handleInputChange={handleInputChange}
          discountValue={discountValue}
          productId={id}
          onCloseTerm={handleCloseModalCotize}
          openModalTerm={openModal}
          isValidCode={isValidCode}
          inputValues={inputValues}
          handleValidateCode={handleValidateCode}
          hiddenInputValue={hiddenInputValue}
        />
      )}
      <InvalidCode
        isVisible={isVisibleInvalidCode}
        onClose={onCloseInvalidCode}
      />

      {isOpenModalTerm && (
        <div className="flex items-center justify-center">
          <TermCondBexa onCloseTerm={handleCloseModalTerm} />
        </div>
      )}
      {isOpenModalTermNext && (
        <div className="flex items-center justify-center">
          <TermCondBexaNext
            handleAccept={handleAccept}
            onCloseTerm={handleCloseModalTermNext}
          />
        </div>
      )}

      {isOpenModalTermPackage && (
        <div className="flex items-center justify-center">
          <TermCondBexaPackage onCloseTerm={handleCloseModalTermPackage} />
        </div>
      )}
      {isOpenModalTermPackageNext && (
        <div className="flex items-center justify-center">
          <TermCondBexaPackageNext
            onCloseTerm={handleCloseModalTermPackageNext}
          />
        </div>
      )}
    </main>
  );
};

export default MainContent;

MainContent.propTypes = {
  codigosxproductos: PropTypes.array,
  productos: PropTypes.array,
  text: PropTypes.string,
  value: PropTypes.number,
  price: PropTypes.string,
  icon: PropTypes.element,
};
