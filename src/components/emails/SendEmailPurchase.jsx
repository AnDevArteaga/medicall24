import { Mjml, MjmlBody, MjmlSection, MjmlColumn, MjmlText, MjmlButton } from "mjml-react";

const WelcomeEmail = ({ username, message }) => (
  <Mjml>
    <MjmlBody>
      <MjmlSection>
        <MjmlColumn>
          <MjmlText fontSize="20px" color="#333">
            ¡Hola, {username}!
          </MjmlText>
          <MjmlText fontSize="16px" color="#555">
            {message}
          </MjmlText>
          <MjmlButton href="https://tusitio.com" backgroundColor="#007BFF">
            Ir a tu cuenta
          </MjmlButton>
        </MjmlColumn>
      </MjmlSection>
    </MjmlBody>
  </Mjml>
);

export default WelcomeEmail;

// import {
//   Html,
//   Head,
//   Preview,
//   Body,
//   Container,
//   Section,
//   Text,
//   Img,
//   Button,
// } from "@react-email/components";

// const WelcomeEmail = ({
//   producto = "Producto",
//   prestador = "Prestador",
//   direccion = "Direccion",
//   telefono = "Telefono",
//   ciudad = "Ciudad",
//   departamento = "Departamento",
//   pais = "Pais",
//   videoLink = "Video",
//   ayudaLink = "Ayuda",
//   aliadosLink = "Aliados"
// }) => (
//   <Html>
//     <Head />
//     <Preview>¡Te damos la bienvenida a MEDICALL24!</Preview>
//     <Body style={styles.body}>
//       {/* Banner superior */}
//       <Container style={styles.container}>
//         <Section style={styles.banner}>
//           <Img
//             src="https://via.placeholder.com/800x200.png?text=Bienvenido+a+MEDICALL24"
//             alt="aqui diseño de un banner"
//             width="100%"
//             style={styles.img}
//           />
//         </Section>

//         {/* Mensaje de bienvenida */}
//         <Section>
//           <Text style={styles.title}>¡Te damos la bienvenida!</Text>
//           <Text style={styles.paragraph}>
//             Acabas de adquirir el <b>{producto}</b>, el cual forma parte de la
//             oferta de productos y servicios comercializados por MEDICALL24 SAS y
//             la red de Prestadores de Salud que hacen parte de nuestra{" "}
//             <a href={aliadosLink} style={styles.link}>
//               Alianza Comercial
//             </a>.
//           </Text>
//           <Text style={styles.paragraph}>
//             Hemos enviado una copia de los términos y condiciones del servicio
//             que aceptaste al momento de realizar tu compra. Si tienes alguna
//             objeción, puedes presentar una PQRD siguiendo{" "}
//             <a href={ayudaLink} style={styles.link}>
//               este link
//             </a>.
//           </Text>
//         </Section>

//         {/* Información del prestador de salud */}
//         <Section style={styles.infoBox}>
//           <Text style={styles.subTitle}>
//             Datos del Prestador de Salud asignado:
//           </Text>
//           <Text>
//             <b>Prestador de Salud:</b> {prestador}
//           </Text>
//           <Text>
//             <b>Dirección:</b> {direccion}
//           </Text>
//           <Text>
//             <b>Teléfono:</b> {telefono}
//           </Text>
//           <Text>
//             <b>Ciudad:</b> {ciudad}
//           </Text>
//           <Text>
//             <b>Departamento:</b> {departamento}
//           </Text>
//           <Text>
//             <b>País:</b> {pais}
//           </Text>
//         </Section>

//         {/* Botones */}
//         <Section style={styles.buttons}>
//           <Button href={videoLink} style={styles.buttonPrimary}>
//             Pasos para solicitar tu cita
//           </Button>
//           <Button href={ayudaLink} style={styles.buttonSecondary}>
//             ¡Ayuda!
//           </Button>
//         </Section>

//         {/* Footer */}
//         <Section>
//           <Text style={styles.footer}>
//             Atentamente, <br /> Equipo MEDICALL24
//           </Text>
//         </Section>
//       </Container>
//     </Body>
//   </Html>
// );

// const styles = {
//   body: {
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#f9f9f9",
//     margin: 0,
//     padding: 0,
//   },
//   container: {
//     maxWidth: "600px",
//     margin: "0 auto",
//     backgroundColor: "#ffffff",
//     borderRadius: "8px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     overflow: "hidden",
//   },
//   banner: {
//     textAlign: "center",
//     backgroundColor: "#be0069",
//     padding: "10px 0",
//   },
//   img: {
//     display: "block",
//     width: "100%",
//   },
//   title: {
//     fontSize: "24px",
//     color: "#333333",
//     fontWeight: "bold",
//     textAlign: "center",
//     margin: "20px 0",
//   },
//   paragraph: {
//     fontSize: "16px",
//     color: "#555555",
//     lineHeight: "1.5",
//     margin: "10px 20px",
//   },
//   link: {
//     color: "#be0069",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
//   infoBox: {
//     backgroundColor: "#F3F4F6",
//     padding: "15px 20px",
//     borderRadius: "8px",
//     margin: "20px",
//   },
//   subTitle: {
//     fontSize: "18px",
//     color: "#333333",
//     fontWeight: "bold",
//     marginBottom: "10px",
//   },
//   buttons: {
//     textAlign: "center",
//     margin: "20px 0",
//   },
//   buttonPrimary: {
//     backgroundColor: "#4F46E5",
//     color: "#ffffff",
//     padding: "10px 20px",
//     textDecoration: "none",
//     borderRadius: "4px",
//     display: "inline-block",
//     margin: "0 10px",
//   },
//   buttonSecondary: {
//     backgroundColor: "#E5E7EB",
//     color: "#333333",
//     padding: "10px 20px",
//     textDecoration: "none",
//     borderRadius: "4px",
//     display: "inline-block",
//     margin: "0 10px",
//   },
//   footer: {
//     fontSize: "14px",
//     color: "#777777",
//     textAlign: "center",
//     margin: "20px 0",
//   },
// };

// export default WelcomeEmail;
