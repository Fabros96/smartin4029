import express from "express";
import * as ctrl from "../controllers/aula.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

router.post("/aulas", auth, requireRole(["admin", "especial"]), ctrl.crearAula);
router.get("/aulas", auth, ctrl.listarAulas);
router.patch(
  "/aulas/:id/estado",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.cambiarEstado
);

export default router;
