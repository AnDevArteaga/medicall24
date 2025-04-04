import ico from "../../assets/SVG/icoLogo.svg";
import menu from "../../assets/SVG/menu.svg";
import { Menu } from "lucide-react";
import { ArrowDownFromLine, ChevronDown } from "lucide-react";
import { useMenuFilterUser } from "../../hooks/useHeaderFilterUser";

import DropdownMenu from "./DropDownMenu";

function HeaderStart() {
  const {
    menuItemsPersonas,
    menuItemsPrestadores,
    isCountryVisible,
    setIsCountryVisible,
    menuOpen,
    setMenuOpen,
    dropdownOpen,
    setDropdownOpen,
    dropdown2Open,
    setDropdown2Open,
  } = useMenuFilterUser();

  return (
    <header className="relative bg-white">
      {/* HeaderCountry */}
      <div
        className={`sm:hidden md:hidden ${
          isCountryVisible
            ? "max-h-96 opacity-100 bg-gray-200 text-white flex items-center justify-between px-36 py-4 shadow-md overflow-hidden transition-all duration-500 ease-in-out"
            : "max-h-0 opacity-0 py-0 px-0 shadow-none transition-all flex items-center justify-between duration-500 ease-in-out"
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-gray-600">
            Elige tu país:
          </span>
          <select className="bg-orange-600 text-black px-16 py-1 rounded-xl text-white">
            <option value="Colombia">Colombia</option>
            <option value="México" disabled>
              Panamá
            </option>
            <option value="Argentina" disabled>
              EE.UU.
            </option>
            <option value="Chile" disabled>
              Otros Países
            </option>
          </select>
          <button className="bg-white text-gray-700 px-12 py-1 rounded-xl font-semibold hover:bg-gray-100 transform transition">
            Continuar
          </button>
          <button
            className="text-gray-600 text-xl hover:scale-110 transform transition"
            onClick={() => setIsCountryVisible(false)}
          >
            ✕
          </button>
        </div>
        <div>
          <img
            src="https://medicall24.com.co/wp-content/uploads/2024/12/lettermarkoriginal.png"
            alt="logo"
            className="w-40 h-auto"
          />
        </div>
      </div>

      <nav className={`bg-white transition-transform duration-500 ease-in-out`}>
        <div className="container mx-auto flex items-center justify-evenly md:justify-between sm:justify-between py-4 px-6">
          {/* Logo */}
          <img
            src={ico}
            alt="Logo"
            className="hidden md:block sm:block select-none h-8 w-auto transform transition duration-200 hover:scale-105 flex"
          />
          {/* Menu Hamburguesa (Mobile) */}
          <button
            className="w-10 h-10 flex justify-center items-center relative hidden md:block sm:block"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Contenedor de íconos */}
            <div className="relative w-12 h-6">
              {/* Ícono de menú */}
              <span
                className={`absolute mt-1 ml-1 transition-all duration-500 ${
                  menuOpen
                    ? "opacity-0 scale-0 z-0"
                    : "opacity-100 scale-100 z-10"
                }`}
              >
                <Menu className="w-auto h-auto text-pink-800" />
              </span>
              {/* Ícono de cerrar */}
              <span
                className={`absolute text-3xl font-bold text-pink-600 transition-all duration-500 ${
                  menuOpen
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-0 z-0"
                }`}
              >
                ✕
              </span>
            </div>
          </button>

          {/* Opciones del menú (Desktop) */}
          <ul
            className={`${
              isCountryVisible ? "ml-16 transition-all" : "ml-0 transition-all"
            } md:hidden sm:hidden flex items-center gap-14 text-md font-medium text-gray-600`}
          >
            {/* <li><img src={ico.src} alt="Logo" className=" select-none h-8 w-auto transform transition duration-200 hover:scale-105 flex" /></li> */}
            <DropdownMenu label="Personas" menuItems={menuItemsPersonas} />
            <DropdownMenu
              label="Prestadores de Salud"
              menuItems={menuItemsPrestadores}
            />

            <li>
              <a
                href="https://medicall24.com.co/entidades/"
                className="transform transition duration-200 hover:scale-105 flex hover:font-semibold hover:text-pink-600"
                target="_blank"
              >
                Entidades de Salud
              </a>
            </li>
            <li>
              <a
                href="/empresas"
                className="transform transition duration-200 hover:scale-105 flex hover:font-semibold hover:text-pink-600"
                target="_blank"
              >
                Empresas
              </a>
            </li>

            <li
              className={`${
                isCountryVisible
                  ? "opacity-0 cursor-auto transition-all duration-500 ease-in-out"
                  : "opacity-100 transition-all duration-500 ease-in-out cursor-pointer"
              }`}
            >
              <ArrowDownFromLine
                className="w-6 h-6 text-pink-600 transform transition duration-200 hover:scale-105 flex hover:font-semibold"
                onClick={() => setIsCountryVisible(true)}
              />
            </li>
          </ul>
        </div>

        <div
          className={`absolute top-0 mt-16 left-0 w-full bg-white text-black z-50 overflow-hidden transition-all duration-1000 ease-in-out hidden md:block sm:block ${
            menuOpen ? "h-screen" : "h-0"
          }`}
        >
          {/* Selector de país móvil */}
          <div
            className={`${
              isCountryVisible
                ? "max-h-96 opacity-100 bg-gray-200 text-white py-4 px-6 shadow-md transition-all duration-500 ease-in-out"
                : "max-h-0 opacity-0 py-0 px-0 shadow-none transition-all duration-500 ease-in-out"
            }`}
          >
            <div className="flex items-center flex-col gap-4">
              <span className="text-lg text-gray-600 font-medium">
                Elige tu país:
              </span>
              <select className="bg-orange-600 text-black px-8 py-1 rounded-xl focus:ring focus:ring-orange-300 text-white">
                <option value="Colombia">Colombia</option>
                <option value="México" disabled>
                  Panamá
                </option>
                <option value="Argentina" disabled>
                  EE.UU.
                </option>
                <option value="Chile" disabled>
                  Otros Países
                </option>
              </select>
              <button className="bg-white text-gray-700 px-8 py-1 rounded-xl font-semibold hover:bg-orange-100 transform transition">
                Continuar
              </button>
              <button
                className="text-gray-600 text-xl hover:scale-110 transform transition"
                onClick={() => setIsCountryVisible(false)}
              >
                ✕
              </button>
            </div>
          </div>
          <ul
            className={`space-y-8 text-2xl font-semibold text-gray-600 ml-10 mt-2 transition-opacity duration-1000 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-center">
              <ArrowDownFromLine
                className={`w-8 h-8 text-pink-700 mr-10 transform transition duration-200 hover:scale-105 flex hover:font-semibold ${
                  isCountryVisible
                    ? "opacity-0 cursor-auto transition-all duration-500 ease-in-out"
                    : "opacity-100 transition-all duration-500 ease-in-out cursor-pointer"
                }`}
                onClick={() => setIsCountryVisible(true)}
              />
            </div>

            {/* Dropdown para "Personas" */}
            <li>
              <button
                className="flex justify-between w-full text-left hover:text-pink-600"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Personas
                <ChevronDown
                  className={`transform transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  } mr-6`}
                />
              </button>
              {dropdownOpen && (
                <ul className="mt-2 pl-4 space-y-2">
                  <li>
                    <a
                      href="/Consulta-Paciente"
                      className="block text-gray-600 hover:text-pink-400 text-lg"
                    >
                      ¿Cómo encontrar un médico?
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Examen-Bexa"
                      className="block text-gray-600 hover:text-pink-400 text-lg"
                    >
                      Examen BEXA
                    </a>
                  </li>
                  <li>
                    <a
                      href="/Planes-Telemedicina-Personas"
                      className="block text-gray-600 hover:text-pink-400 text-lg"
                    >
                      Planes de Telemedicina
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex justify-between w-full text-left hover:text-pink-600"
                onClick={() => setDropdown2Open(!dropdown2Open)}
              >
                Prestadores de Salud
                <ChevronDown
                  className={`transform transition-transform ${
                    dropdown2Open ? "rotate-180" : ""
                  } mr-6`}
                />
              </button>
              {dropdown2Open && (
                <ul className="mt-2 pl-4 space-y-2">
                  <li>
                    <a
                      href="https://medicall24.com.co/profesionalesindependientes/"
                      className="block text-gray-600 hover:text-pink-400 text-lg"
                    >
                      Profesionales Independientes
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://medicall24.com.co/instituciones-ips"
                      className="block text-gray-600 hover:text-pink-400 text-lg"
                    >
                      Instituciones Ips
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="flex justify-between w-full text-left hover:text-pink-600">
              <a
                href="https://medicall24.com.co/entidades/"
                className="hover:text-gray-400"
                onClick={() => setMenuOpen(false)}
              >
                Entidades de Salud
              </a>
            </li>
            <li className="flex justify-between w-full text-left hover:text-pink-600">
              <a
                href="/empresas"
                className="hover:text-gray-400"
                onClick={() => setMenuOpen(false)}
              >
                Empresas
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default HeaderStart;
