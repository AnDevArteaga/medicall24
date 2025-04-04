import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

// Estilos mejor organizados y compactos
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10, // Tamaño más pequeño
        position: 'relative',
        backgroundColor: '#fff',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.15, // Más transparente
    },
    section: {
        marginBottom: 10,
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    table: {
        width: '100%',
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        borderBottomStyle: 'solid',
    },
    tableCellHeader: {
        width: '33.3%',
        padding: 5,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
    },
    tableCell: {
        width: '33.3%',
        padding: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
        fontSize: 8,
        textAlign: 'center',
        color: '#888',
    },
});

// Documento PDF
const MyDocument = ({ name }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Imagen de fondo */}
            <Image
                style={styles.backgroundImage}
                src="https://via.placeholder.com/800x1120" // Aquí puedes poner la URL o un base64
            />
            
            {/* Título */}
            <View style={styles.section}>
                <Text style={styles.header}>Reporte de Información</Text>
                <Text>Nombre: {name}</Text>
                <Text>Este es un ejemplo de un reporte organizado con una estructura limpia y profesional.</Text>
            </View>

            {/* Tabla de Datos */}
            <View style={styles.table}>
                {/* Encabezados */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Nombre</Text>
                    <Text style={styles.tableCellHeader}>Edad</Text>
                    <Text style={styles.tableCellHeader}>País</Text>
                </View>

                {/* Filas de datos */}
                {[
                    { nombre: 'Juan Pérez', edad: 28, pais: 'México' },
                    { nombre: 'María Gómez', edad: 34, pais: 'España' },
                    { nombre: 'Carlos Ruiz', edad: 30, pais: 'Argentina' },
                    { nombre: 'Ana Torres', edad: 25, pais: 'Chile' },
                ].map((row, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Text style={styles.tableCell}>{row.nombre}</Text>
                        <Text style={styles.tableCell}>{row.edad}</Text>
                        <Text style={styles.tableCell}>{row.pais}</Text>
                    </View>
                ))}
            </View>

            {/* Footer */}
            <Text style={styles.footer}>Este es un reporte generado automáticamente el {new Date().toLocaleDateString()}</Text>
        </Page>
    </Document>
);

// Botón de descarga
const PdfGenerator = ( { name } ) => (
    <div>
        <h3>Generador de PDF Profesional</h3>
        <PDFDownloadLink document={<MyDocument name={name} />} fileName="reporte_organizado.pdf">
            {({ loading }) => (loading ? 'Preparando documento...' : 'Descargar PDF')}
        </PDFDownloadLink>
    </div>
);

export default PdfGenerator;
