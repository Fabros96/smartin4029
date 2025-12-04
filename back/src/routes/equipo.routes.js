import express from "express";
import * as ctrl from "../controllers/equipo.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

router.post(
  "/equipos",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.crearEquipo
);

router.get("/equipos", auth, ctrl.listarEquipos);
router.get("/equipos/estado/:estado", auth, ctrl.obtenerPorEstado);
router.patch(
  "/equipos/:id/estado",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.cambiarEstado
);


export default router;
