import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const useProductModal = (  ) => {
  const [productInfo, setProductInfo] = useState(null);
  const [isOpenModalCotize, setIsOpenModalCotize] = useState(false);
  const [name, setName] = useState(null);
  const [value, setValue] = useState(null);
  const [id, setId] = useState(null);
  const [discount, setDiscount] = useState(0);

  // Variables extra (por lo que veo que usas en el cierre)
  const [inputValues, setInputValues] = useState({});
  const [isValidCode, setIsValidCode] = useState(false);
  const [applicableCode, setApplicableCode] = useState(null);
  const [hiddenInputValue, setHiddenInputValue] = useState(false); // Estado para el código promocional, y tambien el label de descuento, cuando un codigo promocional tiene 0% de descuento

  //Qr
  const [searchParams] = useSearchParams();
  const promoFromURL = searchParams.get("promo");
  const productFromURL = searchParams.get("product");

  const [codigoPromo, setCodigoPromo] = useState(null);
  const [modalCotizeByQr, setModalCotizeByQr] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
      if (promoFromURL && productFromURL) {
          setProduct(productFromURL); // Guardamos el producto en el estado
          setCodigoPromo(promoFromURL); // Guardamos el código en el estado
          setModalCotizeByQr(true); // Abrimos el modal automáticamente
      }
  }, [promoFromURL, productFromURL]);



  const handleOpenModalCotize = (product) => {
    console.log("product", product);
    setProductInfo(product);

    const nombre = product.name || product.nombre;
    const value = product.value ? product.value : product.valor_cop;

    //Espero refactorizar esto algún día, no se cuando pero algún dia
    // Extraer el número de meses si existe en el nombre
    const match = nombre?.match(/\d+/); // Busca cualquier número en el texto
    const months = match ? parseInt(match[0], 10) : 1; // Si no hay número, usa 1 como predeterminado

     // Multiplicar el valor por los meses extraídos
    const calculatedValue = value * months;
    console.log("calculatedValue", calculatedValue);
    
    setName(product.name || product.nombre);
    setValue(product.value ? product.value : calculatedValue);
    setId(product.id_producto);
    setIsOpenModalCotize(true);
  };

  const handleCloseModalCotize = ({ modalCotizeByQr, setModalCotizeByQr }) => {
    if (modalCotizeByQr) {
      setModalCotizeByQr(false);
    }
    setIsOpenModalCotize(false);
    setProductInfo(null);
    setName(null);
    setValue(null);
    setId(null);
    setDiscount(0);
    setInputValues({});
    setIsValidCode(false);
    setApplicableCode(null);
    setHiddenInputValue(false);
  };


  //Planes de Telemedicina Personas
  const handleCheckboxChange = (e) => {
    console.log("e", e.target.checked);
    setValue('767515')
  };

  return {
    productInfo,
    isOpenModalCotize,
    name,
    value,
    id,
    handleCheckboxChange,
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
    setDiscount,
    setProductInfo,
    codigoPromo,
    product,
    modalCotizeByQr,
    setModalCotizeByQr
    
  };
};

export default useProductModal;
