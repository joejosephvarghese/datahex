const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const ApiError = require('../utils/apiError');
const mongoose = require('mongoose');

const errorConverter = (err, req, res, next) => {
  let error = err;

  // Handle Mongoose Validation Error
  if (error instanceof mongoose.Error.ValidationError) {
    const message = Object.values(error.errors).map((e) => e.message).join(', ');
    error = new ApiError(StatusCodes.BAD_REQUEST, message, false, err.stack);
  }

  // Handle Duplicate Key Error (E11000)
  else if (error.code && error.code === 11000) {
    const fields = Object.keys(error.keyValue).join(', ');
    const message = `Duplicate field(s): ${fields}`;
    error = new ApiError(StatusCodes.BAD_REQUEST, message, false, err.stack);
  }

  // Generic error wrapper if not already an ApiError
  else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || getReasonPhrase(statusCode);
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!statusCode) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = getReasonPhrase(statusCode);
  }

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
