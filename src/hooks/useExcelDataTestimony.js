import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import excelFile from "../assets/encuesta.xlsx"; // Importa el archivo

const useExcelData = () => {
    const [datosGrafico, setDatosGraficos] = useState({});
    const [datosFiltrados, setDatosFiltrados] = useState([]);

    const contarOcurrencias = (respuestas) => {
        return respuestas.reduce((acc, respuesta) => {
            acc[respuesta] = (acc[respuesta] || 0) + 1;
            return acc;
        }, {});
    };

    const formatearDatos = (conteo) => {
        return Object.keys(conteo).map((key) => ({
            name: key,
            value: conteo[key],
        }));
    };

    useEffect(() => {
        fetch(excelFile)
            .then((response) => response.arrayBuffer())
            .then((data) => {
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                });

                const nuevoDatosGraficos = {};
                for (let i = 5; i <= 11; i++) {
                    const respuestas = jsonData.map((row) => row[i]).filter(
                        Boolean,
                    );
                    nuevoDatosGraficos[`datosGrafico${i - 4}`] = formatearDatos(
                        contarOcurrencias(respuestas),
                    );
                }

                // Obtener las claves en el orden actual
                const claves = Object.keys(nuevoDatosGraficos);

                // Reordenar: las últimas 3 pasan a ser las primeras y la primera columna al final
                const nuevasClaves = [
                    ...claves.slice(-3), // Últimas 3 como primeras
                    ...claves.slice(1, -3), // Resto de las claves sin la primera
                    claves[0], // Primera columna al final
                ];

                // Crear un nuevo objeto con el nuevo orden
                const datosOrdenados = nuevasClaves.reduce((obj, clave) => {
                    obj[clave] = nuevoDatosGraficos[clave];
                    return obj;
                }, {});

                setDatosGraficos(datosOrdenados);

                const datosExtraidos = jsonData.slice(1).map((row) => {
                    if (row[12]) {
                        return { columna3: row[2], columna13: row[12] };
                    }
                    return null;
                }).filter(Boolean);

                setDatosFiltrados(datosExtraidos);
            })
            .catch((error) =>
                console.error("Error al cargar el archivo:", error)
            );
    }, []);

    return { datosGrafico, datosFiltrados };
};

export default useExcelData;
