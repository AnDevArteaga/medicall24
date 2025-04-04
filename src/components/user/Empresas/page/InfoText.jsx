import cabina from "../../../../assets/empresas/cabina.jpg"
import { CheckCircle } from "lucide-react";


const InfoText = () => {
  return (
<div className="container mx-auto flex flex-row md:flex-col sm:flex-col items-center justify-center gap-8">

  <div className="w-full md:w-full rounded-3xl overflow-hidden">
    <img src={cabina} alt="imagen" className="w-full h-auto" style={{userSelect: "none", pointerEvents: "none"}} />
  </div>
</div>


);
};

export default InfoText;


