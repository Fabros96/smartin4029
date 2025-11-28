import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/instalacion.controller.js";

const router = express.Router();

router.get("/", auth, controller.getMyInstallaciones);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.updateStatus);
router.delete("/:id", auth, controller.cancel);

export default router;
