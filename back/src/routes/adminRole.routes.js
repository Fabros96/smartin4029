import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.middleware.js";
import { roleCheck } from "../middlewares/role.middleware.js";
router.use(auth);
router.use(roleCheck(["admin", "especial"]));

router.get("/", (req, res) => {
  res.json(["alumno", "profesor", "preceptor", "especial", "admin"]);
});

export default router;
