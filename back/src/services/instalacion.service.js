import { PrismaClient } from "@prisma/client";
import { crearHistorial } from "./historial.service.js";
import { crearNotificacion } from "./notificacion.service.js";
const prisma = new PrismaClient();

export async function crearInstalacion({
  aplicacion,
  descripcion = null,
  usuarioId,
  equipoId = null,
  salaId = null,
}) {
  const i = await prisma.instalacion.create({
    data: { aplicacion, descripcion, usuarioId, equipoId, salaId },
  });
  await crearHistorial({
    entidad: "Instalacion",
    referenciaId: i.id,
    estadoViejo: null,
    estadoNuevo: i.estado,
    usuarioResponsable: usuarioId,
  });
  // notificar si tiene asignado usuario (ejemplo)
  if (usuarioId)
    await crearNotificacion(usuarioId, `Instalación ${aplicacion} creada`);
  return i;
}

export async function listarInstalaciones() {
  return prisma.instalacion.findMany({ orderBy: { createdAt: "asc" } });
}

export async function cambiarEstadoInstalacion(id, nuevoEstado, usuarioId) {
  const antes = await prisma.instalacion.findUnique({ where: { id } });
  const updated = await prisma.instalacion.update({
    where: { id },
    data: { estado: nuevoEstado },
  });
  await crearHistorial({
    entidad: "Instalacion",
    referenciaId: id,
    estadoViejo: antes?.estado || null,
    estadoNuevo: nuevoEstado,
    usuarioResponsable: usuarioId,
  });
  if (antes?.usuarioId)
    await crearNotificacion(
      antes.usuarioId,
      `Instalación #${id} fue ${nuevoEstado}`
    );
  return updated;
}
