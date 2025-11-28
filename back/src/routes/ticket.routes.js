import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/ticket.controller.js";

const router = express.Router();

router.get("/", auth, controller.getMyTickets);
router.get("/:id", auth, controller.getById);
router.post("/", auth, controller.create);
router.put("/:id", auth, controller.updateStatus);

export default router;
