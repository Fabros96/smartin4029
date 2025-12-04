import { PrismaClient } from "@prisma/client";
import { crearHistorial } from "./historial.services.js";
import { crearNotificacion } from "./notificacion.services.js";
const prisma = new PrismaClient();
const ESTADOS_VALIDOS = ["disponible", "ocupado", "mantenimiento"];

export async function crearEquipo(data) {
  return prisma.equipo.create({ data });
}

export async function listarEquipos() {
  return prisma.equipo.findMany({ orderBy: { nombre: "asc" } });
}

export async function obtenerEquiposPorEstado(estado) {
  return prisma.equipo.findMany({ where: { estado } });
}

export async function actualizarEstadoEquipo(id, nuevoEstado, usuarioId) {
  const ESTADOS_VALIDOS = ["disponible", "ocupado", "mantenimiento"];

  if (!ESTADOS_VALIDOS.includes(nuevoEstado)) {
    throw new Error(
      `Estado inválido. Debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}`
    );
  }

  const equipo = await prisma.equipo.findUnique({ where: { id } });
  if (!equipo) throw new Error("Equipo no encontrado");

  const actualizado = await prisma.equipo.update({
    where: { id },
    data: { estado: nuevoEstado },
  });

  // Crear historial correctamente
  await prisma.historial.create({
    data: {
      estadoViejo: equipo.estado,
      estadoNuevo: nuevoEstado,
      usuario: { connect: { id: usuarioId } },
      equipo: { connect: { id: equipo.id } },
    },
  });

  return actualizado;
}
