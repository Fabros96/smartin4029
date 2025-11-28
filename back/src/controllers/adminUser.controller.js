import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcryptjs";

// Obtener todos los usuarios
export const getAll = async (req, res) => {
  const users = await prisma.usuario.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      nombre: true,
      apellido: true,
      rol: true,
      createdAt: true,
    },
  });
  res.json(users);
};

// Obtener un usuario por ID
export const getById = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.usuario.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      username: true,
      email: true,
      nombre: true,
      apellido: true,
      rol: true,
      createdAt: true,
    },
  });
  if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
  res.json(user);
};

// Crear un nuevo usuario
export const create = async (req, res) => {
  const { username, email, password, nombre, apellido, rol } = req.body;

  const exists = await prisma.usuario.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (exists) return res.status(400).json({ msg: "Usuario ya existe" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.usuario.create({
    data: { username, email, password: hashed, nombre, apellido, rol },
  });

  res.json(user);
};

// Actualizar usuario
export const update = async (req, res) => {
  const { id } = req.params;
  const { username, email, nombre, apellido, rol } = req.body;

  const user = await prisma.usuario.update({
    where: { id: Number(id) },
    data: { username, email, nombre, apellido, rol },
  });

  res.json(user);
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await prisma.usuario.delete({ where: { id: Number(id) } });
  res.json({ msg: "Usuario eliminado" });
};

// Resetear contraseña
export const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  const hashed = await bcrypt.hash(newPassword, 10);

  const user = await prisma.usuario.update({
    where: { id: Number(id) },
    data: { password: hashed },
  });

  res.json({ msg: "Contraseña reseteada", user });
};
