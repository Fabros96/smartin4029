import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export async function loginByEmailOrUsername(identifier, password) {
  const user = await prisma.usuario.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });
  if (!user || user.fechaBaja) throw new Error("Usuario no válido");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Password incorrecta");

  const token = jwt.sign(
    { id: user.id, rol: user.rol, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return { user, token };
}

export async function obtenerUsuarioPorId(id) {
  return prisma.usuario.findUnique({ where: { id } });
}

export async function actualizarMisDatos(id, data) {
  return prisma.usuario.update({
    where: { id },
    data,
  });
}