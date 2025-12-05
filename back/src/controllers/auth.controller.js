import * as service from "../services/auth.service.js";
// view-as: guarda original token y emite token temporal con nuevo rol
import jwt from "jsonwebtoken";

export async function login(req, res) {
  try {
    const { identifier, password } = req.body; // acepta email o username en 'identifier'
    if (!identifier || !password)
      return res.status(400).json({ ok: false, error: "Faltan credenciales" });

    const { user, token } = await service.loginByEmailOrUsername(
      identifier,
      password
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({
      ok: true,
      msg: "Login correcto",
      user: { id: user.id, email: user.email, rol: user.rol },
    });
  } catch (err) {
    res.status(401).json({ ok: false, error: err.message });
  }
}

export function logout(req, res) {
  res.clearCookie("token");
  res.json({ ok: true, msg: "Sesión cerrada" });
}

export async function register(req, res) {
  try {
    await service.register(req, res);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

export async function viewAs(req, res) {
  try {
    const { rol } = req.body;
    if (!["alumno", "profesor", "preceptor", "especial", "admin"].includes(rol))
      return res.status(400).json({ ok: false, error: "Rol inválido" });

    // guardamos token original en cookie (solo en dev; en prod se debe proteger más)
    const origToken = req.cookies?.token;
    if (!origToken)
      return res
        .status(400)
        .json({ ok: false, error: "No hay sesión original" });

    // decodificamos original para info
    const origDecoded = jwt.verify(origToken, process.env.JWT_SECRET);

    // Permitimos solo admin o especial a usar view-as
    if (!["admin", "especial"].includes(origDecoded.rol))
      return res
        .status(403)
        .json({ ok: false, error: "No tiene permiso para view-as" });

    //guardamos original token en cookie separada
    res.cookie("originalToken", origToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // emitimos token temporal con mismo id pero rol cambiado
    const tempToken = jwt.sign(
      { id: origDecoded.id, rol, email: origDecoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );
    res.cookie("token", tempToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({ ok: true, msg: `Ahora viendo como ${rol}` });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
}

export function viewAsReset(req, res) {
  try {
    const original = req.cookies?.originalToken;
    if (!original)
      return res
        .status(400)
        .json({ ok: false, error: "No hay view-as activo" });
    // restauramos token original y borramos originalToken cookie
    res.cookie("token", original, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("originalToken");
    res.json({ ok: true, msg: "Vista original restaurada" });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
}

export async function me(req, res) {
  try {
    const userId = req.user.id;

    const usuario = await service.obtenerUsuarioPorId(userId);
    if (!usuario) {
      return res
        .status(404)
        .json({ ok: false, error: "Usuario no encontrado" });
    }

    const usuarioAMostrar = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      telefono: usuario.telefono,
      estado: usuario.estado,
      rol: usuario.rol,
      fechaBaja: usuario.fechaBaja,
      createdAt: usuario.createdAt,
      updatedAt: usuario.updatedAt,
    };

    res.json({ ok: true, user: usuarioAMostrar });
  } catch (error) {
    console.error("Error en /me:", error);
    res.status(500).json({ ok: false, error: "Error al obtener usuario" });
  }
}


export async function cambiarMisDatos(req, res) {
  try {
    const userId = req.user.id; // ✅ SALE DEL TOKEN
    const updated = await service.actualizarMisDatos(userId, req.body);

    res.json({ ok: true, usuario: updated , msg: "Datos actualizados correctamente"});
  } catch (e) {
    res.status(400).json({ ok: false, error: "Error al actualizar datos" });
  }
}

