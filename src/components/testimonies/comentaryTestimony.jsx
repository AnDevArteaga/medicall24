import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, User2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const DataSlider = ({ data = {} }) => {
    const dataEntries = Object.entries(data || {}).filter(([, value]) =>
        value.columna13 !== undefined
    );
    const hasData = dataEntries.length > 0;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3); // Valor inicial

      // Función para actualizar itemsPerSlide según el tamaño de la pantalla
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1); // Móvil (sm)
      } else if (window.innerWidth < 769) {
        setItemsPerSlide(1); // Tablets (md)
      } else {
        setItemsPerSlide(3); // Escritorio (lg+)
      }
    };

    updateItemsPerSlide(); // Ejecutar en la carga inicial
    window.addEventListener('resize', updateItemsPerSlide); // Agregar evento de escucha
    return () => window.removeEventListener('resize', updateItemsPerSlide); // Limpiar evento al desmontar
  }, []);

    if (!hasData) {
        return (
            <div className="max-w-7xl mx-auto p-6 bg-gray-100">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
                    Comentarios
                </h3>
                <div className="text-center text-gray-600">
                    No hay datos disponibles para mostrar
                </div>
            </div>
        );
    }

    const totalSlides = Math.ceil(dataEntries.length / itemsPerSlide);
    const canGoNext = currentIndex < totalSlides - 1;
    const canGoPrev = currentIndex > 0;

    const nextSlide = () => {
        if (canGoNext) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (canGoPrev) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const getCurrentItems = () => {
        const startIndex = currentIndex * itemsPerSlide;
        return dataEntries.slice(startIndex, startIndex + itemsPerSlide);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-2 md:p-4">
            <div className="relative">
                <div className="flex items-center justify-between gap-2">
                    <button
                        onClick={prevSlide}
                        disabled={!canGoPrev}
                        className={`p-2 rounded-full ${
                            canGoPrev
                                ? "bg-pink-600 hover:bg-pink-700 text-white"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-3 gap-2 sm:grid-cols-1"
                            >
                                {getCurrentItems().map(([key, dataset]) => (
                                

                                    <div
                                        className="bg-white shadow-lg rounded-lg p-6 relative mx-auto h-[240px] w-full border-2 border-gray-200"
                                        key={key}
                                    >
                                        <div className="flex items-center mb-4">
                                            <div className="bg-purple-100 rounded-full p-2 mr-3">
                                                <User2 className="w-6 h-6 text-pink-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {dataset.columna3}
                                            </h3>
                                        </div>
                                        <Quote className="absolute top-4 right-4 w-6 h-6 text-pink-300 transform rotate-180" />
                                        <p className="text-gray-600 mb-4 relative z-10">
                                            {dataset.columna13}
                                        </p>
                                        <Quote className="absolute bottom-4 right-4 w-6 h-6 text-pink-300" />
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={nextSlide}
                        disabled={!canGoNext}
                        className={`p-2 rounded-full ${
                            canGoNext
                                ? "bg-pink-600 hover:bg-pink-700 text-white"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="flex justify-center mt-4 gap-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                                index === currentIndex
                                    ? "bg-pink-600"
                                    : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataSlider;
