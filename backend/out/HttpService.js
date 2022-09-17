"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Api_1 = require("./Api");
async function startHttp() {
    const api = new Api_1.Api();
    api.start();
}
startHttp();
