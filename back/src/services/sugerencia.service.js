import { PrismaClient } from "@prisma/client";
import { crearHistorial } from "./historial.service.js";
import { crearNotificacion } from "./notificacion.service.js";
const prisma = new PrismaClient();

export async function listarSugerencias() {
  return await prisma.sugerencia.findMany();
}

export async function crearSugerencia({ titulo, descripcion, usuarioId }) {
  if (!descripcion) throw new Error("La descripción es obligatoria");

  const tituloFinal = titulo || "Sin Titulo";

  const s = await prisma.sugerencia.create({
    data: { titulo: tituloFinal, descripcion, usuarioId },
  });

  // crear historial con estado inicial "pendiente"
  await prisma.historial.create({
    data: {
      estadoViejo: null,
      estadoNuevo: "creada",
      usuario: { connect: { id: usuarioId } },
      sugerencia: { connect: { id: s.id } },
    },
  });

  const admins = await prisma.usuario.findMany({ where: { rol: "admin" } });
  for (const a of admins) {
    await crearNotificacion(a.id, `Nueva sugerencia #${s.id}`);
  }

  return s;
}

export async function cambiarEstadoSugerencia(id, nuevoEstado, usuarioId) {
  const antes = await prisma.sugerencia.findUnique({ where: { id } });
  const updated = await prisma.sugerencia.update({
    where: { id },
    data: { estado: nuevoEstado },
  });
  await crearHistorial({
    entidad: "Sugerencia",
    referenciaId: id,
    estadoViejo: antes?.estado || null,
    estadoNuevo: nuevoEstado,
    usuarioResponsable: usuarioId,
  });
  if (antes?.usuarioId)
    await crearNotificacion(
      antes.usuarioId,
      `Sugerencia #${id} fue ${nuevoEstado}`
    );
  return updated;
}
