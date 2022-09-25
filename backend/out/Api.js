"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const Router_1 = __importDefault(require("./service/Router"));
const Logger_1 = __importDefault(require("./utils/Logger"));
const express = require('express');
class Api {
    constructor() {
        this.app = express();
    }
    /**
     * Start the API HTTP listener
     */
    async start() {
        const paths = await Router_1.default.start();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        /* CORS Control */
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language, Content-Type, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        /* CORS Control */
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Oauth, Device");
            next();
        });
        /* Define every route with callbacks */
        for (const key in paths) {
            const callback = paths[key];
            this.app.post(Router_1.default.API + key + "/", (req, res) => this.handleRequest(key, req, res, callback));
            this.app.get(Router_1.default.API + key + "/", (req, res) => {
                this.getParametersToBody(req);
                this.handleRequest(key, req, res, callback);
            });
        }
        /* Start API listener */
        this.app.listen(Api.PORT, Api.HOST);
        Logger_1.default.info(`API The CoffeeManager API is running on http://${Api.HOST}:${Api.PORT}${Router_1.default.API}`);
    }
    handleRequest(key, req, res, callback) {
        Logger_1.default.info(`API Request: ${Router_1.default.API}${key}/`);
        const promise = callback(req, res);
        promise.then((data) => {
            if (data.code) {
                res.statusCode = data.code;
            }
            res.send(data);
        })
            .catch((err) => {
            console.log("error", err);
            res.statusCode = 500;
            res.send({
                "success": false,
                "status": "failed",
                "message": err.message,
                "code": 500
            });
        });
    }
    /**
     * Convert get params to body
     * @param req The request to handle
     */
    getParametersToBody(req) {
        let url = req.url;
        url = url.substring(url.lastIndexOf("?") + 1);
        const params = url.split("&");
        const body = {};
        params.forEach(param => {
            const parts = param.split("=");
            body[parts[0]] = parts[1];
        });
        req.body = body;
    }
}
exports.Api = Api;
Api.HOST = "127.0.0.1";
Api.PORT = 8029;
