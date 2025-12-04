import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  try {
    let token = null;

    if (req.cookies?.token) token = req.cookies.token;
    if (!token && req.headers.authorization)
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ ok: false, error: "No autenticado" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: "Token inválido" });
  }
}
