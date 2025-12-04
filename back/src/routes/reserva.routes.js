import express from "express";
import * as ctrl from "../controllers/reserva.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

router.post("/reservas", auth, ctrl.crearReserva);
router.get("/reservas", auth, requireRole(["admin", "especial"]), ctrl.listar);
router.patch(
  "/reservas/:id/estado",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.cambiarEstado
);

export default router;
