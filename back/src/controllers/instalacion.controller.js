import * as service from "../services/instalacion.service.js";

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
export async function listarInstalaciones(req, res) {
  try {
    const instalaciones = await service.listarInstalaciones();
    res.json({ ok: true, rows: instalaciones });
  } catch (e) {
    res
      .status(500)
      .json({
        ok: false,
        msg: "Error al listar instalaciones",
        error: e.message,
      });
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
