// src/pages/Instalaciones.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
/*
  Página para listar instalaciones desde el backend
  Permite ver los detalles de cada instalación y, si es admin/especial,
  cambiar el estado o asignarlas a un equipo/sala.
*/
export default function Instalaciones() {
  const [instalaciones, setInstalaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Consulta las instalaciones al montar el componente
  useEffect(() => {
    fetchInstalaciones();
  }, []);

  const fetchInstalaciones = async () => {
    try {
      setLoading(true);
      const res = await api.get("/instalaciones");
      setInstalaciones(res.data.rows || res.data.instalaciones);
    } catch (err) {
      console.log(err);
      setError("Error al cargar las instalaciones");
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado de una instalación
  const cambiarEstado = async (id, estadoNuevo) => {
    try {
      await api.patch(`/instalaciones/${id}/estado`, { estado: estadoNuevo });
      fetchInstalaciones(); // refrescar lista
    } catch (err) {
      console.log(err);
      alert("Error al cambiar estado");
    }
  };

  if (loading) return <div>Cargando instalaciones...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Instalaciones</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aplicación</th>
              <th>Estado</th>
              <th>Equipo</th>
              <th>Sala</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(instalaciones) &&
              instalaciones.map((inst) => (
                <tr key={inst.id}>
                  <td>{inst.id}</td>
                  <td>{inst.aplicacion}</td>
                  <td>{inst.estado}</td>
                  <td>{inst.equipoId || "-"}</td>
                  <td>{inst.salaId || "-"}</td>
                  <td>
                    <button onClick={() => cambiarEstado(inst.id, "pendiente")}>
                      Pendiente
                    </button>
                    <button onClick={() => cambiarEstado(inst.id, "aprobada")}>
                      Aprobada
                    </button>
                    <button onClick={() => cambiarEstado(inst.id, "rechazada")}>
                      Rechazada
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
