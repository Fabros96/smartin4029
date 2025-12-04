import * as service from "../services/instalacion.services.js";

export async function crearInstalacion(req, res) {
  try {
    const i = await service.crearInstalacion({
      ...req.body,
      usuarioId: req.user.id,
    });
    res.json({ ok: true, instalacion: i });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
export async function cambiarEstado(req, res) {
  try {
    const u = await service.cambiarEstadoInstalacion(
      Number(req.params.id),
      req.body.estado,
      req.user.id
    );
    res.json({ ok: true, updated: u });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
