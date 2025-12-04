// src/controllers/usuarios.controller.js
import { UsuariosService } from "../services/usuario.services.js";

/*
  Controller de Usuarios
  Recibe las requests del cliente, llama al service y devuelve la respuesta
*/

export const UsuariosController = {
  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await UsuariosService.listarUsuarios();
      res.json({ ok: true, rows: usuarios });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, msg: "Error al listar usuarios" });
    }
  },

  obtenerUsuario: async (req, res) => {
    try {
      const usuario = await UsuariosService.obtenerUsuarioPorId(req.params.id);
      if (!usuario)
        return res
          .status(404)
          .json({ ok: false, msg: "Usuario no encontrado" });
      res.json({ ok: true, user: usuario });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, msg: "Error al obtener usuario" });
    }
  },

  crearUsuario: async (req, res) => {
    try {
      const usuario = await UsuariosService.crearUsuario(req.body);
      res.status(201).json({ ok: true, user: usuario });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, msg: "Error al crear usuario" });
    }
  },

  actualizarUsuario: async (req, res) => {
    try {
      const usuario = await UsuariosService.actualizarUsuario(
        req.params.id,
        req.body
      );
      res.json({ ok: true, user: usuario });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, msg: "Error al actualizar usuario" });
    }
  },

  eliminarUsuario: async (req, res) => {
    try {
      const usuario = await UsuariosService.eliminarUsuario(req.params.id);
      res.json({ ok: true, user: usuario });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, msg: "Error al eliminar usuario" });
    }
  },
};
