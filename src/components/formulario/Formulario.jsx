const Formulario = ({
  form,
  setForm,
  nuevaVariante,
  setNuevaVariante,
  handleFormChange,
  toggleColor,
  toggleTalle,
  agregarVariante,
  eliminarVariante,
  handleSubmit,
  darkMode,
  mantenerContacto,
  setMantenerContacto
}) => {
  const tallesDisponibles = ["20 al 25", "26 al 33", "34 al 39", "38 al 43"];
  const marcasDisponibles = ["Adidas", "Asics", "Vans", "Nike", "Puma", "New Balance", "Boss", "Converse", "Tommy Hilfiger", "Veja", "CAT", "Mizuno", "Fila", "Lacoste", "Olympikus"];
  const tiposDisponibles = ["Urbano", "Deportivo", "Borcegos", "Stiletto", "Mocasines", "Botines", "Ojotas", "Crocs", "Niños"];
  const coloresDisponibles = [
    { nombre: "Amarillo", valor: "yellow" },
    { nombre: "Azul", valor: "blue" },
    { nombre: "Blanco", valor: "white" },
    { nombre: "Celeste", valor: "#87CEEB" },
    { nombre: "Beige", valor: "beige" },
    { nombre: "Fucsia", valor: "fuchsia" },
    { nombre: "Gris", valor: "gray" },
    { nombre: "Marrón", valor: "#8B4513" },
    { nombre: "Naranja", valor: "orange" },
    { nombre: "Negro", valor: "black" },
    { nombre: "Rojo", valor: "red" },
    { nombre: "Rosa", valor: "pink" },
    { nombre: "Verde", valor: "green" },
    { nombre: "Violeta", valor: "violet" },
    { nombre: "Varios", valor: "linear-gradient(45deg, red, yellow, green, blue, violet)" }
  ];

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: darkMode ? "#2c2c2c" : "#f4f4f4",
        padding: 25,
        borderRadius: 12,
        boxShadow: "0 0 15px rgba(0,0,0,0.15)"
      }}
    >
<div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
  <input
    name="codigo"
    placeholder="Código"
    value={form.codigo}
    onChange={handleFormChange}
    required
    style={{ flexBasis: "48%", minWidth: "48%" }}
  />
  <input
    name="nombre"
    placeholder="Nombre"
    value={form.nombre}
    onChange={handleFormChange}
    required
    style={{ flexBasis: "48%", minWidth: "48%" }}
  />
</div>


<div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
  <input
    name="precio"
    placeholder="Precio"
    value={form.precio}
    onChange={handleFormChange}
    required
    type="number"
    style={{ flexBasis: "48%", minWidth: "48%" }}
  />

  {/* Campo de contacto con mantener corregido */}
  <div style={{
    flexBasis: "48%",
    minWidth: "48%",
    position: "relative",
    display: "flex",
    alignItems: "center"
  }}>
    <input
      name="contacto"
      placeholder="Número de contacto"
      value={form.contacto}
      onChange={handleFormChange}
      required
      style={{
        width: "100%",
        paddingRight: 90
      }}
    />
    <label
      style={{
        position: "absolute",
        right: 10,
        display: "flex",
        alignItems: "center",
        gap: 4,
        fontSize: 12,
        color: darkMode ? "#ccc" : "#333"
      }}
    >
      <input
        type="checkbox"
        checked={mantenerContacto}
        onChange={(e) => setMantenerContacto(e.target.checked)}
      />
      Mantener
    </label>
  </div>
</div>


      <div style={{ marginBottom: 10 }}>
        <strong>Seleccionar Marca:</strong><br />
        {marcasDisponibles.map((marca) => (
          <button
            key={marca}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, marca }))}
            style={{
              margin: "5px 5px 0 0",
              backgroundColor: form.marca === marca ? "#007bff" : "#ccc",
              color: form.marca === marca ? "#fff" : "#000",
              border: "none",
              borderRadius: 4,
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            {marca}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 10 }}>
        <strong>Seleccionar Tipo de Calzado:</strong><br />
        {tiposDisponibles.map((tipo) => (
          <button
            key={tipo}
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, tipo }))}
            style={{
              margin: "5px 5px 0 0",
              backgroundColor: form.tipo === tipo ? "#007bff" : "#ccc",
              color: form.tipo === tipo ? "#fff" : "#000",
              border: "none",
              borderRadius: 4,
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            {tipo}
          </button>
        ))}
      </div>

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleFormChange}
        rows={6}
        style={{ width: "100%", marginBottom: 20, resize: "none" }}
      />

      <div style={{ marginBottom: 10 }}>
        <strong>Seleccionar Color:</strong><br />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "5px" }}>
          {coloresDisponibles.map(({ nombre, valor }) => (
            <div
              key={nombre}
              onClick={() => toggleColor(nombre)}
              style={{
                width: 32,
                height: 32,
                background: valor,
                borderRadius: 4,
                cursor: "pointer",
                border: nuevaVariante.color === nombre ? "3px solid #007bff" : "1px solid #ccc",
                boxSizing: "border-box"
              }}
              title={nombre}
            />
          ))}
        </div>
      </div>

      <input
        name="imagenUrl"
        placeholder="Imagen Variante (URL)"
        value={nuevaVariante.imagenUrl}
        onChange={(e) => setNuevaVariante((prev) => ({ ...prev, imagenUrl: e.target.value }))}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <div style={{ marginBottom: 15 }}>
        <strong>Seleccionar Talles:</strong><br />
        {tallesDisponibles.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => toggleTalle(t)}
            style={{
              margin: "5px 5px 0 0",
              backgroundColor: nuevaVariante.talles.includes(t) ? "#28a745" : "#ccc",
              color: nuevaVariante.talles.includes(t) ? "#fff" : "#000",
              border: "none",
              borderRadius: 4,
              padding: "5px 10px",
              cursor: "pointer"
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={agregarVariante}
        style={{
          padding: "10px",
          backgroundColor: "#17a2b8",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Agregar Variante
      </button>

      <div style={{ margin: "15px 0" }}>
        <strong>Variantes añadidas:</strong>
        <ul>
          {form.variantes.map((v) => (
            <li key={v.id}>
              {v.color} - Talles: {v.talles.join(", ")} -{" "}
              <a href={v.imagenUrl} target="_blank" rel="noopener noreferrer">
                Ver Imagen
              </a>
              <button
                onClick={() => eliminarVariante(v.id)}
                style={{
                  marginLeft: 10,
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 8px",
                  cursor: "pointer"
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        style={{
          marginTop: 10,
          padding: "12px 24px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default Formulario;
