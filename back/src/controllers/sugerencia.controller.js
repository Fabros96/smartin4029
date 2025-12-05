import * as service from "../services/sugerencia.service.js";

export async function listarSugerencias(req, res) {
  try {
    const sugerencias = await service.listarSugerencias();
    res.json({ ok: true, sugerencias });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
export async function crearSugerencia(req, res) {
  try {
    const s = await service.crearSugerencia({
      ...req.body,
      usuarioId: req.user.id,
    });
    res.json({ ok: true, sugerencia: s });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
export async function cambiarEstado(req, res) {
  try {
    const u = await service.cambiarEstadoSugerencia(
      Number(req.params.id),
      req.body.estado,
      req.user.id
    );
    res.json({ ok: true, updated: u });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
