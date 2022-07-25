import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import Paths from "./config/Paths";
import Logger from './utils/Logger';


export default class Database {

    private static DEFAULT_DB_NAME = "database";

    protected db: any;
    protected name: string;

    public constructor(name: string = Database.DEFAULT_DB_NAME) {
        this.name = name;
    }

    /**
     * Open the database 
     */
    public async open() {

        this.db = await open({
            filename: `${Paths.DATABASE_STORAGE}${this.name}${Paths.DATABASE_EXTENSION}`,
            driver: sqlite3.Database
        });

        Logger.info(`SQLITE Connected to the in-memory database ${this.name}.`);
    }

    /**
     * Close the database connection
     */
    public close() {
        this.db.close((err: Error) => {
            if (err) {
                Logger.error(err.message);
                return;
            }
            Logger.info("SQLITE Closed the database connection.");
        });
    }

    /**
     * Update the database tables 
     */
    public async updateTables() {
        const fs = require('fs');
        const query = fs.readFileSync(Paths.UPDATE_TABLES, 'utf8');
        await this.db.exec(query);
    } 

    /**
     * Get the database connection
     * @returns The database connection
     */
    public get() : any{
        return this.db;
    }


}