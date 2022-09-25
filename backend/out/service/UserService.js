"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Responses_1 = require("../config/Responses");
const UserData_1 = __importDefault(require("../data/UserData"));
const CryptoService_1 = __importDefault(require("./CryptoService"));
class UserService {
    /**
     * Login into the app
     * @param req The HTTP Request
     * @param res The HTTP Response
     * @param database The database connection
     * @returns The login data or the generated errors.
     */
    static async login(req, res, database) {
        let params = {
            username: req.body.username,
            password: CryptoService_1.default.oneWayEncrypt(req.body.password),
            device: req.body.device
        };
        // Check the given parameters and if they're missing, return,
        if (!params.username || !params.password || !params.device) {
            return Responses_1.MISSING_PARAMETERS;
        }
        // Check login on database
        const login = await UserData_1.default.login(params, database);
        if (typeof login !== "string") {
            return login;
        }
        // Return login data
        return {
            success: true,
            message: "Login done successfully.",
            token: login,
            code: 200
        };
    }
    /**
     * Register a user into the app database
     * @param req The HTTP Request
     * @param res The HTTP Response
     * @param database The database connection
     * @returns The register data or generated errors
     */
    static async register(req, res, database) {
        let params = {
            username: req.body.username,
            password: CryptoService_1.default.oneWayEncrypt(req.body.password),
            device: req.body.device
        };
        // Check given parameters and if they're missing, return 
        if (!params.username || !params.password) {
            return Responses_1.MISSING_PARAMETERS;
        }
        const register = await UserData_1.default.register(params, database);
        // If register already exists return the response
        if (typeof register !== "string") {
            return register;
        }
        // If everything is fine, return register data.
        const token = register;
        return {
            success: true,
            message: "Registered successfully.",
            token: token,
            code: 200
        };
    }
}
exports.default = UserService;
