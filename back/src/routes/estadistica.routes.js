import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.middleware.js";
import { roleCheck } from "../middlewares/role.middleware.js";
import * as controller from "../controllers/estadistica.controller.js";

// Todas las rutas requieren auth y roles admin/especial
router.use(auth);
router.use(roleCheck(["admin", "especial"]));

router.get("/usage", controller.usageStats);
router.get("/loans", controller.loansStats);
router.get("/tickets", controller.ticketsStats);
router.get("/reservations", controller.reservationsStats);
router.get("/users", controller.usersStats);

export default router;
