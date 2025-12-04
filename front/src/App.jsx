// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Equipos from "./pages/Equipos";
import Usuarios from "./pages/Usuarios";
import Reservas from "./pages/Reservas";
import Instalaciones from "./pages/Instalaciones";
import Aulas from "./pages/Aulas";
import ViewAs from "./pages/ViewAs.jsx";
import Sugerencias from "./pages/Sugerencias";


import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login: público, redirige al dashboard si ya hay sesión */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Dashboard: privado, requiere sesión */}
        <Route
          path="/dashboard"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/equipos"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Equipos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservas"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Reservas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instalaciones"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Instalaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aulas"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Aulas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewAs"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <ViewAs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sugerencias"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Sugerencias />
            </ProtectedRoute>
          }
        />

        {/* Cualquier otra ruta redirige según sesión */}
        <Route
          path="*"
          element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
