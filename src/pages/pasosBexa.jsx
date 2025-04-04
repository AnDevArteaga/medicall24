import Header from "../components/common/Header"
import Footer from "../components/common/Footer"
import PasosBexaInfo from "../components/user/Persona/ExamenBexa/page/PasosBexa"
import ModalPasosBexa from "../components/modals/pasos/PasosBexa"
import { useEffect } from "react"
import "../styles/noScroll.css"

import { useState } from "react"

const PasosBexa = () => {
  
  const [isOpenModalPasosBexa, setIsOpenModalPasosBexa] = useState(false);
  const [href, setHref] = useState("");

  useEffect(() => {
    // Agregar o quitar la clase `no-scroll` según el estado del modal
    if (isOpenModalPasosBexa) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    // Limpieza: Elimina la clase si el componente se desmonta
    return () => document.body.classList.remove("no-scroll");
  }, [isOpenModalPasosBexa]);

  const openModalPasosBexa = (value) => {
    setIsOpenModalPasosBexa(value);
  };

  const closeModalPasosBexa = () => {
    setIsOpenModalPasosBexa(false);
  };

  const setHrefModal = (href) => {
    setHref(href);
  };
  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <PasosBexaInfo setHrefModal={setHrefModal} openModalPasosBexa={openModalPasosBexa} />
    </main>
    <footer>
      <Footer />
    </footer>
    <ModalPasosBexa isOpenModalPasosBexa={isOpenModalPasosBexa} href={href} closeModalPasosBexa={closeModalPasosBexa} />
    </>
  )
}

export default PasosBexa
