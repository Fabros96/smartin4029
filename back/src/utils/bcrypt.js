const bcrypt  from "bcrypt");
const SALT = Number(process.env.BCRYPT_SALT_ROUNDS || 12);

function hashPassword(password) {
  return bcrypt.hash(password, SALT);
}

function comparePassword(password, hashed) {
  return bcrypt.compare(password, hashed);
}

export default { hashPassword, comparePassword };
