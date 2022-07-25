import { ViewCore } from "../../lib/gtdf/views/ViewCore.js"
import { UserService } from "../../services/UserService.js"

export default class LoginCore implements ViewCore {


    public static async login(){

        const res = await UserService.login("irati","0810");
        res.json();
        console.log(res);
        
    }


}