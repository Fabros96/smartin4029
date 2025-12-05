// src/pages/Aulas.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
/*
  Página para listar aulas desde el backend
  Permite filtrar por estado y cambiar estado (admin/especial)
*/
export default function Aulas() {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAulas();
  }, []);

  const fetchAulas = async () => {
    try {
      setLoading(true);
      const res = await api.get("/aulas");
      setAulas(res.data.rows);
    } catch (err) {
      console.log(err);
      alert("Error al cargar aulas");
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (id, estadoNuevo) => {
    try {
      await api.patch(`/aulas/${id}/estado`, { estado: estadoNuevo });
      fetchAulas();
    } catch (err) {
      console.log(err);
      alert("Error al cambiar estado de aula");
    }
  };

  if (loading) return <div>Cargando aulas...</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Aulas</h2>
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
            {Array.isArray(aulas) &&
              aulas.map((aula) => (
                <tr key={aula.id}>
                  <td>{aula.id}</td>
                  <td>{aula.nombre}</td>
                  <td>{aula.estado}</td>
                  <td>
                    <button
                      onClick={() => cambiarEstado(aula.id, "disponible")}
                    >
                      Disponible
                    </button>
                    <button onClick={() => cambiarEstado(aula.id, "ocupado")}>
                      Ocupado
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
