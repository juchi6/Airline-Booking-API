const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/error-handler");
const { signToken } = require("../utils/jwt-util");

const userRepository = new UserRepository();

async function register(data) {
    const existingUser = await userRepository.getUserByEmail(data.email);
    if (existingUser) {
        throw new AppError("Email already registered", StatusCodes.CONFLICT);
    }
    const user = await userRepository.create(data);
    return user;
}

async function login(data) {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
        throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }
    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
    }
    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return { user, token };
}

module.exports = { register, login };
