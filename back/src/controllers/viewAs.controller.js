import prisma from "../prisma/prismaClient.js";

// Cambiar a otro rol
export const viewAs = async (req, res) => {
  const { role } = req.body;

  if (!["alumno", "profesor", "preceptor", "especial", "admin"].includes(role))
    return res.status(400).json({ msg: "Rol inválido" });

  // Guardamos rol temporal en req.user
  req.session.viewAs = role;
  res.json({ msg: `Ahora ves como ${role}` });
};

// Volver al rol real
export const resetViewAs = async (req, res) => {
  req.session.viewAs = null;
  res.json({ msg: "Volviste a tu rol real" });
};
