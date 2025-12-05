import * as service from "../services/aula.service.js";

export async function crearAula(req, res) {
  try {
    const s = await service.crearAula(req.body);
    res.json({ ok: true, aula: s });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
export async function listarAulas(req, res) {
  res.json({ ok: true, rows: await service.listarAulas() });
}
export async function cambiarEstado(req, res) {
  try {
    const updated = await service.actualizarEstadoAula(
      Number(req.params.id),
      req.body.estado,
      req.user.id
    );
    res.json({ ok: true, updated });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
