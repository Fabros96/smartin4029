import express from "express";
const router = express.Router();

import auth from "../middlewares/auth.middleware.js";
import { roleCheck } from "../middlewares/role.middleware.js";
import * as controller from "../controllers/adminUser.controller.js";

// Solo admins y especiales
router.use(auth);
router.use(roleCheck(["admin", "especial"]));

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteUser); // renombrado
router.put("/:id/reset-password", controller.resetPassword);

export default router;
