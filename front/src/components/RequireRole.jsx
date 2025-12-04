import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/*
  Permite que solo ciertos roles accedan a un componente.
*/

export default function RequireRole({ roles, children }) {
  const { usuario } = useAuth();

  if (!roles.includes(usuario.rol)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
