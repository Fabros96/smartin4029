import express from "express";
import * as ctrl from "../controllers/misDatos.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/requireRole.middleware.js";

const router = express.Router();

router.get("/misDatos", auth, ctrl.misDatos);
router.patch(
  "/misDatos/:id/",
  auth,
  requireRole("Todos"),
  ctrl.actualizarMisDatos
);

export default router;
