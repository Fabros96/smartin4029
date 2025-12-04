// src/pages/Notificaciones.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
/*
  Página para mostrar notificaciones del usuario logueado
  Permite marcar como leídas
*/
export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotificaciones();
  }, []);

  const fetchNotificaciones = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notificaciones");
      setNotificaciones(res.data);
    } catch (err) {
      console.log(err);
      alert("Error al cargar notificaciones");
    } finally {
      setLoading(false);
    }
  };

  const marcarLeida = async (id) => {
    try {
      await api.patch(`/notificaciones/${id}/leida`);
      fetchNotificaciones();
    } catch (err) {
      console.log(err);
      alert("Error al marcar notificación");
    }
  };

  if (loading) return <div>Cargando notificaciones...</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Notificaciones</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mensaje</th>
              <th>Leída</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notificaciones.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.mensaje}</td>
                <td>{n.leida ? "Sí" : "No"}</td>
                <td>
                  {!n.leida && (
                    <button onClick={() => marcarLeida(n.id)}>
                      Marcar como leída
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
