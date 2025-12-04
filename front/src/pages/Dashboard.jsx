// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/Navbar";

/*
  Dashboard principal después de iniciar sesión
  Muestra la información del usuario y enlaces según rol
*/
export default function Dashboard() {
  const { usuario } = useAuth();

  return (
    <div>
      <Navbar />
      <main className="p-4">
        <h1>Bienvenido, {usuario?.email}</h1>
        <p>Tu rol: {usuario?.rol}</p>

        {/* Aquí podemos agregar cards o enlaces a los recursos del backend */}
        <div style={{ marginTop: "20px" }}>
          {usuario?.rol === "admin" && <p>Sección de administración</p>}
          {usuario?.rol === "profesor" && <p>Sección de profesor</p>}
          {usuario?.rol === "alumno" && <p>Sección de alumno</p>}
        </div>
      </main>
    </div>
  );
}
