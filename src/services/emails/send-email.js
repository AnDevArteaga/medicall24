import axios from "axios";
// import generateEmail from "../../pages/handlesendemail";

const SendEmail = async (emailData) => {

  // const html = generateEmail(emailData.username, emailData.message);

  console.log('emaildata', emailData)
  const emailPayload = {
    email_to: emailData.to,
    producto: emailData.producto,
    link_aliados: emailData.link_aliados,
    link_pqrd: emailData.link_pqrd,
    razon_social: emailData.razon_social,
    telefono: emailData.telefono,
    direccion: emailData.direccion,
    ciudad: emailData.ciudad,
    departamento: emailData.departamento,
    pais: emailData.pais,
    link_pasos: emailData.link_pasos,
    link_ayuda: emailData.link_ayuda,
    link_terminos: emailData.link_terminos,
  };
  console.log('emailpayload', emailPayload)
  try {
    const response = await axios.post('https://edutlasdeveloper.pythonanywhere.com/send-email', emailPayload, {
      headers: {
        "Content-Type": "application/json",
      }});

    if (response.status === 202) {
      alert("Correo enviado con éxito");
    } else {
      alert("Hubo un error al enviar el correo");
    }
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

export default SendEmail;