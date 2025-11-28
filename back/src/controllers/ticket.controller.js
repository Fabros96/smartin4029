import prisma from "../prisma/prismaClient.js";

// Obtener tickets del usuario logueado
export const getMyTickets = async (req, res) => {
  const tickets = await prisma.ticket.findMany({
    where: { usuarioId: req.user.id },
  });
  res.json(tickets);
};

// Crear un nuevo ticket
export const create = async (req, res) => {
  const { descripcion, foto, numero } = req.body;

  const ticket = await prisma.ticket.create({
    data: {
      descripcion,
      foto: foto || null,
      numero,
      usuarioId: req.user.id,
    },
  });

  res.json(ticket);
};

// Obtener ticket por ID
export const getById = async (req, res) => {
  const { id } = req.params;
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(id) },
  });
  if (!ticket) return res.status(404).json({ msg: "Ticket no encontrado" });
  res.json(ticket);
};

// Actualizar estado de un ticket
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const ticket = await prisma.ticket.update({
    where: { id: Number(id) },
    data: { estado },
  });

  res.json(ticket);
};
