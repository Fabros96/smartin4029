import prisma from "../prisma/prismaClient.js";

// Obtener notificaciones del usuario logueado
export const getMyNotificaciones = async (req, res) => {
  const notificaciones = await prisma.notificacion.findMany({
    where: { usuarioId: req.user.id },
  });
  res.json(notificaciones);
};

// Marcar una notificación como leída
export const markRead = async (req, res) => {
  const { id } = req.params;

  const notificacion = await prisma.notificacion.update({
    where: { id: Number(id) },
    data: { leida: true },
  });

  res.json(notificacion);
};

// Actualizar preferencias de notificaciones (opcional)
export const updateSettings = async (req, res) => {
  // Aquí se pueden guardar preferencias de notificaciones en DB si las agregamos
  res.json({ msg: "Preferencias actualizadas" });
};
