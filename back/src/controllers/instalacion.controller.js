import prisma from "../prisma/prismaClient.js";

// Obtener instalaciones del usuario logueado
export const getMyInstallaciones = async (req, res) => {
  const instalaciones = await prisma.instalacion.findMany({
    where: { usuarioId: req.user.id },
  });
  res.json(instalaciones);
};

// Crear nueva instalación
export const create = async (req, res) => {
  const { aplicacion, descripcion, equipoId, salaId } = req.body;

  const instalacion = await prisma.instalacion.create({
    data: {
      aplicacion,
      descripcion,
      equipoId: equipoId || null,
      salaId: salaId || null,
      usuarioId: req.user.id,
    },
  });

  res.json(instalacion);
};

// Actualizar estado de instalación
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const instalacion = await prisma.instalacion.update({
    where: { id: Number(id) },
    data: { estado },
  });

  res.json(instalacion);
};

// Cancelar instalación
export const cancel = async (req, res) => {
  const { id } = req.params;

  const instalacion = await prisma.instalacion.update({
    where: { id: Number(id) },
    data: { estado: "cancelado" },
  });

  res.json(instalacion);
};
