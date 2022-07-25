import { Config } from "../config/Config.js";
import { HTTPS_METHOD } from "../lib/gtd/core/http.js";
import { efetch } from "../lib/gtd/data/easyfetch.js";

export class UserService {

    private constructor() {}

    public static login(username : string, password : string) {
        const response = efetch({
            method: HTTPS_METHOD.POST,
            url: Config.API.LOGIN,
            parameters: {
                username: username,
                password: password,
                device : "0.0.0.0"
            },
        });

        return response;
    }


    public static register() {



    }


}