import { DRINK_INSERT_FAILED, FOOD_INSERT_FAILED, HttpResponse } from "../config/Responses";
import Database from "../Database";

export interface IItem {
    name: string,
    price: number,
}


export default class ItemData {

    public static async drinkCreateOrUpdate(params: IItem, db: Database): Promise<String | HttpResponse> {

        // Try updating the drink if it exists
        const SQL_QUERY_UPDATE = "UPDATE drink SET price=? WHERE name=?";

        const result_update = await db.get().run(
            SQL_QUERY_UPDATE,
            params.price,
            params.name
        );

        console.log(result_update);
        

        if (result_update && result_update.changes > 0) {
            return {
                success: true,
                code: 200,
                message: "Successfully updated new drink item"
            };;
        }

        // Insert that drink
        const SQL_QUERY = "INSERT INTO drink (name,price) VALUES (?,?)";
  
        const result = await db.get().run(
            SQL_QUERY,
            params.name,
            params.price
        );

        if (!result || !result.lastID) {
            return DRINK_INSERT_FAILED;
        }

        return {
            success: true,
            code: 200,
            message: "Successfully added new drink item"
        };
    }

    public static async foodCreateOrUpdate(params: IItem, db: Database): Promise<String | HttpResponse> {

        
        // Try updating the drink if it exists
        const SQL_QUERY_UPDATE = "UPDATE food SET price=? WHERE name=?";

        const result_update = await db.get().run(
            SQL_QUERY_UPDATE,
            params.price,
            params.name
        );

        console.log(result_update);
        

        if (result_update && result_update.changes > 0) {
            return {
                success: true,
                code: 200,
                message: "Successfully updated new food item"
            };;
        }


        // Insert that food
        const SQL_QUERY = "INSERT INTO food (name,price) VALUES (?,?)";
  
        const result = await db.get().run(
            SQL_QUERY,
            params.name,
            params.price
        );

        if (!result || !result.lastID) {
            return FOOD_INSERT_FAILED;
        }

        return {
            success: true,
            code: 200,
            message: "Successfully added new food item"
        };
    }


    public static async getAllDrinks(db: Database): Promise<any> {
            
        const SQL_QUERY = "SELECT * FROM drink";

        const result = await db.get().all(
            SQL_QUERY
        );

        return result;
    }

    
    public static async getAllFood(db: Database): Promise<any> {
                
        const SQL_QUERY = "SELECT * FROM food";

        const result = await db.get().all(
            SQL_QUERY
        );

        return result;
    }
}
