const express = require("express");
const router = express.Router();
const { AuthController } = require("../../controllers");
const { validate, RateLimiter } = require("../../middlewares");
const { registerSchema, loginSchema } = require("../../validators");

router.post("/register", RateLimiter.authLimiter, validate(registerSchema), AuthController.register);
router.post("/login", RateLimiter.authLimiter, validate(loginSchema), AuthController.login);

module.exports = router;
