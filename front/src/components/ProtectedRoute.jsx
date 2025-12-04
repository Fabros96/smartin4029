// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

/*
  Este componente envuelve páginas privadas
  Si no hay usuario logueado, redirige al login
*/
export default function ProtectedRoute({ children }) {
  const { usuario, loading } = useAuth();

  if (loading) return <div>Cargando sesión...</div>;

  return usuario ? children : <Navigate to="/login" replace />;
}
