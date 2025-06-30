const ListaProductos = ({ productos, eliminarProducto, darkMode }) => {
  return (
    <div>
      <h3 style={{ marginBottom: 20 }}>🧾 Productos cargados: {productos.length}</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {productos.map((p) => (
          <li
            key={p.id}
            style={{
              marginBottom: 20,
              background: darkMode ? "#2c2c2c" : "#f9f9f9",
              padding: 20,
              borderRadius: 10,
              boxShadow: darkMode ? "0 0 10px rgba(255,255,255,0.05)" : "0 0 10px rgba(0,0,0,0.1)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h4 style={{ margin: 0 }}>{p.nombre}</h4>
                <span style={{ fontSize: 14, color: darkMode ? "#bbb" : "#555" }}>
                  {p.marca} - {p.tipo} | Código: {p.codigo}
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold", fontSize: 18 }}>${p.precio}</div>
                <div style={{ fontSize: 14 }}> {p.contacto}</div>
              </div>
            </div>

            <p style={{ marginTop: 10 }}>{p.descripcion}</p>

            <ul style={{ paddingLeft: 20, marginTop: 10 }}>
              {p.variantes.map((v) => (
                <li key={v.id} style={{ marginBottom: 6 }}>
                  <strong>Color:</strong> {v.color} | <strong>Talles:</strong> {v.talles.join(", ")} | {" "}
                  <a
                    href={v.imagenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: darkMode ? "#66bfff" : "#007bff" }}
                  >
                    Ver Imagen
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={() => eliminarProducto(p.id)}
              style={{
                marginTop: 15,
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer"
              }}
            >
              🗑️ Eliminar Producto
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
