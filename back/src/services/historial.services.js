import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Crea un registro de historial genérico.
 * entidad: string (e.g. "Reserva")
 * referenciaId: id de la entidad
 * estadoViejo, estadoNuevo: textos
 * usuarioResponsable: id del usuario que hizo el cambio
 */
export async function crearHistorial({
  entidad,
  referenciaId,
  estadoViejo = null,
  estadoNuevo = null,
  usuarioResponsable = null,
}) {
  return prisma.historial.create({
    data: {
      entidad,
      referenciaId,
      estadoViejo,
      estadoNuevo,
      usuarioResponsable,
    },
  });
}

/**
 * Obtiene historial de una entidad ordenado por fecha desc
 */
export async function obtenerHistorial(entidad, referenciaId) {
  return prisma.historial.findMany({
    where: { entidad, referenciaId },
    include: {
      usuario: {
        select: { id: true, email: true, nombre: true, apellido: true },
      },
    },
    orderBy: { fechaCambio: "desc" },
  });
}
