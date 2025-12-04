import { PrismaClient } from "@prisma/client";
import { crearHistorial } from "./historial.services.js";
import { crearNotificacion } from "./notificacion.services.js";
const prisma = new PrismaClient();

export async function crearTicket({ descripcion, imagen = null, usuarioId }) {
  // generar numero único simple
  const numero = `T-${Date.now()}`;
  const nuevo = await prisma.ticket.create({
    data: { descripcion, imagen, numero, usuarioId },
  });
  await crearHistorial({
    entidad: "Ticket",
    referenciaId: nuevo.id,
    estadoViejo: null,
    estadoNuevo: nuevo.estado,
    usuarioResponsable: usuarioId,
  });
  // notificar admins
  const admins = await prisma.usuario.findMany({ where: { rol: "admin" } });
  for (const a of admins)
    await crearNotificacion(a.id, `Nuevo ticket #${nuevo.numero}`);

  return nuevo;
}

export async function cambiarEstadoTicket(id, nuevoEstado, usuarioId) {
  const antes = await prisma.ticket.findUnique({ where: { id } });
  const updated = await prisma.ticket.update({
    where: { id },
    data: { estado: nuevoEstado },
  });
  await crearHistorial({
    entidad: "Ticket",
    referenciaId: id,
    estadoViejo: antes?.estado || null,
    estadoNuevo: nuevoEstado,
    usuarioResponsable: usuarioId,
  });
  // notificar usuario creador
  if (antes?.usuarioId)
    await crearNotificacion(
      antes.usuarioId,
      `Ticket ${antes.numero} fue ${nuevoEstado}`
    );
  return updated;
}
