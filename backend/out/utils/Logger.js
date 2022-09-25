"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static now() {
        const now = new Date();
        return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }
    static info(message) {
        Logger.log(this.INFO, message);
    }
    static error(message) {
        Logger.log(this.ERROR, message);
    }
    static warn(message) {
        Logger.log(this.WARNING, message);
    }
    static debug(message) {
        Logger.log(this.DEBUG, message);
    }
    static log(type, message) {
        console.log(`${Logger.now()} ${type} ${message}`);
    }
}
exports.default = Logger;
Logger.DEBUG = "DEBUG";
Logger.INFO = "INFO";
Logger.ERROR = "ERROR";
Logger.WARNING = "WARNING";
