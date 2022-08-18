import { Request, Response } from "express";
import { MISSING_PARAMETERS } from "../config/Responses";
import ItemData from "../data/ItemData";
import Database from "../Database";


export default class ItemService {

    public static async drinkUpdate(req : Request, res : Response, database : Database){   
        
        let params = {
            name : req.body.name,
            price : req.body.price,
        }

        // Check given parameters and if they're missing, return
        if(!params.name || !params.price) {
            return MISSING_PARAMETERS;
        }

        // Create new drink
        const response = await ItemData.drinkCreateOrUpdate(params, database);
        return response;

    }


    public static async foodUpdate(req : Request, res : Response, database : Database){   
        
        let params = {
            name : req.body.name,
            price : req.body.price,
        }

        // Check given parameters and if they're missing, return
        if(!params.name || !params.price) {
            return MISSING_PARAMETERS;
        }

        // Create new drink
        const response = await ItemData.foodCreateOrUpdate(params, database);
        return response;
    }


}