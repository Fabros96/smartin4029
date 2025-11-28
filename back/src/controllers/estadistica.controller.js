import prisma from "../prisma/prismaClient.js";

// Uso general (solo admin/especial)
export const usageStats = async (req, res) => {
  try {
    const equipoCount = await prisma.equipo.count();
    const aulaCount = await prisma.aula.count();
    const userCount = await prisma.user.count();
    const reservaCount = await prisma.reserva.count();
    const ticketCount = await prisma.ticket.count();

    res.json({
      totalEquipos: equipoCount,
      totalAulas: aulaCount,
      totalUsers: userCount,
      totalReservas: reservaCount,
      totalTickets: ticketCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
};

// Estadísticas de préstamos/requests
export const loansStats = async (req, res) => {
  try {
    const loans = await prisma.request.groupBy({
      by: ["type"],
      _count: { id: true },
    });
    res.json(loans);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
};

// Estadísticas de tickets
export const ticketsStats = async (req, res) => {
  try {
    const tickets = await prisma.ticket.groupBy({
      by: ["status"],
      _count: { id: true },
    });
    res.json(tickets);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
};

// Estadísticas de reservas
export const reservationsStats = async (req, res) => {
  try {
    const reservations = await prisma.request.groupBy({
      by: ["status"],
      _count: { id: true },
    });
    res.json(reservations);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
};

// Estadísticas de roles de usuarios
export const usersStats = async (req, res) => {
  try {
    const roles = await prisma.user.groupBy({
      by: ["role"],
      _count: { id: true },
    });
    res.json(roles);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
};
