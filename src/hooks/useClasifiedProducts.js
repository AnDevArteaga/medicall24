// useClasificadorProductos.js
import { useState, useEffect } from 'react';

/**
 * @param {Array} productos - Array de productos a clasificar
 * @returns {Object} - Objeto con los productos clasificados
 */
export const useClasificadorProductos = (productos) => {
  const [productosClasificados, setProductosClasificados] = useState({
    planesTelemedicina: [],
    examenBexa: [],
    otrosProductos: []
  });

  useEffect(() => {
    if (productos && productos.length > 0) {
      // IDs para clasificación (ajusta estos IDs según tus necesidades)
      const idsPlanesTelemedicina = [1, 2, 3, 4, 5, 6]; 
      const idsExamenBexa = [16, 17]; 

      // Clasificar productos
      const planesTelemedicina = productos.filter(producto => 
        idsPlanesTelemedicina.includes(producto.id_producto)
      );
      
      const examenBexa = productos.filter(producto => 
        idsExamenBexa.includes(producto.id_producto)
      );
      


      // Actualizar estado con productos clasificados
      setProductosClasificados({
        planesTelemedicina,
        examenBexa,
      });
    }
  }, [productos]);

  return productosClasificados;
};
