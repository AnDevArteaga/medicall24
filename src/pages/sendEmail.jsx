import { useEffect } from "react";
import SendEmail from "../services/emails/send-email";
const Send_Email = () => {


  const emailData ={
    to: "andresarteagaramos@gmail.com",
    producto: "Examen BEXA para Detectar Masas en Mama",
    link_aliados: "https://appmedicall24.com/aliados",
    link_pqrd: "https://medicall24.com.co/prqs",
    razon_social: "Medicall24",
    telefono: "3172352363",
    direccion: "Calle 30 Carrera 8",
    ciudad: "Montería",
    departamento: "Córdoba",
    pais: "Colombia",
    link_pasos: "https://appmedicall24.com/",
    link_ayuda: "https://appmedicall24.com/",
    link_terminos: "https://appmedicall24.com/terminos-y-condiciones/1",
  };

useEffect(() => {
    SendEmail(emailData);
  }, []);

  return (
    <div>
      <h2>Enviar Correo</h2>
    </div>
  );
};

export default Send_Email;
