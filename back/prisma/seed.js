import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * Función principal de seeding.
 * Se ejecuta con:
 *    npm run seed
 */
async function main() {
  console.log("🌱 Iniciando seeding de Smartin...");

  // =========================================================
  // 1) LIMPIEZA DE TABLAS (ORDEN CORRECTO POR RELACIONES)
  // =========================================================
  console.log("🧹 Limpiando tablas...");

  await prisma.notificacion.deleteMany();
  await prisma.instalacion.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.sugerencia.deleteMany();
  await prisma.reserva.deleteMany();
  await prisma.equipo.deleteMany();
  await prisma.aula.deleteMany();
  await prisma.usuario.deleteMany();

  // =========================================================
  // 2) CREACIÓN DE USUARIOS
  // =========================================================
  console.log("👤 Creando usuarios...");

  // Encriptamos una contraseña base para todos
  const passwordEncriptada = await bcrypt.hash("123456", 10);

  await prisma.usuario.createMany({
    data: [
      {
        email: "admin@smartin.com",
        username: "admin",
        password: passwordEncriptada,
        nombre: "Admin",
        apellido: "Sistema",
        rol: "admin",
        preferenciaNotif: 0,
      },
      {
        email: "alumno@smartin.com",
        username: "alumno1",
        password: passwordEncriptada,
        nombre: "Juan",
        apellido: "Perez",
        rol: "alumno",
        preferenciaNotif: 0,
      },
      {
        email: "profesor@smartin.com",
        username: "profe1",
        password: passwordEncriptada,
        nombre: "María",
        apellido: "Gomez",
        rol: "profesor",
        preferenciaNotif: 0,
      },
    ],
  });

  // Obtenemos los usuarios creados con sus IDs reales
  const admin = await prisma.usuario.findUnique({
    where: { email: "admin@smartin.com" },
  });

  const alumno = await prisma.usuario.findUnique({
    where: { email: "alumno@smartin.com" },
  });

  const profesor = await prisma.usuario.findUnique({
    where: { email: "profesor@smartin.com" },
  });

  // =========================================================
  // 3) CREACIÓN DE EQUIPOS
  // =========================================================
  console.log("💻 Creando equipos...");

  await prisma.equipo.createMany({
    data: [
      { nombre: "Notebook 01", estado: "disponible" },
      { nombre: "Notebook 02", estado: "disponible" },
      { nombre: "Proyector Epson", estado: "mantenimiento" },
    ],
  });

  // =========================================================
  // 4) CREACIÓN DE SALAS
  // =========================================================
  console.log("🏫 Creando aulas...");

  await prisma.aula.createMany({
    data: [
      { nombre: "Aula Multimedia", estado: "disponible" },
      { nombre: "Aula 2B", estado: "ocupado" },
    ],
  });

  // Recuperamos registros para relaciones
  const notebook1 = await prisma.equipo.findFirst({
    where: { nombre: "Notebook 01" },
  });

  const aulaMultimedia = await prisma.aula.findFirst({
    where: { nombre: "Aula Multimedia" },
  });

  // =========================================================
  // 5) CREACIÓN DE RESERVAS
  // =========================================================
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
        aulaId: aulaMultimedia.id,
        // Fecha programada para mañana
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    ],
  });

  // =========================================================
  // 6) CREACIÓN DE SUGERENCIAS
  // =========================================================
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

  // =========================================================
  // 7) CREACIÓN DE TICKETS
  // =========================================================
  console.log("🛠 Creando tickets...");

  await prisma.ticket.createMany({
    data: [
      {
        descripcion: "La notebook 01 no enciende.",
        estado: "pendiente",
        numero: "1", // IMPORTANTE: en el schema es Int, no string
        usuarioId: alumno.id,
      },
      {
        descripcion: "Proyector con lámpara quemada.",
        estado: "pendiente",
        numero: "2",
        usuarioId: profesor.id,
      },
    ],
  });

  // =========================================================
  // 8) CREACIÓN DE INSTALACIONES
  // =========================================================
  console.log("🔧 Creando instalaciones...");

  await prisma.instalacion.createMany({
    data: [
      {
        aplicacion: "Instalación de Zoom",
        descripcion: "Instalar versión educativa",
        usuarioId: admin.id,
        equipoId: notebook1.id,
        estado: "pendiente",
      },
      {
        aplicacion: "Configuración de audio",
        descripcion: "Ajuste de micrófonos",
        usuarioId: profesor.id,
        aulaId: aulaMultimedia.id,
        estado: "pendiente",
      },
    ],
  });

  // =========================================================
  // 9) CREACIÓN DE NOTIFICACIONES
  // =========================================================
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

  console.log("✅ Seed finalizado con éxito.");
  console.log("==================================================");
}

main()
  .catch((e) => console.error("❌ Error en seed:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
