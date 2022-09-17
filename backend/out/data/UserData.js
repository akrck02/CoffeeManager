"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Responses_1 = require("../config/Responses");
const CryptoService_1 = __importDefault(require("../service/CryptoService"));
const Errors_1 = require("../utils/Errors");
class UserData {
    /**
     * Check login into app of a user on the given database schema
     * @param params The parameters to check
     * @param db The database to check
     * @returns If the login is accepted
     */
    static async login(params, db) {
        const SQL_QUERY = "SELECT username, password, auth FROM user WHERE username=? and password=?";
        const result = await db.get().all(SQL_QUERY, params.username, params.password);
        // If no result was found, return.
        if (!result || result.length == 0) {
            return Responses_1.INCORRECT_CREDENTIALS;
        }
        const user = result[0];
        const token = CryptoService_1.default.generateDeviceToken(user.auth, params.device);
        // Insert or update token in database
        const state = await this.insertOrUpdateDeviceToken(db, user.auth, token, params.device);
        if (state.code != 200) {
            return state;
        }
        // Return device token
        return token;
    }
    /**
     * Register of a user into the app database
     * @param params The params to check
     * @param db The database to insert into
     * @returns The auth code of the new registered user
     */
    static async register(params, db) {
        const SQL_QUERY = "INSERT INTO user (username, password, auth) VALUES (?,?,?)";
        const auth = CryptoService_1.default.generateUserToken(params.username, params.password);
        try {
            const result = await db.get().run(SQL_QUERY, params.username, params.password, auth);
            if (!result || !result.lastID) {
                return Responses_1.USER_REGISTER_FAILED;
            }
            const token = CryptoService_1.default.generateDeviceToken(auth, params.device);
            // Insert or update token in database
            const state = await this.insertOrUpdateDeviceToken(db, auth, token, params.device);
            if (state.code != 200) {
                return state;
            }
            // Return device token
            return token;
        }
        catch (err) {
            // If the user already exists
            if (err.errno == Errors_1.Errors.SQLITE_UNIQUE_CONTRAINT_VIOLATION) {
                return Responses_1.USER_ALREADY_EXISTS;
            }
            throw err;
        }
    }
    /**
     * Insert a new device token or if exists update it.
     * @param db The database connection
     * @param auth The user to associate the device
     * @param deviceToken The device token
     * @param address The IP address of the device
     * @returns The state of the proccess
     */
    static async insertOrUpdateDeviceToken(db, auth, deviceToken, address) {
        try {
            const SQL_INSERT_QUERY = "INSERT INTO user_device(auth, device, address) VALUES (?,?,?)";
            const result = await db.get().run(SQL_INSERT_QUERY, auth, deviceToken, address);
            if (!result || !result.lastID) {
                return Responses_1.TOKEN_INSERT_FAILED;
            }
        }
        catch (err) {
            // If device already exists, update it
            if (err.errno === Errors_1.Errors.SQLITE_UNIQUE_CONTRAINT_VIOLATION) {
                const SQL_UPDATE_QUERY = "UPDATE user_device SET device = ? WHERE auth = ? AND address = ?";
                const result = await db.get().run(SQL_UPDATE_QUERY, deviceToken, auth, address);
                if (!result || !result.changes) {
                    return Responses_1.TOKEN_UPDATE_FAILED;
                }
                return Responses_1.TOKEN_UPDATE_SUCCESS;
            }
            throw err;
        }
        return Responses_1.TOKEN_UPDATE_SUCCESS;
    }
}
exports.default = UserData;
