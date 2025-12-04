// src/pages/Reservas.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
/*
  Página para listar y crear reservas
  Permite a alumnos/profesores crear reservas según reglas del backend
*/
export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState("inmediata");
  const [equipoId, setEquipoId] = useState("");

  useEffect(() => {
    fetchReservas();
    fetchEquipos();
  }, []);

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reservas");
      setReservas(res.data.rows);
    } catch (err) {
      console.log(err);
      alert("Error al cargar reservas");
      setReservas([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEquipos = async () => {
    try {
      const res = await api.get("/equipos/estado/disponible");
      setEquipos(res.data);
      if (res.data.length > 0) setEquipoId(res.data[0].id);
    } catch (err) {
      console.log(err);
      alert("Error al cargar equipos");
    }
  };

  const crearReserva = async (e) => {
    e.preventDefault();
    try {
      await api.post("/reservas", { tipo, equipoId });
      fetchReservas();
    } catch (err) {
      console.log(err);
      alert("Error al crear reserva");
    }
  };

  if (loading) return <div>Cargando reservas...</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Reservas</h2>

        <form onSubmit={crearReserva}>
          <label>Tipo:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="inmediata">Inmediata</option>
            <option value="programada">Programada</option>
          </select>

          <label>Equipo:</label>
          <select
            value={equipoId}
            onChange={(e) => setEquipoId(e.target.value)}
          >
            {Array.isArray(equipos) &&
              equipos.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.nombre}
                </option>
              ))}
          </select>

          <button type="submit">Crear reserva</button>
        </form>

        <table border="1" cellPadding="5" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(reservas) &&
              reservas.map((res) => (
                <tr key={res.id}>
                  <td>{res.id}</td>
                  <td>{res.tipo}</td>
                  <td>{res.estado}</td>
                  <td>{res.usuarioId}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
