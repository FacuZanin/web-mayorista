// BotonDescarga.jsx
import React, { useState } from "react";

const BotonDescarga = ({ productos, descargarJSON }) => {
  const [mensaje, setMensaje] = useState("");

  const handleClick = () => {
    if (productos.length === 0) {
      setMensaje("⚠️ No hay productos para descargar.");
      return;
    }
    descargarJSON();
    setMensaje("✅ Archivo descargado correctamente.");
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div style={{ marginTop: 30, textAlign: "center" }}>
      <button
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        📥 Descargar JSON
      </button>
      {mensaje && (
        <div style={{ marginTop: 10, color: "#28a745", fontWeight: "bold" }}>{mensaje}</div>
      )}
    </div>
  );
};

export default BotonDescarga;
