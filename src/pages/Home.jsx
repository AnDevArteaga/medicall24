import RedirectButton from '../components/common/RedirectButton';
import logo from '../assets/logomedicall.png';
import middle from '../assets/mediologo.png';

import "../styles/countryFilter.css";

const IndexPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Mano posicionada de forma absoluta */}
      <img
        src={middle}
        alt="Mano"
        className="w-72 h-auto absolute right-0 top-0 animate-slide-in"
      />

      {/* Logo y Select centrados */}
      <div className="flex flex-col items-center z-10">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-60 h-auto animate-in"
        />

        <div>
          <h1 className="text-ls text-center text-gray-400 mt-2 animate-text mr-1">
            Telemedicina al alcance de todos
          </h1>
        </div>

        <div>
          <h1 className="text-3xl text-center font-bold text-gray-600 mt-6 animate-text">
            ¿Dónde te encuentras?
          </h1>
        </div>

        <div className="mt-6 animate-text">
          <div className="grid grid-cols-2 gap-6 items-center sm:grid-cols-1 mb-6">
            <div className="mt-6">
              <RedirectButton
                label="Colombia"
                link="/inicio/"
                customClass="border-orange-500 text-orange-500 hover:text-white hover:bg-orange-500 w-80"
              />
            </div>
            <div className="mt-6">
              <RedirectButton
                label="Panamá"
                link="#"
                customClass="border-gray-500 text-gray-500 w-80"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
            <div className="mt-6">
              <RedirectButton
                label="EE.UU."
                link="#"
                customClass="border-gray-500 text-gray-500 w-80"
              />
            </div>
            <div className="mt-6">
              <RedirectButton
                label="Otros Países"
                link="#"
                customClass="border-gray-500 text-gray-500 w-80"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
