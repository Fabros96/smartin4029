import { PrismaClient } from "@prisma/client";
import { crearHistorial } from "./historial.service.js";
const prisma = new PrismaClient();

export async function crearAula(data) {
  return prisma.aula.create({ data });
}

export async function listarAulas() {
  return prisma.aula.findMany({ orderBy: { nombre: "asc" } });
}

export async function actualizarEstadoAula(id, nuevoEstado, usuarioId) {
  const antes = await prisma.aula.findUnique({ where: { id } });
  const actualizado = await prisma.aula.update({
    where: { id },
    data: { estado: nuevoEstado },
  });

  await crearHistorial({
    entidad: "Aula",
    referenciaId: id,
    estadoViejo: antes?.estado || null,
    estadoNuevo: nuevoEstado,
    usuarioResponsable: usuarioId,
  });

  return actualizado;
}
