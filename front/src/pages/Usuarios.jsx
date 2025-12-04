// src/pages/Usuarios.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
/*
  Página para listar usuarios desde el backend
  Permite ver detalles y, si es admin/especial, cambiar roles o dar de baja.
*/
export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const res = await api.get("/usuarios");
      setUsuarios(res.data.rows); // <-- aquí usamos 'rows' que viene del backend
    } catch (err) {
      console.log(err);
      setError("Error al cargar los usuarios");
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  // Cambiar rol de usuario
  const cambiarRol = async (id, rolNuevo) => {
    try {
      await api.patch(`/usuarios/${id}/rol`, { rol: rolNuevo });
      fetchUsuarios();
    } catch (err) {
      console.log(err);
      alert("Error al cambiar rol");
    }
  };

  // Dar de baja usuario
  const darBaja = async (id) => {
    try {
      await api.patch(`/usuarios/${id}/baja`);
      fetchUsuarios();
    } catch (err) {
      console.log(err);
      alert("Error al dar de baja");
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Usuarios</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              <th>Rol</th>
              <th>Fecha Baja</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td>{u.rol}</td>
                <td>{u.fechaBaja || "-"}</td>
                <td>
                  <button onClick={() => cambiarRol(u.id, "admin")}>
                    Admin
                  </button>
                  <button onClick={() => cambiarRol(u.id, "profesor")}>
                    Profesor
                  </button>
                  <button onClick={() => darBaja(u.id)}>Dar de baja</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
