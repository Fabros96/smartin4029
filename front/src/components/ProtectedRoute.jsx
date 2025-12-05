import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, rolesPermitidos }) {
  const { usuario, loading } = useAuth();

  if (loading) return <div>Cargando sesión...</div>;

  // ❌ No está logueado
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Permitir a todos los usuarios logueados
  if (!rolesPermitidos || rolesPermitidos === "Todos") {
    return children;
  }

  // ✅ Control por lista de roles
  if (
    Array.isArray(rolesPermitidos) &&
    !rolesPermitidos.includes(usuario.rol)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Autorizado
  return children;
}
