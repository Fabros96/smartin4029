import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/reserva.controller.js";

// Todas las rutas requieren autenticación
router.use(auth);

// Rutas de reservas
router.post("/inmediata", controller.crearReservaInmediata);
router.post("/programada", controller.crearReservaProgramada);
router.get("/", controller.getMyReservas);
router.get("/:id", controller.getById);
router.delete("/:id", controller.cancelarReserva);
router.post("/:id/repetir", controller.repetirReserva);
router.put("/:id/status", controller.updateStatus);

export default router;
