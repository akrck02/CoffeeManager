import { Request, Response } from "express";
import { HttpResponse, INCORRECT_CREDENTIALS, MISSING_PARAMETERS } from "../config/Responses";
import UserData from "../data/UserData";
import Database from "../Database";
import CryptoService from "./CryptoService";

export default class UserService {

    /**
     * Login into the app 
     * @param req The HTTP Request
     * @param res The HTTP Response
     * @param database The database connection
     * @returns The login data or the generated errors.
     */
    public static async login(req : Request, res : Response, database : Database){   
        
        let params = {
            username : req.body.username,
            password : CryptoService.oneWayEncrypt(req.body.password),
            device : req.body.device 
        }

        // Check the given parameters and if they're missing, return,
        if(!params.username || !params.password || !params.device) {
            return MISSING_PARAMETERS;
        }

        // Check login on database
        const login = await UserData.login(params,database);
        if(typeof login !== "string") {
            return login;
        }

        // Return login data
        return {
            success: true , 
            message : "Login done successfully.", 
            token : login,
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
    public static async register(req : Request, res : Response, database : Database) {  
       
        let params = {
            username : req.body.username,
            password : CryptoService.oneWayEncrypt(req.body.password),
            device : req.body.device
        }

        // Check given parameters and if they're missing, return 
        if(!params.username || !params.password) {
            return MISSING_PARAMETERS;
        }

        const register = await UserData.register(params,database);

        // If register already exists return the response
        if(typeof register !== "string"){
            return register;
        }

        // If everything is fine, return register data.
        const token = register;
        return {
            success: true , 
            message : "Registered successfully.", 
            token : token,
            code: 200
        };
    }


}