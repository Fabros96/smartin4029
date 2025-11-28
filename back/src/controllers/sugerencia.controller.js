import prisma from "../prisma/prismaClient.js";

// Crear una nueva sugerencia
export const create = async (req, res) => {
  const { titulo, descripcion } = req.body;

  const sugerencia = await prisma.sugerencia.create({
    data: {
      titulo,
      descripcion,
      usuarioId: req.user.id,
    },
  });

  res.json(sugerencia);
};

// Obtener sugerencias del usuario logueado
export const getMySugerencias = async (req, res) => {
  const sugerencias = await prisma.sugerencia.findMany({
    where: { usuarioId: req.user.id },
  });
  res.json(sugerencias);
};

// Obtener sugerencia por ID
export const getById = async (req, res) => {
  const { id } = req.params;
  const sugerencia = await prisma.sugerencia.findUnique({
    where: { id: Number(id) },
  });
  if (!sugerencia) return res.status(404).json({ msg: "No encontrado" });
  res.json(sugerencia);
};

// Actualizar estado de una sugerencia
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const sugerencia = await prisma.sugerencia.update({
    where: { id: Number(id) },
    data: { estado },
  });

  res.json(sugerencia);
};
