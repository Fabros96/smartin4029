import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

/*
  Página de registro
  - Redirige al dashboard si ya hay sesión
  - Guarda los últimos identifiers usados como sugerencias
*/
export default function Register() {
  const { register, usuario } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [recientes, setRecientes] = useState([]);

  // Redirige al dashboard si ya hay sesión
  useEffect(() => {
    if (usuario) navigate("/dashboard");
  }, [usuario, navigate]);

  // Cargar últimos identifiers de localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recientes")) || [];
    setRecientes(saved);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await register({ email, username, password });

      // Guardar username/email en recientes (máx 5)
      const nuevos = [
        username,
        ...recientes.filter((u) => u !== username),
      ].slice(0, 5);
      setRecientes(nuevos);
      localStorage.setItem("recientes", JSON.stringify(nuevos));

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          list="recientes-list"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
