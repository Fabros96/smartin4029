import * as service from "../services/equipo.service.js";

export async function crearEquipo(req, res) {
  try {
    const data = req.body;
    const c = await service.crearEquipo(data);
    res.json({ ok: true, equipo: c });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}

export async function listarEquipos(req, res) {
  try {
    const equipos = await service.listarEquipos();
    res.json({ ok: true, rows: equipos });
  } catch (e) {
    res
      .status(500)
      .json({ ok: false, msg: "Error al listar equipos", error: e.message });
  }
}

export async function obtenerPorEstado(req, res) {
  const { estado } = req.params;
  const rows = await service.obtenerEquiposPorEstado(estado);
  res.json({ ok: true, rows });
}

export async function cambiarEstado(req, res) {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const actualizado = await service.actualizarEstadoEquipo(Number(id), estado, req.user.id);
    res.json({ ok: true, updated: actualizado });
  } catch (e) {
    res.status(400).json({ ok: false, msg: e.message });
  }
}

