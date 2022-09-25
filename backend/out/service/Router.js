"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Responses_1 = require("../config/Responses");
const Database_1 = __importDefault(require("../Database"));
const UserService_1 = __importDefault(require("./UserService"));
class Router {
    constructor() { }
    /**
     * Start the router service
     * @param db The database name
     */
    static async start(db = "coffee") {
        const database = new Database_1.default(db);
        await database.open();
        await database.updateTables();
        const paths = {
            "ping": () => Responses_1.PONG,
            "login": this.ApiEndpoint(UserService_1.default.login, database),
            "register": this.ApiEndpoint(UserService_1.default.register, database),
        };
        return paths;
    }
    /**
     * Create an API endpoint from given function
     * @param fn The given function
     * @param db The current database
     * @returns The converted function into an HTTP API endpoint
     */
    static ApiEndpoint(fn, db) {
        return (req, res) => fn(req, res, db);
    }
}
exports.default = Router;
Router.VERSION = "1";
Router.PREFIX = "api";
Router.API = `/${Router.PREFIX}/v${Router.VERSION}/`;
