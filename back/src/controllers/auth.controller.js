import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient.js";

// REGISTER
export async function register(req, res) {
  console.log("BODY RECIBIDO:", req.body);
  try {
    const { username, nombre, apellido, email, password, rol } = req.body;

    const existe = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existe)
      return res.status(400).json({ msg: "El email ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);

    const nuevo = await prisma.usuario.create({
      data: {
        username,
        nombre,
        apellido,
        email,
        password: hashed,
        rol: rol || "alumno",
      },
    });

    res.json({ msg: "Usuario registrado correctamente", usuario: nuevo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario)
      return res.status(400).json({ msg: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) return res.status(400).json({ msg: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      msg: "Login correcto",
      token,
      usuario,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error interno" });
  }
}
