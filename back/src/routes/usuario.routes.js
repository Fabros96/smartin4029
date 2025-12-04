// src/routes/usuarios.routes.js
import express from "express";
import { UsuariosController } from "../controllers/usuario.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

// Todas las rutas requieren auth
router.use(auth);

// Listar usuarios → admin y especial
router.get(
  "/usuarios",
  requireRole(["admin", "especial"]),
  UsuariosController.listarUsuarios
);

// Obtener usuario por ID → admin y especial
router.get(
  "/usuarios/:id",
  requireRole(["admin", "especial"]),
  UsuariosController.obtenerUsuario
);

// Crear usuario → solo admin
router.post(
  "/usuarios/",
  requireRole(["admin"]),
  UsuariosController.crearUsuario
);

// Actualizar usuario → admin
router.patch(
  "/usuarios/:id",
  requireRole(["admin"]),
  UsuariosController.actualizarUsuario
);

// Baja lógica → admin
router.delete(
  "/usuarios/:id",
  requireRole(["admin"]),
  UsuariosController.eliminarUsuario
);

export default router;
