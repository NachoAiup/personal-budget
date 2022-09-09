const httpStatus = require("http-status");
const createError = require("http-errors");

function errorConverterHandler(err, req, res, next) {
  let error = err;
  if (!createError.isHttpError(error)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = createError(statusCode, message);
  }
  next(error);
}

function errorHandler(err, req, res, next) {
  let { statusCode, message } = err;

  const response = {
    statusCode,
    message,
  };

  res.status(statusCode).json(response);
}

module.exports = { errorConverterHandler, errorHandler };
