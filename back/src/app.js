// src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import equipoRoutes from "./routes/equipo.routes.js";
import aulaRoutes from "./routes/aula.routes.js";
import reservaRoutes from "./routes/reserva.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import sugerenciaRoutes from "./routes/sugerencia.routes.js";
import instalacionRoutes from "./routes/instalacion.routes.js";
import notificacionRoutes from "./routes/notificacion.routes.js";
import historialRoutes from "./routes/historial.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();

// ---- CORS: permitir Vite (frontend) y credenciales ----
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// health
app.get("/health", (req, res) => res.json({ ok: true, now: new Date() }));

// debug endpoint: devuelve cookies recibidas
app.get("/debug/cookies", (req, res) => {
  res.json({ cookies: req.cookies });
});

// RUTAS (igual que antes)
app.use("/api/auth", authRoutes);
app.use("/api", equipoRoutes);
app.use("/api", aulaRoutes);
app.use("/api", reservaRoutes);
app.use("/api", ticketRoutes);
app.use("/api", sugerenciaRoutes);
app.use("/api", instalacionRoutes);
app.use("/api", notificacionRoutes);
app.use("/api", historialRoutes);
app.use("/api", usuarioRoutes);

// root
app.get("/", (req, res) =>
  res.json({ ok: "Servidor corriendo correctamente" })
);

export default app;
