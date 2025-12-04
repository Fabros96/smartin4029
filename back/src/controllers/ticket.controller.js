import * as service from "../services/ticket.services.js";

export async function crearTicket(req, res) {
  try {
    const t = await service.crearTicket({
      ...req.body,
      usuarioId: req.user.id,
    });
    res.json({ ok: true, ticket: t });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}

export async function cambiarEstado(req, res) {
  try {
    const updated = await service.cambiarEstadoTicket(
      Number(req.params.id),
      req.body.estado,
      req.user.id
    );
    res.json({ ok: true, updated });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
