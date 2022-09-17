"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_UPDATE_SUCCESS = exports.TOKEN_UPDATE_FAILED = exports.TOKEN_INSERT_FAILED = exports.USER_REGISTER_FAILED = exports.USER_ALREADY_EXISTS = exports.INCORRECT_CREDENTIALS = exports.MISSING_PARAMETERS = exports.PONG = void 0;
exports.PONG = new Promise((r) => r({
    success: true,
    message: "pong",
    code: 200
}));
exports.MISSING_PARAMETERS = new Promise((r) => r({
    success: false,
    message: "Missing parameters.",
    code: 400
}));
exports.INCORRECT_CREDENTIALS = new Promise((r) => r({
    success: false,
    message: "Incorrect credentials.",
    code: 403
}));
exports.USER_ALREADY_EXISTS = new Promise((r) => r({
    success: false,
    message: "User already exists.",
    code: 409
}));
exports.USER_REGISTER_FAILED = new Promise((r) => r({
    success: false,
    message: "The user cannot be registered right now, try again later.",
    code: 500
}));
exports.TOKEN_INSERT_FAILED = new Promise((r) => r({
    success: false,
    message: "The token insertion failed.",
    code: 500
}));
exports.TOKEN_UPDATE_FAILED = new Promise((r) => r({
    success: false,
    message: "The token update failed.",
    code: 500
}));
exports.TOKEN_UPDATE_SUCCESS = new Promise((r) => r({
    success: true,
    message: "The token insertion succeded.",
    code: 200
}));
