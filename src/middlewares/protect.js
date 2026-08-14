const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error-handler");
const { verifyToken } = require("../utils/jwt-util");
const { User } = require("../models");

async function protect(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Not authorized, no token provided", StatusCodes.UNAUTHORIZED);
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new AppError("User no longer exists", StatusCodes.UNAUTHORIZED);
        }
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof AppError) return next(error);
        next(new AppError("Not authorized, invalid or expired token", StatusCodes.UNAUTHORIZED));
    }
}

module.exports = protect;
