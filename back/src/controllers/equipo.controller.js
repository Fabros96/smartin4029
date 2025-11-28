import prisma from "../prisma/prismaClient.js";

export const getAll = async (req, res) => {
  const equipos = await prisma.equipo.findMany();
  res.json(equipos);
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const equipo = await prisma.equipo.findUnique({
    where: { id: Number(id) },
  });

  if (!equipo) return res.status(404).json({ msg: "No encontrado" });

  res.json(equipo);
};

export const create = async (req, res) => {
  const { name, description } = req.body;

  const eq = await prisma.equipo.create({
    data: { name, description },
  });

  res.json(eq);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const eq = await prisma.equipo.update({
    where: { id: Number(id) },
    data: { name, description },
  });

  res.json(eq);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  await prisma.equipo.delete({
    where: { id: Number(id) },
  });

  res.json({ msg: "Eliminado" });
};
