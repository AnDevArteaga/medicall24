import { ArrowLeft, Home } from "lucide-react";
import { useLocation } from "react-router-dom";
// import lettermark from "../../assets/lettermark.png";

const Header = () => {
  const { pathname } = useLocation();
  const isOnAliados = pathname === "/aliados";
  const icon = isOnAliados
    ? <ArrowLeft className="h-5 w-5" />
    : <Home className="h-5 w-5" />;
  const href = isOnAliados ? "/Examen-Bexa" : "/";
  const label = isOnAliados ? "Volver" : "Inicio";
  return (
    <header className="bg-gray-100 text-white shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center space-x-2">
          <img
            src="https://medicall24.com.co/wp-content/uploads/2024/12/lettermarkoriginal.png"
            alt="logo"
            className="w-40 h-auto"
          />
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="hover:text-orange-500 text-pink-600 transition-colors flex items-center space-x-1">
              <a href={href} className="flex items-center space-x-1">
                {icon}
                <span className="font-medium">{label}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
