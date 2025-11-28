export const roleCheck = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ msg: "No autorizado" });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Rol no permitido" });
    }
    next();
  };
};
