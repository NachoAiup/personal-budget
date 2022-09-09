const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findByEmail, create } = require("../users.model");

function generateAccessToken(email, name, id) {
  return jwt.sign({ email, name, id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
}

async function login(email, password) {
  const user = await findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  return {
    token: generateAccessToken(email, user.name, user.user_id),
    name: user.name,
    user_id: user.user_id,
  };
}

async function checkIsEmailTaken(email) {
  const user = await findByEmail(email);
  return !!user;
}

async function register(email, password, name) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await create({
    email: email.toLowerCase(),
    password: hashedPassword,
    name: name,
  });

  return generateAccessToken(email);
}

module.exports = { login, checkIsEmailTaken, register };
