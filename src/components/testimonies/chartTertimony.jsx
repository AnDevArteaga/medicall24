import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Testimony from '../charts/testimony';

const DataSlider = ({ data = {} }) => {
  const dataEntries = Object.entries(data || {});
  const hasData = dataEntries.length > 0;
  const [itemsPerSlide, setItemsPerSlide] = useState(3); // Valor inicial

  const [currentIndex, setCurrentIndex] = useState(0);
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
      <div className="max-w-7xl mx-auto p-6 sm:p-2 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Gráficos de Testimonios
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
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (canGoPrev) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerSlide;
    return dataEntries.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={`p-2 rounded-full ${
              canGoPrev 
                ? 'bg-pink-600 hover:bg-pink-700 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
                className="grid grid-cols-3 gap-4 sm:grid-cols-1"
              >
                {getCurrentItems().map(([key, dataset]) => {
                  const titleItem = dataset.find(item => item.value === 1);
                  const filteredData = dataset.filter(item => item.value !== 1);
                  
                  return (
                    <div 
                      key={key}
                      className="bg-white p-6 sm:p-2 rounded-lg"
                    >
                      {titleItem && (
                        <h2 className="text-base font-semibold text-gray-600 text-center mb-4">
                          {titleItem.name}
                        </h2>
                      )}
                      <div>
                        <Testimony data={filteredData} />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={nextSlide}
            disabled={!canGoNext}
            className={`p-2 rounded-full ${
              canGoNext 
                ? 'bg-pink-600 hover:bg-pink-700 text-white' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
                index === currentIndex ? 'bg-pink-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataSlider;