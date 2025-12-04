import { PrismaClient } from "@prisma/client";
import { crearHistorial } from "./historial.services.js";
import { crearNotificacion } from "./notificacion.services.js";
const prisma = new PrismaClient();

/**
 * Reglas de negocio:
 * - alumno: solo inmediata
 * - profesor/preceptor: solo programada
 * - especial, admin: todas
 */
function puedeCrearReserva(rol, tipo) {
  if (rol === "alumno") return tipo === "inmediata";
  if (rol === "profesor" || rol === "preceptor") return tipo === "programada";
  return true;
}

export async function crearReserva({
  tipo,
  usuarioId,
  equipoId = null,
  salaId = null,
  scheduledAt = null,
}) {
  // obtener usuario para validar
  const u = await prisma.usuario.findUnique({ where: { id: usuarioId } });
  if (!u) throw new Error("Usuario no existe");

  if (!puedeCrearReserva(u.rol, tipo))
    throw new Error("No permitido según rol y tipo");

  const nueva = await prisma.reserva.create({
    data: { tipo, usuarioId, equipoId, salaId, scheduledAt },
  });

  await crearHistorial({
    entidad: "Reserva",
    referenciaId: nueva.id,
    estadoViejo: null,
    estadoNuevo: nueva.estado,
    usuarioResponsable: usuarioId,
  });

  // Notificar a admins/encargados (ejemplo)
  const admins = await prisma.usuario.findMany({ where: { rol: "admin" } });
  for (const a of admins) {
    await crearNotificacion(a.id, `Nueva reserva #${nueva.id} creada`);
  }

  return nueva;
}

export async function cambiarEstadoReserva(id, nuevoEstado, usuarioId) {
  const antes = await prisma.reserva.findUnique({ where: { id } });
  const updated = await prisma.reserva.update({
    where: { id },
    data: { estado: nuevoEstado },
  });

  await crearHistorial({
    entidad: "Reserva",
    referenciaId: id,
    estadoViejo: antes?.estado || null,
    estadoNuevo: nuevoEstado,
    usuarioResponsable: usuarioId,
  });

  // Notificaciones según cambio
  if (["aprobada", "rechazada"].includes(nuevoEstado)) {
    // notificar al usuario que creó la reserva
    if (antes?.usuarioId)
      await crearNotificacion(
        antes.usuarioId,
        `Reserva #${id} fue ${nuevoEstado}`
      );
  }

  return updated;
}

export async function listarReservas() {
  return prisma.reserva.findMany({ orderBy: { createdAt: "desc" } });
}
