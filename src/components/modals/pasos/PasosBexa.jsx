import { useState } from "react";
import PropTypes from "prop-types";

const ImageModal = ({ href, closeModalPasosBexa, isOpenModalPasosBexa }) => {
    const [zoomed, setZoomed] = useState(false);

  if (!isOpenModalPasosBexa) return null;

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };

  return (
    <div
      className="fixed inset-0 bg-black z-10 bg-opacity-50 flex justify-center items-center backdrop-blur-lg p-4"
      onClick={closeModalPasosBexa}
    >
      <div
        className="relative bg-transparent max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={closeModalPasosBexa}
          className="absolute top-4 right-4 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-500 transition duration-300"
        >
          ✕
        </button>

        {/* Image Container */}
        <div className={`flex justify-center h-screen items-center p-6`}>
          <img
            src={href}
            alt="pasosBexa"
            className={`max-h-[80vh] w-auto transition-transform duration-300 ${
              zoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
            onClick={toggleZoom}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

ImageModal.propTypes = {
  href: PropTypes.string.isRequired,
  closeModalPasosBexa: PropTypes.func.isRequired,
  isOpenModalPasosBexa: PropTypes.bool.isRequired,
};