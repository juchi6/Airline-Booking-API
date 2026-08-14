const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error-handler");

function authorize(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform this action", StatusCodes.FORBIDDEN));
        }
        next();
    };
}

module.exports = authorize;
