import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import gabriela from "../../assets/posterGabrielaLobo.jpg";
import thelmira from "../../assets/posterThelmiraVa.jpg";
import miriam from "../../assets/posterMirian.jpg";
import glenys from "../../assets/posterGlenys.jpg";
import miguelina from "../../assets/posterMiguelina.jpg";
import poster from "../../assets/poster.jpg";
import poster2 from "../../assets/poster2.jpg";



const VideoSlider = ({ data = {} }) => {
  const videoEntries = Object.entries(data || {});
  const hasVideos = videoEntries.length > 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3); // Valor inicial


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
  

  if (!hasVideos) {
    return (
      <div className="text-center text-gray-600">No hay videos disponibles</div>
    );
  }

  const totalSlides = Math.ceil(videoEntries.length / itemsPerSlide);
  const canGoNext = currentIndex < totalSlides - 1;
  const canGoPrev = currentIndex > 0;

  const nextSlide = () => {
    if (canGoNext) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (canGoPrev) setCurrentIndex((prev) => prev - 1);
  };

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerSlide;
    return videoEntries.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="relative flex items-center justify-between gap-4">
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
              className="grid grid-cols-3 sm:grid-cols-1 gap-4 place-items-center"
            >
              {getCurrentItems().map(([key, { url, name }]) => (
                <div
                  key={key}
                  className="rounded-lg overflow-hidden flex flex-col items-center"
                >
                  <video
                    controls
                    className="w-2/3 h-auto sm:w-full"
                    poster={name === "Gabriela Lobo"
                      ? gabriela
                      : name == "Thelmira Vanegas"
                      ? thelmira : name == "Glenys Ramos" ? glenys : name == "Ana Rojas" ? poster : name == "Miguelina Padilla" ? miguelina : name == "Miriam Estrada" ? miriam : poster2}
                  > 
                    <source src={url} type="video/mp4" />
                    Tu navegador no soporta la reproducción de videos.
                  </video>
                  <p className="text-gray-600 font-semibold mt-2">{name}</p>
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
    </div>
  );
};

export default VideoSlider;
