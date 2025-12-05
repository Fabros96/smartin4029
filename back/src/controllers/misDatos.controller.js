import * as service from "../services/misDatos.service.js";


export async function misDatos(req, res) {
  try {
    // Usamos el id del usuario logeado desde el middleware
    const me = await service.misDatos(req.user.id);
    res.json({ "Ok": me });
  } catch (e) {
    console.error("Error en misDatos:", e);
    res
      .status(500)
      .json({ ok: false, msg: "Error al traer mis datos", error: e.message });
  }
}

export async function actualizarMisDatos(req, res) {
  try {
    const { id } = req.params;
    const { nuevosDatos } = req.body;
    const actualizado = await service.actualizarEstadoEquipo(
      Number(id),
      nuevosDatos,
      req.user.id
    );
    res.json({ ok: true, updated: actualizado });
  } catch (e) {
    res.status(400).json({ ok: false, msg: e.message });
  }
}




