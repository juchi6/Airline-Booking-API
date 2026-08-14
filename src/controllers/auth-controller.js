const { StatusCodes } = require("http-status-codes");
const { AuthService } = require("../services");
const { catchAsync } = require("../utils");

const register = catchAsync(async (req, res) => {
    const user = await AuthService.register({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: { id: user.id, email: user.email, name: user.name, role: user.role },
        error: {}
    });
});

const login = catchAsync(async (req, res) => {
    const { user, token } = await AuthService.login({
        email: req.body.email,
        password: req.body.password
    });
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Login successful",
        data: { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } },
        error: {}
    });
});

module.exports = { register, login };
