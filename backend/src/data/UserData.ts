import { HttpResponse, INCORRECT_CREDENTIALS, TOKEN_INSERT_FAILED, TOKEN_UPDATE_FAILED, TOKEN_UPDATE_SUCCESS, USER_ALREADY_EXISTS, USER_REGISTER_FAILED } from "../config/Responses";
import Database from "../Database";
import CryptoService from "../service/CryptoService";
import { Errors } from "../utils/Errors";
import Logger from "../utils/Logger";

interface ILoginParams {
    username: string,
    password: string,
    device: string
}

export default class UserData {

    /**
     * Check login into app of a user on the given database schema 
     * @param params The parameters to check 
     * @param db The database to check
     * @returns If the login is accepted
     */
    public static async login(params: ILoginParams, db: Database): Promise<String | HttpResponse> {

        const SQL_QUERY = "SELECT username, password, auth FROM user WHERE username=? and password=?";

        const result = await db.get().all(
            SQL_QUERY,
            params.username,
            params.password
        );

        // If no result was found, return.
        if (!result || result.length == 0) {
            return INCORRECT_CREDENTIALS;
        }

        const user = result[0];
        const token = CryptoService.generateDeviceToken(user.auth, params.device);

        // Insert or update token in database
        const state = await this.insertOrUpdateDeviceToken(db, user.auth, token, params.device);
        if(state.code != 200){
            return state;
        }

        // Return device token
        return token;
    }

    /**
     * Register of a user into the app database 
     * @param params The params to check
     * @param db The database to insert into
     * @returns The auth code of the new registered user
     */
    public static async register(params: ILoginParams, db: Database): Promise<string | HttpResponse> {

        const SQL_QUERY = "INSERT INTO user (username, password, auth) VALUES (?,?,?)";
        const auth = CryptoService.generateUserToken(params.username, params.password);

        try {
            const result = await db.get().run(
                SQL_QUERY,
                params.username,
                params.password,
                auth
            );


            if (!result || !result.lastID) {
                return USER_REGISTER_FAILED;
            }

            const token = CryptoService.generateDeviceToken(auth, params.device);

            // Insert or update token in database
            const state = await this.insertOrUpdateDeviceToken(db, auth, token, params.device);

            if(state.code != 200){
                return state;
            }


            // Return device token
            return token;

        } catch (err: any) {

            // If the user already exists
            if (err.errno == Errors.SQLITE_UNIQUE_CONTRAINT_VIOLATION) {
                return USER_ALREADY_EXISTS;
            }

            throw err;
        }
    }


    /**
     * Insert a new device token or if exists update it.
     * @param db The database connection
     * @param auth The user to associate the device
     * @param deviceToken The device token
     * @param address The IP address of the device
     * @returns The state of the proccess
     */
    public static async insertOrUpdateDeviceToken(db : Database , auth : string, deviceToken : string, address : string) : Promise<HttpResponse> {

        try {
            const SQL_INSERT_QUERY = "INSERT INTO user_device(auth, device, address) VALUES (?,?,?)";
            const result = await db.get().run(
                SQL_INSERT_QUERY,
                auth,
                deviceToken,
                address
            );

            if (!result || !result.lastID) {
                return TOKEN_INSERT_FAILED;
            }

        } catch(err : any) {

            // If device already exists, update it
            if(err.errno === Errors.SQLITE_UNIQUE_CONTRAINT_VIOLATION) {
                
                const SQL_UPDATE_QUERY = "UPDATE user_device SET device = ? WHERE auth = ? AND address = ?";
                const result = await db.get().run(
                    SQL_UPDATE_QUERY,
                    deviceToken,
                    auth,
                    address
                );
    
                if (!result || !result.changes) {
                    return TOKEN_UPDATE_FAILED;
                }

                return TOKEN_UPDATE_SUCCESS;
            }

            throw err;
        }

        return TOKEN_UPDATE_SUCCESS;
    }

}