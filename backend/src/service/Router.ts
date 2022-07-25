import { Request, Response } from "express";
import { PONG } from "../config/Responses";
import Database from "../Database";
import IApiFunctionSet from "../lib/IApiFunctionSet";
import UserService from "./UserService";

export default class Router {

    public static VERSION = "1";
    public static PREFIX = "api"; 
    public static API = `/${Router.PREFIX}/v${Router.VERSION}/`;

    private constructor(){}

    /**
     * Start the router service
     * @param db The database name 
     */
    public static async start(db : string = "coffee") {

        const database = new Database(db);
        await database.open();
        await database.updateTables();

        const paths : IApiFunctionSet = {
            "ping": () => PONG,
            "login" : this.ApiEndpoint(UserService.login, database),
            "register" : this.ApiEndpoint(UserService.register, database),
        }

        return paths;

    }

    /**
     * Create an API endpoint from given function
     * @param fn The given function
     * @param db The current database
     * @returns The converted function into an HTTP API endpoint
     */
    private static ApiEndpoint(fn : (req : Request, res : Response, database : Database) => any, db: Database) : (req : Request, res : Response) => any{
        return (req,res) => fn(req,res,db);
    }



}