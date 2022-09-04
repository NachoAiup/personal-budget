const express = require("express");
const httpStatus = require("http-status");
const createError = require("http-errors");
const { checkIsEmailTaken, login, register } = require("./auth.controller");

const router = express.Router();

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      createError(httpStatus.BAD_REQUEST, "Email and password required")
    );
  }

  const user = await login(email, password);
  if (user?.token) {
    res.json({
      token: user.token,
      email,
      name: user.name,
      user_id: user.user_id,
    });
  } else {
    return next(createError(httpStatus.UNAUTHORIZED));
  }
});

router.post("/register", async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      createError(httpStatus.BAD_REQUEST, "Email and password required")
    );
  }

  const isEmailTaken = await checkIsEmailTaken(email);
  if (isEmailTaken) {
    return next(createError(httpStatus.CONFLICT));
  }

  await register(email, password);
  res.status(httpStatus.CREATED).end();
});

module.exports = router;
