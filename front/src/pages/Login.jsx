import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

/*
  Página de login
  - Redirige al dashboard si ya hay sesión
  - Guarda los últimos identifiers usados como sugerencias
*/
export default function Login() {
  const { login, usuario } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [recientes, setRecientes] = useState([]);

  // ✅ Redirige al dashboard si ya hay sesión
  useEffect(() => {
    if (usuario) navigate("/dashboard");
  }, [usuario, navigate]);

  // ✅ Cargar últimos identifiers de localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recientes")) || [];
    setRecientes(saved);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(identifier, password);

      // Guardar el identifier en recientes (máx 5)
      const nuevos = [
        identifier,
        ...recientes.filter((u) => u !== identifier),
      ].slice(0, 5);
      setRecientes(nuevos);
      localStorage.setItem("recientes", JSON.stringify(nuevos));
    } catch (err) {
      console.log(err);
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          list="recientes-list"
          placeholder="Email o username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <datalist id="recientes-list">
          {recientes.map((r, i) => (
            <option key={i} value={r} />
          ))}
        </datalist>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
