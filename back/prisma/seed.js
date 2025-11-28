import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seeding...");

  // -----------------------------
  // 1) LIMPIEZA DE TABLAS
  // -----------------------------
  console.log("🧹 Limpiando tablas...");
  await prisma.notificacion.deleteMany();
  await prisma.instalacion.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.sugerencia.deleteMany();
  await prisma.reserva.deleteMany();
  await prisma.equipo.deleteMany();
  await prisma.sala.deleteMany();
  await prisma.usuario.deleteMany();

  // -----------------------------
  // 2) CREAR USUARIOS
  // -----------------------------
  console.log("👤 Creando usuarios...");
  const password = await bcrypt.hash("123456", 10);

  const users = await prisma.usuario.createMany({
    data: [
      {
        email: "admin@smartin.com",
        username: "admin",
        password,
        nombre: "Admin",
        apellido: "Sistema",
        rol: "admin",
      },
      {
        email: "alumno@smartin.com",
        username: "alumno1",
        password,
        nombre: "Juan",
        apellido: "Perez",
        rol: "alumno",
      },
      {
        email: "profesor@smartin.com",
        username: "profe1",
        password,
        nombre: "María",
        apellido: "Gomez",
        rol: "profesor",
      },
    ],
  });

  // Obtener IDs reales
  const admin = await prisma.usuario.findUnique({
    where: { email: "admin@smartin.com" },
  });
  const alumno = await prisma.usuario.findUnique({
    where: { email: "alumno@smartin.com" },
  });
  const profesor = await prisma.usuario.findUnique({
    where: { email: "profesor@smartin.com" },
  });

  // -----------------------------
  // 3) CREAR EQUIPOS
  // -----------------------------
  console.log("💻 Creando equipos...");
  const equipos = await prisma.equipo.createMany({
    data: [
      { nombre: "Notebook 01", estado: "disponible" },
      { nombre: "Notebook 02", estado: "disponible" },
      { nombre: "Proyector Epson", estado: "mantenimiento" },
    ],
  });

  // -----------------------------
  // 4) CREAR SALAS
  // -----------------------------
  console.log("🏫 Creando salas...");
  await prisma.sala.createMany({
    data: [
      { nombre: "Sala Multimedia", estado: "disponible" },
      { nombre: "Aula 2B", estado: "ocupado" },
    ],
  });

  const notebook1 = await prisma.equipo.findFirst({
    where: { nombre: "Notebook 01" },
  });
  const salaMultimedia = await prisma.sala.findFirst({
    where: { nombre: "Sala Multimedia" },
  });

  // -----------------------------
  // 5) CREAR RESERVAS
  // -----------------------------
  console.log("📅 Creando reservas...");
  await prisma.reserva.createMany({
    data: [
      {
        tipo: "inmediata",
        estado: "pendiente",
        usuarioId: alumno.id,
        equipoId: notebook1.id,
      },
      {
        tipo: "programada",
        estado: "aprobada",
        usuarioId: profesor.id,
        salaId: salaMultimedia.id,
        scheduledAt: new Date(Date.now() + 86400000), // mañana
      },
    ],
  });

  // -----------------------------
  // 6) CREAR SUGERENCIAS
  // -----------------------------
  console.log("💡 Creando sugerencias...");
  await prisma.sugerencia.createMany({
    data: [
      {
        titulo: "Agregar más notebooks",
        descripcion: "Faltan equipos en horas pico.",
        usuarioId: alumno.id,
        estado: "pendiente",
      },
      {
        titulo: "Mejorar WiFi",
        descripcion: "La conexión es débil en el pasillo central.",
        usuarioId: profesor.id,
        estado: "aceptado",
      },
    ],
  });

  // -----------------------------
  // 7) CREAR TICKETS
  // -----------------------------
  console.log("🛠 Creando tickets...");
  await prisma.ticket.createMany({
    data: [
      {
        descripcion: "La notebook 01 no enciende.",
        estado: "pendiente",
        numero: "TCK-001",
        usuarioId: alumno.id,
      },
      {
        descripcion: "Proyector con lámpara quemada.",
        estado: "pendiente",
        numero: "TCK-002",
        usuarioId: profesor.id,
      },
    ],
  });

  // -----------------------------
  // 8) INSTALACIONES
  // -----------------------------
  console.log("🔧 Creando instalaciones...");
  await prisma.instalacion.createMany({
    data: [
      {
        aplicacion: "Instalación de Zoom",
        descripcion: "Instalar versión educativa",
        usuarioId: admin.id,
        equipoId: notebook1.id,
      },
      {
        aplicacion: "Configuración de audio",
        usuarioId: profesor.id,
        salaId: salaMultimedia.id,
      },
    ],
  });

  // -----------------------------
  // 9) NOTIFICACIONES
  // -----------------------------
  console.log("🔔 Creando notificaciones...");
  await prisma.notificacion.createMany({
    data: [
      {
        mensaje: "Tu reserva fue aprobada.",
        usuarioId: profesor.id,
      },
      {
        mensaje: "Nuevo ticket asignado.",
        usuarioId: admin.id,
      },
      {
        mensaje: "Tu sugerencia fue aceptada.",
        usuarioId: alumno.id,
      },
    ],
  });

  console.log("🌱 Seed finalizado con éxito.");
  console.log("-----------------------------");
  console.log("-----------------------------");
}

main()
  .catch((e) => console.error("❌ Error en seed:", e))
  .finally(() => prisma.$disconnect());
