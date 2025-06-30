import React, { useState } from "react";
import Formulario from "./formulario/Formulario";
import ListaProductos from "./formulario/ListaProductos";
import BotonDescarga from "./formulario/BotonDescarga";
import BotonDescargaExcel from "./formulario/BotonDescargaExcel";
import { v4 as uuidv4 } from "uuid";

export default function MainApp() {
  const [form, setForm] = useState({
    id: uuidv4(),
    codigo: "",
    nombre: "",
    marca: "",
    tipo: "",
    precio: "",
    descripcion: "",
    contacto: "",
    variantes: []
  });

  const [nuevaVariante, setNuevaVariante] = useState({ color: "", imagenUrl: "", talles: [] });
  const [productos, setProductos] = useState([]);
  const [theme, setTheme] = useState("light");

  const darkMode = theme === "dark";

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTalle = (num) => {
    setNuevaVariante((prev) => {
      const talles = prev.talles.includes(num)
        ? prev.talles.filter((t) => t !== num)
        : [...prev.talles, num];
      return { ...prev, talles };
    });
  };

  const toggleColor = (color) => setNuevaVariante((prev) => ({ ...prev, color }));

  const agregarVariante = () => {
    if (!nuevaVariante.color || !nuevaVariante.imagenUrl || nuevaVariante.talles.length === 0) return;

    const varianteConId = {
      ...nuevaVariante,
      id: uuidv4()
    };

    setForm((prev) => ({
      ...prev,
      variantes: [...prev.variantes, varianteConId]
    }));
    setNuevaVariante({ color: "", imagenUrl: "", talles: [] });
  };

  const eliminarVariante = (id) => {
    setForm((prev) => ({
      ...prev,
      variantes: prev.variantes.filter((v) => v.id !== id)
    }));
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.codigo || !form.nombre || form.variantes.length === 0) return;

    const nuevoProducto = {
      ...form,
      id: uuidv4(),
      precio: parseInt(form.precio)
    };
    setProductos([...productos, nuevoProducto]);
    setForm({
      id: uuidv4(),
      codigo: "",
      nombre: "",
      marca: "",
      tipo: "",
      precio: "",
      descripcion: "",
      contacto: "",
      variantes: []
    });
  };

  const descargarJSON = () => {
  // Crear una copia de productos sin el campo contacto
  const productosSinContacto = productos.map(({ contacto, ...resto }) => resto);

  const blob = new Blob([JSON.stringify(productosSinContacto, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "productos.json";
  link.click();
  URL.revokeObjectURL(url);
};

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#f1f1f1" : "#000",
        padding: 20,
        boxSizing: "border-box"
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ marginBottom: 20 }}>📦 Cargar Zapatilla</h2>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            style={{
              padding: "8px 16px",
              borderRadius: 5,
              backgroundColor: darkMode ? "#444" : "#ccc",
              color: darkMode ? "#fff" : "#000",
              border: "none",
              cursor: "pointer"
            }}
          >
            Cambiar a modo {darkMode ? "Claro" : "Oscuro"}
          </button>
        </div>

        <Formulario
          form={form}
          setForm={setForm}
          nuevaVariante={nuevaVariante}
          setNuevaVariante={setNuevaVariante}
          handleFormChange={handleFormChange}
          toggleColor={toggleColor}
          toggleTalle={toggleTalle}
          agregarVariante={agregarVariante}
          eliminarVariante={eliminarVariante}
          handleSubmit={handleSubmit}
          darkMode={darkMode}
        />

        <hr style={{ margin: "40px 0" }} />

        <ListaProductos productos={productos} eliminarProducto={eliminarProducto} darkMode={darkMode} />

        <BotonDescarga productos={productos} descargarJSON={descargarJSON} />
        <BotonDescargaExcel productos={productos} />
      </div>
    </div>
  );
}
