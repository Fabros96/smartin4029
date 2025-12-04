import express from "express";
import * as controller from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

// login con identifier (email o username) y password
router.post("/login", controller.login);
router.post("/logout", auth, controller.logout);

// view-as endpoints
router.post("/view-as", auth, controller.viewAs);
router.post("/view-as/reset", auth, controller.viewAsReset);

// me
router.get("/me", auth, controller.me);

//Update user data
router.put("/me", auth, controller.cambiarMisDatos);


export default router;
