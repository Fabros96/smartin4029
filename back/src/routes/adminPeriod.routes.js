import express from "express";
const router = express.Router();
import auth  from "../middlewares/auth.middleware.js";
import { roleCheck } from "../middlewares/role.middleware.js";
import * as controller  from "../controllers/adminPeriod.controller.js";

router.use(auth);
router.use(roleCheck(["admin", "especial"]));

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", auth, controller.deletePeriod);

export default router;
