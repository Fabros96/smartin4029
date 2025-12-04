// src/components/PublicRoute.jsx
import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

/*
  Este componente envuelve páginas públicas (login, registro)
  Si el usuario ya tiene sesión, redirige al dashboard
*/
export default function PublicRoute({ children }) {
  const { usuario, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return usuario ? <Navigate to="/dashboard" replace /> : children;
}
