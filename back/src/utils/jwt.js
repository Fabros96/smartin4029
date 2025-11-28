const jwt  from "jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET || "secret";
const EXPIRES = process.env.JWT_EXPIRES_IN || "7d";

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

export default { signToken, verifyToken };
