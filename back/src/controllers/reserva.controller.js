import * as service from "../services/reserva.services.js";

export async function crearReserva(req, res) {
  try {
    const payload = { ...req.body, usuarioId: req.user.id };
    const nueva = await service.crearReserva(payload);
    res.json({ ok: true, reserva: nueva });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}

export async function cambiarEstado(req, res) {
  try {
    const updated = await service.cambiarEstadoReserva(
      Number(req.params.id),
      req.body.estado,
      req.user.id
    );
    res.json({ ok: true, updated });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}

export async function listar(req, res) {
  res.json({ ok: true, rows: await service.listarReservas() });
}
