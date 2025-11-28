import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import equipoRoutes from "./src/routes/equipo.routes.js";
import aulaRoutes from "./src/routes/aula.routes.js";
import installacionRoutes from "./src/routes/instalacion.routes.js";
import ticketRoutes from "./src/routes/ticket.routes.js";
import sugerenciaoutes from "./src/routes/sugerencia.routes.js";
import notificacionRoutes from "./src/routes/notificacion.routes.js";
import adminUserRoutes from "./src/routes/adminUser.routes.js";
import adminPeriodRoutes from "./src/routes/adminPeriod.routes.js";
import requestRoutes from "./src/routes/reserva.routes.js";

import adminRoleRoutes from "./src/routes/adminRole.routes.js";
import estadisticasRoutes from "./src/routes/estadistica.routes.js";

import viewAsRoutes from "./src/routes/viewAs.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/equipo", equipoRoutes);
app.use("/api/aula", aulaRoutes);
app.use("/api/instalacion", installacionRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/sugerencia", sugerenciaoutes);
app.use("/api/notificacion", notificacionRoutes);
app.use("/api/stats", estadisticasRoutes);


app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/periods", adminPeriodRoutes);

app.use("/api/requests", requestRoutes);

app.use("/api/admin/roles", adminRoleRoutes);

app.use("/api/view-as", viewAsRoutes);


app.get("/api/health", (req, res) => res.json({ ok: true }));

export default app;
