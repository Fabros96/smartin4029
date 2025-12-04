import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

/*
  ============================================
  PLANTILLA GENÉRICA PARA CRUD
  ============================================
  
  Esta es una plantilla de ejemplo. Para crear tu propio CRUD:
  
  1. Copiá este archivo y renombralo (ej: TicketsCrud.jsx)
  
  2. Reemplazá "recurso" por tu endpoint:
     - Línea 28: api.get("/recurso") → api.get("/tickets")
     - Línea 43: api.patch("/recurso/...") → api.patch("/tickets/...")
     - Línea 46: api.post("/recurso") → api.post("/tickets")
     - Línea 68: api.delete("/recurso/...") → api.delete("/tickets/...")
  
  3. Modificá los campos del formulario (líneas 82-92)
     Ejemplo para tickets:
     <input type="text" placeholder="Título" value={form.titulo} ... />
     <input type="text" placeholder="Descripción" value={form.descripcion} ... />
     <select value={form.prioridad} ...>
       <option value="baja">Baja</option>
       <option value="media">Media</option>
       <option value="alta">Alta</option>
     </select>
  
  4. Modificá las columnas de la tabla (líneas 108-118)
     Ejemplo:
     <th>Título</th>
     <th>Descripción</th>
     <th>Prioridad</th>
     ...
     <td>{item.titulo}</td>
     <td>{item.descripcion}</td>
     <td>{item.prioridad}</td>
  
  5. Actualizá el estado inicial del formulario (línea 18)
     Ejemplo: { titulo: "", descripcion: "", prioridad: "baja" }
*/

export default function GenericCrudTemplate() {
  // Estado para la lista de elementos
  const [items, setItems] = useState([]);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado del formulario - MODIFICAR SEGÚN TUS CAMPOS
  const [form, setForm] = useState({
    campo1: "",
    campo2: "",
    campo3: "",
  });

  // ID del elemento que se está editando (null = modo creación)
  const [editingId, setEditingId] = useState(null);

  // -----------------------------
  // 1) Cargar todos los elementos desde el backend
  // -----------------------------
  const fetchItems = async () => {
    try {
      setLoading(true);
      // MODIFICAR: cambiar "recurso" por tu endpoint (ej: "/tickets")
      const res = await api.get("/recurso");
      setItems(res.data);
    } catch (err) {
      console.error("Error cargando recursos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar elementos al montar el componente
  useEffect(() => {
    fetchItems();
  }, []);

  // -----------------------------
  // 2) Crear o actualizar elemento
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Modo edición: PATCH
        await api.patch(`/recurso/${editingId}`, form);
      } else {
        // Modo creación: POST
        await api.post("/recurso", form);
      }

      // Resetear formulario
      setForm({ campo1: "", campo2: "", campo3: "" });
      setEditingId(null);

      // Recargar lista
      fetchItems();
    } catch (err) {
      console.error("Error guardando recurso:", err);
    }
  };

  // -----------------------------
  // 3) Editar elemento (rellenar formulario)
  // -----------------------------
  const handleEdit = (item) => {
    // MODIFICAR: ajustar según tus campos
    setForm({
      campo1: item.campo1 || "",
      campo2: item.campo2 || "",
      campo3: item.campo3 || "",
    });
    setEditingId(item.id);
  };

  // -----------------------------
  // 4) Eliminar elemento
  // -----------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este recurso?")) return;

    try {
      await api.delete(`/recurso/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error eliminando recurso:", err);
    }
  };

  // -----------------------------
  // 5) Cancelar edición
  // -----------------------------
  const handleCancel = () => {
    setForm({ campo1: "", campo2: "", campo3: "" });
    setEditingId(null);
  };

  return (
      <div>
        <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Gestión de Recursos</h2>

        {/* FORMULARIO - MODIFICAR INPUTS SEGÚN TUS CAMPOS */}
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Campo 1"
            value={form.campo1}
            onChange={(e) => setForm({ ...form, campo1: e.target.value })}
            required
            style={{ marginRight: "5px" }}
          />

          <input
            type="text"
            placeholder="Campo 2"
            value={form.campo2}
            onChange={(e) => setForm({ ...form, campo2: e.target.value })}
            required
            style={{ marginRight: "5px" }}
          />

          <input
            type="text"
            placeholder="Campo 3"
            value={form.campo3}
            onChange={(e) => setForm({ ...form, campo3: e.target.value })}
            required
            style={{ marginRight: "5px" }}
          />

          <button type="submit" style={{ marginRight: "5px" }}>
            {editingId ? "Actualizar" : "Crear"}
          </button>

          {editingId && (
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </form>

        {/* TABLA - MODIFICAR COLUMNAS SEGÚN TUS CAMPOS */}
        {loading ? (
          <p>Cargando recursos...</p>
        ) : items.length === 0 ? (
          <p>No hay recursos para mostrar.</p>
        ) : (
          <table
            border="1"
            cellPadding="8"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Campo 1</th>
                <th>Campo 2</th>
                <th>Campo 3</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.campo1}</td>
                  <td>{item.campo2}</td>
                  <td>{item.campo3}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      style={{ marginRight: "5px" }}
                    >
                      Editar
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    
  );
}
