import express from "express";
import * as ctrl from "../controllers/instalacion.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

router.post("/instalaciones", auth, ctrl.crearInstalacion);
router.get("/instalaciones", auth, ctrl.listarInstalaciones);
router.patch(
  "/instalaciones/:id/estado",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.cambiarEstado
);

export default router;
