import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Verifica sesión activa al montar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/me");
        // Guardamos el usuario real
        setUsuario(res.data.usuario);
      } catch (err) {
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login
  const login = async (identifier, password) => {
    const res = await api.post("/auth/login", { identifier, password });
    setUsuario(res.data.user); // ajustado al backend
  };

  // Logout
  const logout = async () => {
    await api.post("/auth/logout");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
