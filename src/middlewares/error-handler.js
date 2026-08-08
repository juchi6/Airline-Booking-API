const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/error-handler");

function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        Logger.error(err.message, "ErrorHandler", err);
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: {},
            error: err.explanation,
        });
    }

    Logger.error(err.message, "ErrorHandler", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong",
        data: {},
        error: err.message,
    });
}

module.exports = errorHandler;
