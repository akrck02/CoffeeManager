"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_1 = require("../utils/Jwt");
require('dotenv').config();
const md5 = require("md5");
class CryptoService {
    constructor() { }
    /**
     * Generate a unique user token based on JWT (JSON Web Token)
     * @param username The app user
     * @param password The user login pasword
     * @returns The generated token
     */
    static generateUserToken(username, password) {
        const now = new Date().getMilliseconds();
        const data = {
            now: now,
            username: username,
            password: password
        };
        return (0, Jwt_1.signJWT)(data, CryptoService.checkSecret());
    }
    /**
     * Get the data inside the token for checkings
     * @param token The token
     * @returns The token data
     */
    static getTokenData(token) {
        return (0, Jwt_1.verifyJWT)(token, CryptoService.checkSecret());
    }
    /**
     * Generate a token for a giver user device
     * @param userToken The user token
     * @param deviceAddr The device IP address
     * @returns The generated unique device token
     */
    static generateDeviceToken(userToken, deviceAddr) {
        const now = new Date().getMilliseconds();
        const data = {
            now: now,
            userToken: userToken,
            deviceAddr: deviceAddr,
        };
        const deviceToken = (0, Jwt_1.signJWT)(data, CryptoService.checkSecret());
        return deviceToken;
    }
    /**
     * Encrypt a text with a one way hashing algorythm
     * @param text The texThe encrypted text
     */
    static oneWayEncrypt(text) {
        return md5(text);
    }
    /**
     * Check for the cryptography secret
     * @returns The secret
     */
    static checkSecret() {
        if (!CryptoService.SECRET) {
            throw new Error("The cryptography secrets are missing");
        }
        return CryptoService.SECRET;
    }
}
exports.default = CryptoService;
CryptoService.SECRET = process.env.SECRET;
