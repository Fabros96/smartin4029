import prisma from "../prisma/prismaClient.js";

export const getAll = async (req, res) => {
  const aulas = await prisma.aula.findMany();
  res.json(aulas);
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const aula = await prisma.aula.findUnique({
    where: { id: Number(id) },
  });

  if (!aula) return res.status(404).json({ msg: "No encontrado" });
  res.json(aula);
};

export const create = async (req, res) => {
  const { name, description } = req.body;
  const aula = await prisma.aula.create({
    data: { name, description },
  });
  res.json(aula);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const aula = await prisma.aula.update({
    where: { id: Number(id) },
    data: { name, description },
  });

  res.json(aula);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  await prisma.aula.delete({
    where: { id: Number(id) },
  });

  res.json({ msg: "Eliminado" });
};
