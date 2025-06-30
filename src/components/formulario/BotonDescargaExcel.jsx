// src/components/formulario/BotonDescargaExcel.jsx
import React from "react";
import * as XLSX from "xlsx";

const BotonDescargaExcel = ({ productos }) => {
  const exportarExcel = () => {
    if (productos.length === 0) return;

    const filas = productos.flatMap((producto) => {
      return producto.variantes.map((variante) => ({
        Codigo: producto.codigo,
        Nombre: producto.nombre,
        Marca: producto.marca,
        Precio: producto.precio,
        Talles: variante.talles.join(", "),
        Imagen: variante.imagenUrl,
        Contacto: producto.contacto
      }));
    });

    const hoja = XLSX.utils.json_to_sheet(filas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Productos");
    XLSX.writeFile(libro, "productos.xlsx");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 10 }}>
      <button
        onClick={exportarExcel}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        📊 Descargar Excel
      </button>
    </div>
  );
};

export default BotonDescargaExcel;
