import { signJWT, verifyJWT } from "../utils/Jwt";
require('dotenv').config();

const md5 = require("md5");

export default class CryptoService {

    private constructor(){}
    private static SECRET = process.env.SECRET;

    /**
     * Generate a unique user token based on JWT (JSON Web Token)
     * @param username The app user
     * @param password The user login pasword
     * @returns The generated token
     */
    public static generateUserToken(username : string, password : string) : string {

        const now = new Date().getMilliseconds();        
        const data = {
            now : now,
            username : username,
            password : password
        };

        return signJWT(data, CryptoService.checkSecret());
    }

    /**
     * Get the data inside the token for checkings
     * @param token The token
     * @returns The token data 
     */
    public static getTokenData(token : string) {
        return verifyJWT(token, CryptoService.checkSecret())
    }

    /**
     * Generate a token for a giver user device
     * @param userToken The user token
     * @param deviceAddr The device IP address
     * @returns The generated unique device token
     */
    public static generateDeviceToken(userToken : string, deviceAddr : string) : string {
        
        const now = new Date().getMilliseconds();
        const data = {
            now : now,
            userToken : userToken,
            deviceAddr : deviceAddr,
        }

        const deviceToken = signJWT(data, CryptoService.checkSecret());
        return deviceToken;
    }

    /**
     * Encrypt a text with a one way hashing algorythm
     * @param text The texThe encrypted text
     */
    public static oneWayEncrypt(text : string) {
        return md5(text);
    }

    /**
     * Check for the cryptography secret
     * @returns The secret 
     */
    public static checkSecret(){
        if(!CryptoService.SECRET){
            throw new Error("The cryptography secrets are missing");
        }
        return CryptoService.SECRET;
    }

}