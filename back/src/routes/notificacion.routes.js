import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/notificacion.controller.js";

const router = express.Router();

router.get("/", auth, controller.getMyNotificaciones);
router.put("/:id/read", auth, controller.markRead);
router.put("/settings", auth, controller.updateSettings);

export default router;
