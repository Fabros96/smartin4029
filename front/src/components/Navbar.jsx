import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ProtectedRoute from "./ProtectedRoute";


/*
  Navbar dinámico según el rol del usuario
  - Links visibles según rol
  - Logout
*/
export default function Navbar() {
  const { usuario, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/dashboard" style={{ marginRight: "10px" }}>
        Dashboard
      </Link>

      {/* Admin puede ver Equipos y Usuarios */}
      {usuario?.rol === "admin" && (
        <>
          <Link to="/equipos" style={{ marginRight: "10px" }}>
            Equipos
          </Link>
          <Link to="/reservas" style={{ marginRight: "10px" }}>
            Reservas
          </Link>
          <Link to="/tickets" style={{ marginRight: "10px" }}>
            Tickets
          </Link>
          <Link to="/instalaciones" style={{ marginRight: "10px" }}>
            Instalaciones
          </Link>
          <Link to="/usuarios" style={{ marginRight: "10px" }}>
            Usuarios
          </Link>
          <Link to="/aulas" style={{ marginRight: "10px" }}>
            Aulas
          </Link>
          <Link to="/viewAs" style={{ marginRight: "10px" }}>
            View As
          </Link>
          <Link to="/sugerencias" style={{ marginRight: "10px" }}>
            Sugerencias
          </Link>
          <Link to="/misDatos" style={{ marginRight: "10px" }}>
            Mis Datos
          </Link>
        </>
      )}

      {/* Profesor y alumno pueden ver Reservas */}
      {(usuario?.rol === "profesor" || usuario?.rol === "alumno") && (
        <Link to="/reservas" style={{ marginRight: "10px" }}>
          Reservas
        </Link>
      )}

      {/* Especial puede ver Instaciones */}
      {usuario?.rol === "especial" && (
        <Link to="/instalaciones" style={{ marginRight: "10px" }}>
          Instalaciones
        </Link>
      )}

      {/* Botón de logout */}
      <button onClick={logout} style={{ marginLeft: "20px" }}>
        Logout
      </button>
    </nav>
  );
}
