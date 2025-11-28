import prisma from "../prisma/prismaClient.js";

// Solicitud inmediata (todos los roles)
export const crearReservaInmediata = async (req, res) => {
  try {
    const { equipmentId, roomId } = req.body;

    const reserva = await prisma.reserva.create({
      data: {
        type: "immediate",
        userId: req.user.id,
        equipmentId: equipmentId || null,
        roomId: roomId || null,
      },
    });

    res.json(reserva);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
};

// Reserva programada (profesor, preceptor, especial, admin)
export const crearReservaProgramada = async (req, res) => {
  try {
    if (!["profesor", "preceptor", "especial", "admin"].includes(req.user.role))
      return res
        .status(403)
        .json({ msg: "No tienes permisos para reservas programadas" });

    const { equipmentId, roomId, scheduledAt } = req.body;

    const reserva = await prisma.reserva.create({
      data: {
        type: "scheduled",
        userId: req.user.id,
        equipmentId: equipmentId || null,
        roomId: roomId || null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      },
    });

    res.json(reserva);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
};

// Mis reservas
export const getMyReservas = async (req, res) => {
  const reservas = await prisma.reserva.findMany({
    where: { userId: req.user.id },
    include: { equipment: true, room: true },
  });
  res.json(reservas);
};

// Detalle
export const getById = async (req, res) => {
  const { id } = req.params;
  const reserva = await prisma.reserva.findUnique({
    where: { id: Number(id) },
    include: { equipment: true, room: true, user: true },
  });
  if (!reserva) return res.status(404).json({ msg: "Solicitud no encontrada" });
  res.json(reserva);
};

// Cancelar
export const cancelarReserva = async (req, res) => {
  const { id } = req.params;

  const reserva = await prisma.reserva.findUnique({
    where: { id: Number(id) },
  });
  if (!reserva) return res.status(404).json({ msg: "No encontrada" });
  if (
    reserva.userId !== req.user.id &&
    !["admin", "especial"].includes(req.user.role)
  )
    return res.status(403).json({ msg: "No puedes cancelar esta solicitud" });

  const updated = await prisma.reserva.update({
    where: { id: Number(id) },
    data: { status: "cancelled" },
  });

  res.json(updated);
};

// Repetir solicitud
export const repetirReserva = async (req, res) => {
  const { id } = req.params;

  const reserva = await prisma.reserva.findUnique({
    where: { id: Number(id) },
  });
  if (!reserva) return res.status(404).json({ msg: "No encontrada" });

  const newReserva = await prisma.reserva.create({
    data: {
      type: reserva.type,
      userId: req.user.id,
      equipmentId: reserva.equipmentId,
      roomId: reserva.roomId,
      scheduledAt: reserva.scheduledAt,
    },
  });

  res.json(newReserva);
};

// Cambiar status (solo admin/especial)
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["admin", "especial"].includes(req.user.role))
    return res.status(403).json({ msg: "No tienes permisos" });

  const reserva = await prisma.reserva.update({
    where: { id: Number(id) },
    data: { status },
  });

  res.json(reserva);
};
