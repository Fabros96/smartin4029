// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Páginas
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Equipos from "./pages/Equipos";
import Usuarios from "./pages/Usuarios";
import Reservas from "./pages/Reservas";
import Instalaciones from "./pages/Instalaciones";
import Aulas from "./pages/Aulas";
import ViewAs from "./pages/ViewAs.jsx";
import Sugerencias from "./pages/Sugerencias";
import MisDatos from "./pages/MisDatos.jsx";

// Componentes de rutas
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

/*
  App.jsx usando arrays de rutas y map para agrupar:
  - Rutas públicas y privadas
  - Evita repetir ProtectedRoute con el mismo rol
  - Comentado para alumnos de secundaria
*/

export default function App() {
  // --------------------------
  // ARRAYS DE RUTAS
  // --------------------------

  // Rutas públicas: login y register
  const rutasPublicas = [
    { path: "/login", componente: <Login /> },
    { path: "/register", componente: <Register /> },
  ];

  // Rutas privadas accesibles por todos los roles (incluye dashboard, equipos, misDatos)
  const rutasPrivadasTodos = [
    { path: "/dashboard", componente: <Dashboard /> },
    { path: "/equipos", componente: <Equipos /> },
    { path: "/misDatos", componente: <MisDatos /> },
  ];

  // Rutas privadas solo para admin
  const rutasPrivadasAdmin = [
    { path: "/usuarios", componente: <Usuarios /> },
    { path: "/instalaciones", componente: <Instalaciones /> },
    { path: "/aulas", componente: <Aulas /> },
    { path: "/viewAs", componente: <ViewAs /> },
    { path: "/sugerencias", componente: <Sugerencias /> },
  ];

  // Rutas privadas para admin o especial
  const rutasPrivadasAdminEspecial = [
    { path: "/reservas", componente: <Reservas /> },
  ];

  // --------------------------
  // JSX DEL ROUTER
  // --------------------------
  return (
    <BrowserRouter>
      <Routes>
        {/* --------------------------
            RUTAS PÚBLICAS
            -------------------------- */}
        {rutasPublicas.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={
              <PublicRoute>
                {r.componente} {/* Página que se muestra */}
              </PublicRoute>
            }
          />
        ))}

        {/* --------------------------
            RUTAS PRIVADAS PARA TODOS
            -------------------------- */}
        <Route element={<ProtectedRoute rolesPermitidos={"Todos"} />}>
          {rutasPrivadasTodos.map((r) => (
            <Route key={r.path} path={r.path} element={r.componente} />
          ))}
        </Route>

        {/* --------------------------
            RUTAS PRIVADAS SOLO ADMIN
            -------------------------- */}
        <Route element={<ProtectedRoute rolesPermitidos={["admin"]} />}>
          {rutasPrivadasAdmin.map((r) => (
            <Route key={r.path} path={r.path} element={r.componente} />
          ))}
        </Route>

        {/* --------------------------
            RUTAS PRIVADAS ADMIN O ESPECIAL
            -------------------------- */}
        <Route
          element={<ProtectedRoute rolesPermitidos={["admin", "especial"]} />}
        >
          {rutasPrivadasAdminEspecial.map((r) => (
            <Route key={r.path} path={r.path} element={r.componente} />
          ))}
        </Route>

        {/* --------------------------
            RUTA COMODÍN
            - Si el usuario entra a una URL no definida
            - Redirige al dashboard
            -------------------------- */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

/*
EXPLICACIÓN PARA ALUMNOS DE SECUNDARIA:

1. VISTA: App.jsx maneja las rutas y decide qué página mostrar según la URL.
2. PublicRoute y ProtectedRoute: controlan si el usuario puede acceder según su sesión y rol.
3. Cuando un usuario entra a una ruta:
   - El router revisa si es pública o privada.
   - Si es privada, ProtectedRoute verifica el rol.
   - Si tiene permiso, se muestra la página.
   - Si no, se redirige a login o dashboard.
4. CONTROLADOR y MODELO están en el backend:
   - Cada página hace llamadas a la API (ej: obtener elementos, reservas, usuarios)
   - Backend valida la información y devuelve la respuesta.
5. VISTA actualiza el estado y muestra los datos al usuario.
*/
