import { useParams } from "react-router-dom";
import TermCondBexa from "./productos/bexa";
import TermCondBexaPackage from "./productos/paqueteBexa";
import TermCondPlanesPersonas from "./productos/planesPersonas";
import RestrictedAccessTerm from "../../components/NotFound/RestrictedAccessTerm";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
const TermCond = () => {
    const { producto } = useParams();
    console.log("producto", producto);
    return (
        <>
            <Header />
            {producto == 1
                ? <TermCondBexa />
                : producto == 2
                ? <TermCondBexaPackage />
                : producto == 3
                ? <TermCondPlanesPersonas />
                : (
                    <RestrictedAccessTerm />
                )}
                <Footer />
        </>
    );
};

export default TermCond;
