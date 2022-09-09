const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(createError(httpStatus.UNAUTHORIZED));
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return next(createError(httpStatus.UNAUTHORIZED));
  }
  return next();
};

module.exports = { verifyTokenMiddleware };
