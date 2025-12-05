// src/pages/Sugerencias.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { formatDate } from "../utils/formatDate";

/*
  Página para listar sugerencias y cambiar su estado (admin/especial)
*/
export default function Sugerencias() {
  const [sugerencias, setSugerencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSugerencias();
  }, []);

  const fetchSugerencias = async () => {
    try {
      setLoading(true);
      const res = await api.get("/sugerencias");
      setSugerencias(res.data.sugerencias);
    } catch (err) {
      console.log(err);
      alert("Error al cargar sugerencias");
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, estadoNuevo) => {
    try {
      await api.patch(`/sugerencias/${id}/estado`, { estado: estadoNuevo });
      fetchSugerencias();
    } catch (err) {
      console.log(err);
      alert("Error al cambiar estado");
    }
  };

  if (loading) return <div>Cargando sugerencias...</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Sugerencias</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Creado</th>
              <th>Ultima Actualizacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sugerencias.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.titulo}</td>
                <td>{s.descripcion}</td>
                <td>{s.estado}</td>
                <td>{s.usuarioId}</td>
                <td>{formatDate(s.createdAt)}</td>
                <td>{formatDate(s.updateAt)}</td>
                
                <td>
                  <button onClick={() => cambiarEstado(s.id, "pendiente")}>
                    Pendiente
                  </button>
                  <button onClick={() => cambiarEstado(s.id, "aceptado")}>
                    Aceptado
                  </button>
                  <button onClick={() => cambiarEstado(s.id, "rechazado")}>
                    Rechazado
                  </button>
                  <button onClick={() => cambiarEstado(s.id, "cancelado")}>
                    Cancelado
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
