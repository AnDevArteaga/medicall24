import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, LogOut, Search, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import {
    obtenerDatosAutorizacion,
    registrarDatosAutorizacion,
} from "../services/supabase/saveDataCredit";
import Loader from "../components/common/Loader";
import LoaderPage from "../components/common/LoaderPage";
import { supabase } from "../services/supabase/supabaseClient";

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("table");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        identificacion_usuario: "",
        id_producto: "",
        codigo_plataforma_credito: "",
        valor_aprobado: "",
        fecha_aprobacion: "",
        codigo_credito: "",
        cod_usua_ingresa: "",
    });
    const navigate = useNavigate();


    const cerrarSesion = async () => {
        const { error } = await supabase.auth.signOut();

        if (!error) {
            toast.success("Sesión cerrada correctamente 👋");
            navigate("/iniciar-sesion");
        } else {
            toast.error("Error al cerrar sesión");
            console.error("Error al cerrar sesión:", error.message);
        }
    };

    useEffect(() => {
        const obtenerUID = async () => {
            const { data } = await supabase.auth.getSession();
            const uid = data?.session?.user?.id;

            if (uid) {
                setFormData((prev) => ({
                    ...prev,
                    cod_usua_ingresa: uid,
                }));
            }
        };

        obtenerUID();
    }, []);

    const getData = async () => {
        setLoadingPage(true);
        const response = await obtenerDatosAutorizacion(); // tu función para traer datos
        console.log("response", response);
        setData(response.data || []);
        setLoadingPage(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const filteredData = useMemo(() => {
        console.log("data", data);
        return data?.filter((item) =>
            item.identificacion_usuario?.toLowerCase().includes(
                searchTerm.toLowerCase(),
            ) ||
            item.codigo_credito?.toLowerCase().includes(
                searchTerm.toLowerCase(),
            )
        );
    }, [data, searchTerm]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);

    useEffect(() => {
        setCurrentPage(1); // Reinicia al buscar
    }, [searchTerm]);

    // Manejador para cambios en el formulario
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const camposRequeridos = [
            "identificacion_usuario",
            "id_producto",
            "codigo_plataforma_credito",
            "valor_aprobado",
            "fecha_aprobacion",
            "codigo_credito",
        ];

        const hayCamposVacios = camposRequeridos.some(
            (campo) => !formData[campo] || formData[campo].trim() === "",
        );

        if (hayCamposVacios) {
            toast.error("Por favor, complete todos los campos obligatorios.");
            setLoading(false);
            return;
        }

        // Validación adicional de número positivo
        if (
            isNaN(formData.valor_aprobado) ||
            Number(formData.valor_aprobado) <= 0
        ) {
            toast.error("El valor aprobado debe ser un número mayor que cero.");
            setLoading(false);
            return;
        }
        const response = await registrarDatosAutorizacion(formData);
        console.log("response", response);
        setLoading(false);
        if (response === 201 || response === 200) {
            setFormData({
                identificacion_usuario: "",
                id_producto: "",
                codigo_plataforma_credito: "",
                valor_aprobado: "",
                fecha_aprobacion: "",
                codigo_credito: "",
                cod_usua_ingresa: "",
            });
            const nuevaConsulta = await obtenerDatosAutorizacion();
            setData(nuevaConsulta.data || []);
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "Válido":
                return "bg-green-100 text-green-800";
            case "No válido":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loadingPage) {
        return <LoaderPage />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Users className="mr-3 text-pink-600" size={28} />
                            Gestión de créditos aprobados
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={cerrarSesion}
                                className="flex items-center bg-pink-100 text-pink-600 py-1 px-3 rounded-full text-sm font-medium hover:bg-pink-200 transition"
                            >
                                <LogOut size={18} className="mr-1" />
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab("table")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                    activeTab === "table"
                                        ? "border-pink-600 text-pink-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <Users className="inline mr-2" size={18} />
                                Tabla de Usuarios
                            </button>
                            <button
                                onClick={() => setActiveTab("form")}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                                    activeTab === "form"
                                        ? "border-pink-600 text-pink-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                <FileText className="inline mr-2" size={18} />
                                Formulario
                            </button>
                        </nav>
                    </div>

                    {/* Table View */}
                    <div
                        className={`p-6 ${
                            activeTab !== "table" ? "hidden" : ""
                        }`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
                                Listado de Usuarios
                            </h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)}
                                    className="w-1/3 px-3 py-1.5 pl-10 text-sm disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all border-2"
                                />
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="text-sm text-center text-gray-600">
                                        <th>Identificación</th>
                                        <th>Código de autorización</th>
                                        <th>Producto</th>
                                        <th>Valor aprobado</th>
                                        <th>Estado</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredData.length > 0
                                        ? (
                                            paginatedData.map((row) => (
                                                <tr
                                                    key={row.id}
                                                    className="hover:bg-gray-50 text-sm text-center text-gray-800"
                                                >
                                                    <td className="px-6 py-4">
                                                        {row.identificacion_usuario}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {row.codigo_credito}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {row.id_producto}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        ${Number(
                                                            row.valor_aprobado,
                                                        ).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                getStatusColor(
                                                                    row.validado
                                                                        ? "Válido"
                                                                        : "No válido",
                                                                )
                                                            }`}
                                                        >
                                                            {row.validado
                                                                ? "Válido"
                                                                : "No válido"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {row.fecha_aprobacion}
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                        : (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="text-center text-sm text-gray-500 py-4"
                                                >
                                                    No se encontraron resultados
                                                    para "{searchTerm}"
                                                </td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-700">
                                Mostrando{" "}
                                <span className="font-medium">
                                    {paginatedData.length}
                                </span>{" "}
                                de{" "}
                                <span className="font-medium">
                                    {filteredData.length}
                                </span>{" "}
                                resultados
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            Math.max(prev - 1, 1)
                                        )}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                                        currentPage === 1
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                    }`}
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentPage((prev) =>
                                            prev <
                                                    Math.ceil(
                                                        filteredData.length /
                                                            ITEMS_PER_PAGE,
                                                    )
                                                ? prev + 1
                                                : prev
                                        )}
                                    disabled={currentPage ===
                                        Math.ceil(
                                            filteredData.length /
                                                ITEMS_PER_PAGE,
                                        )}
                                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                                        currentPage ===
                                                Math.ceil(
                                                    filteredData.length /
                                                        ITEMS_PER_PAGE,
                                                )
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                    }`}
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form View */}
                    <div
                        className={`p-6 ${
                            activeTab !== "form" ? "hidden" : ""
                        }`}
                    >
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Formulario de Autorización
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Identificación */}
                                <div>
                                    <label
                                        htmlFor="identificacion"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Identificación
                                    </label>
                                    <input
                                        type="text"
                                        id="identificacion_usuario"
                                        name="identificacion_usuario"
                                        value={formData.identificacion_usuario}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 text-sm disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all border-2"
                                        placeholder=""
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />
                                </div>

                                {/* Producto */}
                                <div>
                                    <label
                                        htmlFor="producto"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Producto
                                    </label>
                                    <select
                                        id="id_producto"
                                        name="id_producto"
                                        value={formData.id_producto}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 text-sm disabled:text-gray-900 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 border-2"
                                    >
                                        <option value="" disabled>
                                            Seleccionar producto
                                        </option>
                                        <option value="17">
                                            EXAMEN BEXA PARA DETECTAR MASAS EN
                                            MAMA
                                        </option>
                                    </select>
                                </div>

                                {/* Plataforma */}
                                <div>
                                    <label
                                        htmlFor="plataforma"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Plataforma
                                    </label>
                                    <select
                                        id="codigo_plataforma_credito"
                                        name="codigo_plataforma_credito"
                                        value={formData
                                            .codigo_plataforma_credito}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 text-sm disabled:text-gray-900 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all disabled:bg-gray-200 border-2"
                                    >
                                        <option value="" disabled>
                                            Seleccionar plataforma
                                        </option>
                                        <option value="1">MEDDIPAY</option>
                                    </select>
                                </div>

                                {/* Valor aprobado */}
                                <div>
                                    <label
                                        htmlFor="valor"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Valor aprobado
                                    </label>
                                    <input
                                        type="number"
                                        id="valor_aprobado"
                                        name="valor_aprobado"
                                        value={formData.valor_aprobado}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 text-sm disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all border-2"
                                        placeholder="Solo números"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        min="0"
                                    />
                                </div>

                                {/* Fecha de aprobación */}
                                <div>
                                    <label
                                        htmlFor="fecha_aprobacion"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Fecha de aprobación
                                    </label>
                                    <div className="relative mt-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Calendar
                                                size={16}
                                                className="text-gray-400"
                                            />
                                        </div>
                                        <input
                                            type="date"
                                            id="fecha_aprobacion"
                                            name="fecha_aprobacion"
                                            value={formData.fecha_aprobacion}
                                            onChange={handleFormChange}
                                            className="w-full px-3 py-1.5 text-sm disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all border-2"
                                        />
                                    </div>
                                </div>

                                {/* Código autorización */}
                                <div>
                                    <label
                                        htmlFor="codigo"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Código de autorización
                                    </label>
                                    <input
                                        type="text"
                                        id="codigo_credito"
                                        name="codigo_credito"
                                        value={formData.codigo_credito}
                                        onChange={handleFormChange}
                                        className="w-full px-3 py-1.5 text-sm disabled:bg-gray-200 disabled:text-gray-500 rounded-lg focus:ring-2 focus:ring-pink-600 focus:outline-none hover:shadow-md transition-all border-2"
                                        placeholder=""
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            identificacion_usuario: "",
                                            id_producto: "",
                                            codigo_plataforma_credito: "",
                                            valor_aprobado: "",
                                            fecha_aprobacion: "",
                                            codigo_credito: "",
                                            cod_usua_ingresa: "",
                                        })}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                                >
                                    Limpiar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md text-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600"
                                >
                                    {loading ? <Loader /> : "Guardar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
