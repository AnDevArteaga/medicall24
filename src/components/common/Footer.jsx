const Footer = () => {
  return (
    <footer className="bg-gray-200 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Medicall24 - Todos los derechos
          reservados
        </p>
        <div className="mt-4 flex justify-center space-x-4 text-gray-500">
          <a href="#" className="hover:text-pink-600 tzransition-colors">
            Términos de Servicio
          </a>
          <a href="#" className="hover:text-pink-600 transition-colors">
            Política de Privacidad
          </a>
          <a href="#" className="hover:text-pink-600 transition-colors">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
