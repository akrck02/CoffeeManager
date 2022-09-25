"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJWT(data, key) {
    return jsonwebtoken_1.default.sign(data, key);
}
exports.signJWT = signJWT;
function verifyJWT(token, key) {
    return jsonwebtoken_1.default.verify(token, key);
}
exports.verifyJWT = verifyJWT;
