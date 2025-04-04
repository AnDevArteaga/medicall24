import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";
import aliadosData from "../../../../../json/paso_a_paso/bexa/aliados.json";
import appsStore from "../../../../../assets/apps.png";
import playStore from "../../../../../assets/store.png";

const PaginationBexa = ({ openModalPasosBexa, setHrefModal }) => {
    const { id_aliado } = useParams();
    console.log("id_producto", id_aliado);

    const baseItems = [
        {
            id: 1,
            title: "PASO 1",
            desc: "Descarga la App MEDICALL24, regístrate e inicia sesión.",
            image: "",
        },
        {
            id: 2,
            title: "PASO 2",
            desc:
                "Busca el menú Consultar y accede a la opción CONSULTA PARTICULAR.",
            image: "",
        },
        {
            id: 3,
            title: "PASO 3",
            desc: "Escoge la especialidad.",
            image: "",
        },
        {
            id: 4,
            title: "PASO 4",
            desc: "Seleccione el prestador de salud",
            image: "",
        },
        {
            id: 5,
            title: "PASO 5",
            desc: "Ingresa a la opción CONSULTA PARTICULAR.",
            image: "",
        },
        {
            id: 6,
            title: "PASO 6",
            desc: "Elige un Médico.",
            image: "",
        },
        {
            id: 7,
            title: "PASO 7",
            desc: "Selecciona el día de la consulta.",
            image: "",
        },
        {
            id: 8,
            title: "PASO 8",
            desc: "Selecciona el horario de la consulta.",
            image: "",
        },
        {
            id: 9,
            title: "PASO 9",
            desc:
                "En el campo OBSERVACIÓN, escribe la solicitud para hacer examen BEXA.",
            image: "",
        },
        {
            id: 10,

            title: "PASO 10",
            desc: "Presiona el botón de Aceptar.",
            image: "",
        },
        {
            id: 11,
            title: "PASO 11",
            desc:
                "Cuando el Prestador de Salud apruebe tu solicitud, podrás ver el detalle de la cita asignada en la opción CITAS del menú Mis Consultas.",
            image: "",
        },
    ];

    const items = useMemo(() => {
        const aliadoImages = aliadosData[id_aliado] || []; // Busca el aliado en el JSON
        const nameData = aliadoImages.find((data) => data.name)?.name ||
            "Prestador Desconocido"; // Busca el nombre del aliado en el JSON

        const updateDesc = "Seleccione el prestador de salud " + nameData;

        return baseItems.map((item) => {
            const imgData = aliadoImages.find((img) => img.id === item.id); // Busca la imagen por ID
            return {
                ...item,
                image: imgData ? imgData.image : item.image,
                desc: item.id === 4 ? updateDesc : item.desc,
            }; // Asigna la imagen si existe
        });
    }, [id_aliado]);

    // Función para precargar imágenes
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages = {};
            for (const item of items) {
                const img = new Image();
                img.src = item.image;
                await img.decode().catch(() => {}); // Esperar a que se decodifique la imagen
                loadedImages[item.image] = img.src;
            }
            setPreloadedImages(loadedImages);
        };

        preloadImages();
    }, [items]); // Solo se ejecuta cuando `items` cambia

    const [currentPage, setCurrentPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState({}); // Estado para almacenar imágenes precargadas, esto para que al momento de renderizar la página se carguen las imágenes previamente y no se carguen cada vez que se cambia de página

    const handleOpenModalPasosBexa = (href) => {
        setHrefModal(href);
        openModalPasosBexa(true);
    };

    const itemsPerPage = 3;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);

    const changePage = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setIsTransitioning(true);

        setTimeout(() => {
            setCurrentPage(newPage);
            setIsTransitioning(false);
        }, 300); // Match this duration with the CSS animation
    };

    return (
        <div className="container mx-auto px-4 py-2 relative mt-2 flex flex-col items-center justify-center">
            {/* Grid Layout */}
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="sm:hidden disabled:bg-gray-300 z-10 mb-60 cursor-pointer flex absolute left-0 bg-pink-600 p-3 rounded-full shadow-md hover:bg-pink-500 transition-all text-white disabled:hover:shadow-none"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-out ${
                    isTransitioning
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                }`}
            >
                {currentItems.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 ease-in-out hover:-translate-y-1"
                    >
                        <div className="flex justify-center p-2">
                            <h3
                                className={`text-3xl font-bold mb-3 text-gray-800 dark:text-white 
                             group-hover:text-pink-600 transition-colors duration-300 ${
                                    item.id === 2
                                        ? "ml-12"
                                        : item.id === 11
                                        ? "ml-6"
                                        : "ml-0"
                                }`}
                            >
                                {item.title}
                            </h3>
                        </div>
                        {/* Image Container */}
                        <div className="overflow-hidden flex justify-center">
                            <img
                                src={preloadedImages[item.image] || item.image}
                                alt={item.title}
                                className={`${
                                    item.id === 2
                                        ? "w-2/3"
                                        : item.id === 11
                                        ? "w-4/5"
                                        : "w-1/2"
                                } h-full`}
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-gray-600 text-lg dark:text-gray-300 mb-4 line-clamp-4">
                                {item.desc}
                            </p>
                            {item.id === 1 && (
                                <div className="flex gap-4 items-center w-full">
                                    <a
                                        href="https://play.google.com/store/apps/details?id=com.devdvs.medicall.medicall24"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1"
                                    >
                                        <img
                                            src={playStore}
                                            alt="Google Play"
                                            className="w-full"
                                        />
                                    </a>
                                    <a
                                        href="https://apps.apple.com/co/app/medicall24/id6661032000?l=en-GB"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1"
                                    >
                                        <img
                                            src={appsStore}
                                            alt="App Store"
                                            className="w-full"
                                        />
                                    </a>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    className="text-pink-600 hover:text-pink-700 flex items-center gap-2 
                                   text-sm font-medium transition-colors duration-300"
                                    onClick={() =>
                                        handleOpenModalPasosBexa(
                                            preloadedImages[item.image] ||
                                                item.image,
                                        )}
                                >
                                    VER
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex flex-row sm:flex-row items-center justify-center gap-4 sm:gap-2">
                {/* Previous Button */}
                <button
                    onClick={() => {
                        changePage(currentPage - 1);
                        if (window.innerWidth <= 768) {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }
                    }}
                    disabled={currentPage === 1}
                    className="sm:flex hidden items-center px-5 py-2.5 bg-pink-600 text-white rounded-lg w-1/3 sm:w-auto
                    disabled:bg-gray-300 disabled:cursor-not-allowed justify-center
                    hover:bg-pink-700 active:scale-95 transform transition-all 
                    duration-300 ease-out hover:shadow-lg disabled:hover:shadow-none
                    gap-2 font-medium sm:text-sm"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2 sm:gap-0 flex-row justify-center">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => changePage(i + 1)}
                            className={`sm:text-sm w-10 h-10 sm:w-8 sm:h-8 rounded-lg transition-all duration-300 font-medium
                         ${
                                currentPage === i + 1
                                    ? "bg-pink-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => {
                        changePage(currentPage + 1);
                        if (window.innerWidth <= 768) {
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        }
                    }}
                    disabled={currentPage === totalPages}
                    className="sm:flex hidden items-center px-5 py-2.5 bg-pink-600 text-white rounded-lg w-1/3 sm:w-auto
                    disabled:bg-gray-300 disabled:cursor-not-allowed justify-center
                    hover:bg-pink-700 active:scale-95 transform transition-all 
                    duration-300 ease-out hover:shadow-lg disabled:hover:shadow-none
                    gap-2 font-medium sm:text-sm"
                >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
            {/* Flechas laterales en pantallas grandes */}
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="sm:hidden flex mb-60 cursor-pointer absolute right-0 bg-pink-600 p-3 rounded-full shadow-md hover:bg-pink-500 transition-all text-white disabled:bg-gray-300 disabled:hover:shadow-none"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default PaginationBexa;
