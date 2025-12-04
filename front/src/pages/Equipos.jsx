// src/pages/Equipos.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEquipos();
  }, []);

  const fetchEquipos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/equipos");
      setEquipos(res.data.rows); // ⚠️ usar .rows según el backend
    } catch (err) {
      console.log(err);
      setError("Error al cargar los equipos");
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, estadoNuevo) => {
    try {
      await api.patch(`/equipos/${id}/estado`, { estado: estadoNuevo });
      fetchEquipos(); // refrescar lista
    } catch (err) {
      console.error(err.response?.data?.msg || "Error al cambiar estado");
      alert(err.response?.data?.msg || "Error al cambiar estado");
    }
  };

  if (loading) return <div>Cargando equipos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Equipos</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {equipos.map((eq) => (
              <tr key={eq.id}>
                <td>{eq.id}</td>
                <td>{eq.nombre}</td>
                <td>{eq.estado}</td>
                <td>
                  <button onClick={() => cambiarEstado(eq.id, "disponible")}>
                    Disponible
                  </button>
                  <button onClick={() => cambiarEstado(eq.id, "ocupado")}>
                    Ocupado
                  </button>
                  <button onClick={() => cambiarEstado(eq.id, "mantenimiento")}>
                    Mantenimiento
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
