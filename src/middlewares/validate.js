const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error-handler");

function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const message = error.details.map((detail) => detail.message).join(", ");
            return next(new AppError(message, StatusCodes.BAD_REQUEST));
        }
        next();
    };
}

module.exports = validate;
