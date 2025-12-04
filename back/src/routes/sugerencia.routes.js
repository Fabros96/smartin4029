import express from "express";
import * as ctrl from "../controllers/sugerencia.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

router.get("/sugerencias", auth, ctrl.listarSugerencias);
router.post("/sugerencias", auth, ctrl.crearSugerencia);
router.patch(
  "/sugerencias/:id/estado",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.cambiarEstado
);

export default router;
