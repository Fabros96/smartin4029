import * as service from "../services/notificacion.services.js";

export async function listarNotificaciones(req, res) {
  const usuarioId = req.user.id;
  const rows = await service.listarNotificaciones(usuarioId);
  res.json({ ok: true, rows });
}

export async function marcarLeida(req, res) {
  try {
    const { id } = req.params;
    const u = await service.marcarLeida(Number(id));
    res.json({ ok: true, updated: u });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
