import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/aula.controller.js";

// Rutas protegidas con middleware de auth
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.remove); // ← aquí usamos 'remove', no 'delete'

export default router;
