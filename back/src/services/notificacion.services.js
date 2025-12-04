import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function crearNotificacion(usuarioId, mensaje) {
  return prisma.notificacion.create({
    data: {
      mensaje,
      usuarioId,
    },
  });
}

export async function listarNotificaciones(usuarioId) {
  return prisma.notificacion.findMany({
    where: { usuarioId },
    orderBy: { createdAt: "desc" },
  });
}

export async function marcarLeida(id) {
  return prisma.notificacion.update({
    where: { id },
    data: { leida: true },
  });
}
