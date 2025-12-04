import express from "express";
import * as ctrl from "../controllers/ticket.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

router.post("/tickets", auth, ctrl.crearTicket);
router.patch(
  "/tickets/:id/estado",
  auth,
  requireRole(["admin", "especial"]),
  ctrl.cambiarEstado
);

export default router;
