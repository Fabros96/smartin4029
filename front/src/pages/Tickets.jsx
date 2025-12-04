// src/pages/Tickets.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
/*
  Página para listar tickets y cambiar su estado (admin/especial)
*/
export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tickets");
      setTickets(res.data);
    } catch (err) {
      console.log(err);
      alert("Error al cargar tickets");
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado de ticket
  const cambiarEstado = async (id, estadoNuevo) => {
    try {
      await api.patch(`/tickets/${id}/estado`, { estado: estadoNuevo });
      fetchTickets();
    } catch (err) {
      console.log(err);
      alert("Error al cambiar estado");
    }
  };

  if (loading) return <div>Cargando tickets...</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Tickets</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.descripcion}</td>
                <td>{t.estado}</td>
                <td>{t.usuarioId}</td>
                <td>
                  <button onClick={() => cambiarEstado(t.id, "pendiente")}>
                    Pendiente
                  </button>
                  <button onClick={() => cambiarEstado(t.id, "aceptado")}>
                    Aceptado
                  </button>
                  <button onClick={() => cambiarEstado(t.id, "rechazado")}>
                    Rechazado
                  </button>
                  <button onClick={() => cambiarEstado(t.id, "cancelado")}>
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
