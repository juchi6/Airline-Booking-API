const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error-handler");

function notFound(req, res, next) {
    next(new AppError(`Route ${req.originalUrl} not found`, StatusCodes.NOT_FOUND));
}

module.exports = notFound;
