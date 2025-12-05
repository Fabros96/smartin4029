import { obtenerHistorial } from "../services/historial.service.js";

export async function getHistorial(req, res) {
  try {
    const { entidad, entidadId } = req.params;
    const rows = await obtenerHistorial(entidad, Number(entidadId));
    // formatear fecha en DD/MM/YYYY si querés
    res.json({ ok: true, rows });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
