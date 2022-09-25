"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const Paths_1 = __importDefault(require("./config/Paths"));
const Logger_1 = __importDefault(require("./utils/Logger"));
class Database {
    constructor(name = Database.DEFAULT_DB_NAME) {
        this.name = name;
    }
    /**
     * Open the database
     */
    async open() {
        this.db = await (0, sqlite_1.open)({
            filename: `${Paths_1.default.DATABASE_STORAGE}${this.name}${Paths_1.default.DATABASE_EXTENSION}`,
            driver: sqlite3_1.default.Database
        });
        Logger_1.default.info(`SQLITE Connected to the in-memory database ${this.name}.`);
    }
    /**
     * Close the database connection
     */
    close() {
        this.db.close((err) => {
            if (err) {
                Logger_1.default.error(err.message);
                return;
            }
            Logger_1.default.info("SQLITE Closed the database connection.");
        });
    }
    /**
     * Update the database tables
     */
    async updateTables() {
        const fs = require('fs');
        const query = fs.readFileSync(Paths_1.default.UPDATE_TABLES, 'utf8');
        await this.db.exec(query);
    }
    /**
     * Get the database connection
     * @returns The database connection
     */
    get() {
        return this.db;
    }
}
exports.default = Database;
Database.DEFAULT_DB_NAME = "database";
