// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

/*
  Protege rutas por:
  ✅ Usuario logueado
  ✅ Rol autorizado
*/
export default function ProtectedRoute({ children, rolesPermitidos }) {
  const { usuario, loading } = useAuth();

  if (loading) return <div>Cargando sesión...</div>;

  // ❌ No está logueado
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Si NO se especifican roles → entra cualquier usuario logueado
  if (!rolesPermitidos) {
    return children;
  }
  
  // ❌ Está logueado pero no tiene permiso
  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Usuario autorizado
  return children;
}
