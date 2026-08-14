const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../config");

function signToken(payload) {
    return jwt.sign(payload, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRES_IN });
}

function verifyToken(token) {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
}

module.exports = { signToken, verifyToken };
