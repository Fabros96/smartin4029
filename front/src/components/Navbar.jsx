import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/*
  Navbar dinámico usando arrays de links
  - Cada link tiene su URL, nombre y roles permitidos
  - Se filtra según el rol del usuario
*/
export default function Navbar() {
  const { usuario, logout } = useAuth();

  // Array de links con sus roles permitidos
  const links = [
    { path: "/dashboard", label: "Dashboard", roles: ["Todos"] },
    { path: "/equipos", label: "Equipos", roles: ["admin"] },
    {
      path: "/reservas",
      label: "Reservas",
      roles: ["admin", "profesor", "alumno"],
    },
    { path: "/tickets", label: "Tickets", roles: ["admin"] },
    {
      path: "/instalaciones",
      label: "Instalaciones",
      roles: ["admin", "especial"],
    },
    { path: "/usuarios", label: "Usuarios", roles: ["admin"] },
    { path: "/aulas", label: "Aulas", roles: ["admin"] },
    { path: "/viewAs", label: "View As", roles: ["admin"] },
    { path: "/sugerencias", label: "Sugerencias", roles: ["admin"] },
    { path: "/misDatos", label: "Mis Datos", roles: ["Todos"] },
  ];

  // Filtramos los links que el usuario puede ver
  const linksFiltrados = links.filter(
    (l) =>
      l.roles.includes("Todos") || // Todos pueden ver
      l.roles.includes(usuario?.rol) // O su rol coincide
  );

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      {/* Renderizamos los links filtrados */}
      {linksFiltrados.map((l) => (
        <Link key={l.path} to={l.path} style={{ marginRight: "10px" }}>
          {l.label}
        </Link>
      ))}

      {/* Botón de logout */}
      <button onClick={logout} style={{ marginLeft: "20px" }}>
        Logout
      </button>
    </nav>
  );
}

/*
EXPLICACIÓN:

1. Creamos un array de links con sus roles permitidos
2. Filtramos los links según el rol del usuario
3. Mapear el array filtrado para renderizar los <Link> dinámicamente
4. Así evitamos repetir bloques de código para cada rol
5. Fácil de agregar o quitar páginas: solo cambiar el array
*/
