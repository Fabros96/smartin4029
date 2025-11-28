import express from "express";
import auth from "../middlewares/auth.middleware.js";
import * as controller from "../controllers/viewAs.controller.js";

const router = express.Router();

router.use(auth);

router.post("/view-as", controller.viewAs);
router.post("/reset-view-as", controller.resetViewAs);

export default router;
