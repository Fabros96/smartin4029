import express from "express";
import * as ctrl from "../controllers/historial.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

router.get(
  "/historial/:entidad/:entidadId",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.getHistorial
);

export default router;
