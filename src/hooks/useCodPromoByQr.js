import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useCodPromoByQr = () => {
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

    // Retornamos el código promocional y el estado del modal
    return { codigoPromo, product, modalCotizeByQr, setModalCotizeByQr };
};