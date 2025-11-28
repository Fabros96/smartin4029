import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/sugerencia.controller.js";

const router = express.Router();

router.get("/", auth, controller.getMySugerencias);
router.get("/:id", auth, controller.getById);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.updateStatus);

export default router;
