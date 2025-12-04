// src/services/usuarios.service.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/*
  Servicio de Usuarios
  Contiene toda la lógica de negocio de los usuarios
  Aquí hacemos las consultas a la base de datos
*/

export const UsuariosService = {
  // Listar todos los usuarios
  listarUsuarios: async () => {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        username: true,
        rol: true,
        fechaBaja: true,
        createdAt: true,
      },
    });
    return usuarios;
  },

  // Obtener un usuario por ID
  obtenerUsuarioPorId: async (id) => {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });
    return usuario;
  },

  // Crear usuario
  crearUsuario: async (data) => {
    const usuario = await prisma.usuario.create({ data });
    return usuario;
  },

  // Actualizar usuario
  actualizarUsuario: async (id, data) => {
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data,
    });
    return usuario;
  },

  // Baja lógica (fechaBaja)
  eliminarUsuario: async (id) => {
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { fechaBaja: new Date() },
    });
    return usuario;
  },
};
