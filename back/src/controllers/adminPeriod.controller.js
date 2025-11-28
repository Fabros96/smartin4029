import prisma from "../prisma/prismaClient.js";

export const getAll = async (req, res) => {
  const periods = await prisma.period.findMany();
  res.json(periods);
};

export const create = async (req, res) => {
  const { name, startTime, endTime } = req.body;
  const period = await prisma.period.create({
    data: {
      name,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    },
  });
  res.json(period);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { name, startTime, endTime } = req.body;
  const period = await prisma.period.update({
    where: { id: Number(id) },
    data: {
      name,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    },
  });
  res.json(period);
};

export const deletePeriod = async (req, res) => {
  const { id } = req.params;
  await prisma.period.delete({ where: { id: Number(id) } });
  res.json({ msg: "Periodo eliminado" });
};
