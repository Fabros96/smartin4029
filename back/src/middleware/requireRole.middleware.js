export function requireRole(roles = []) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ ok: false, error: "No autenticado" });
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ ok: false, error: "No tiene permisos" });
    }
    next();
  };
}
