import { PrismaClient } from "@prisma/client";
import { crearHistorial } from "./historial.service.js";
import { crearNotificacion } from "./notificacion.service.js";
const prisma = new PrismaClient();

export async function crearTicket({ descripcion, imagen = null, usuarioId }) {
  const numero = `T-${Date.now()}`;

  const nuevo = await prisma.ticket.create({
    data: {
      descripcion,
      imagen,
      numero,
      usuario: {
        connect: { id: usuarioId },
      },
    },
  });
  await crearHistorial({
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
    estadoViejo: antes?.estado || null,
    estadoNuevo: nuevoEstado,
    usuarioResponsable: usuarioId,
    ticket: { connect: { id: nuevo.id } },
  });
  // notificar usuario creador
  if (antes?.usuarioId)
    await crearNotificacion(
      antes.usuarioId,
      `Ticket ${antes.numero} fue ${nuevoEstado}`
    );
  return updated;
}
