// src/pages/MisDatos.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { formatDate } from "../utils/formatDate";

export default function MisDatos() {
  const [misDatos, setMisDatos] = useState(null); // ahora es un objeto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMisDatos();
  }, []);

  const fetchMisDatos = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // asumimos JWT
      const res = await api.get("/misDatos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMisDatos(res.data.Ok);
    } catch (err) {
      console.error("Error API:", err.response || err);
      alert("Error al cargar mis datos");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando mis datos...</div>;
  if (!misDatos) return <div>No se encontraron datos</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>MisDatos</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Imagen</th>
              <th>Username</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Alta</th>
              <th>Ultima actualización</th>
              <th>Preferencias de Notificaciones</th>
            </tr>
          </thead>
          <tbody>
            <tr key={misDatos.id}>
              <td>{misDatos.id}</td>
              <td>{misDatos.email}</td>
              <td>{misDatos.imagen}</td>
              <td>{misDatos.username}</td>
              <td>{misDatos.nombre}</td>
              <td>{misDatos.apellido}</td>
              <td>{formatDate(misDatos.createdAt)}</td>
              <td>{formatDate(misDatos.updatedAt)}</td>
              <td>{misDatos.preferenciaNotif=== 0 ? "App" : "Email"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
