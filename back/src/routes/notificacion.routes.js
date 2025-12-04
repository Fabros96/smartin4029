import express from "express";
import * as ctrl from "../controllers/notificacion.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/notificaciones", auth, ctrl.listarNotificaciones);
router.post("/notificaciones/:id/leida", auth, ctrl.marcarLeida);

export default router;
