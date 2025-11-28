import express from "express";
const router = express.Router();


import auth from "../middlewares/auth.middleware.js";

router.get("/me", auth, (req, res) => {
  res.json({
    msg: "Datos del usuario autenticado",
    user: req.user,
  });
});

export default router;



