import { Request, Response } from "express";
import Router from "./service/Router";
import Logger from "./utils/Logger";

const express = require('express');

export class Api {

    private static HOST = "127.0.0.1";
    private static PORT = 8029;

    private app: any;

    constructor() {
        this.app = express();
    }

    /**
     * Start the API HTTP listener 
     */
    public async start(): Promise<void> {
        const paths = await Router.start();


        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        /* CORS Control */
        this.app.use((req: Request, res: Response, next: any) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Accept-Language, Content-Language, Content-Type, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });

        /* CORS Control */
        this.app.use((req: Request, res: Response, next: Function) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Oauth, Device");
            next();
        });

        /* Define every route with callbacks */
        for (const key in paths) {
            const callback = paths[key];
            this.app.post(Router.API + key + "/", (req: Request, res: Response) => this.handleRequest(key, req, res, callback as any));
            this.app.get(Router.API + key + "/", (req: Request, res: Response) => {
                this.getParametersToBody(req);
                this.handleRequest(key, req, res, callback as any);
            })
        }

        /* Start API listener */
        this.app.listen(Api.PORT, Api.HOST);
        Logger.info(`API The CoffeeManager API is running on http://${Api.HOST}:${Api.PORT}${Router.API}`);
    }


    handleRequest(
        key: string,
        req: Request,
        res: Response,
        callback: (req: Request, res: Response) => Promise<any>
    ) {

        Logger.info(`API Request: ${Router.API}${key}/`);
        const promise = callback(req, res);

        promise.then((data) => {
            if (data.code) {
                res.statusCode = data.code;
            }
            res.send(data)
        })
        .catch((err: any) => {
            console.log("error", err);
            res.statusCode = 500;
            res.send({
                "success": false,
                "status": "failed",
                "message": err.message,
                "code": 500
            });
        });
    }

    /**
     * Convert get params to body
     * @param req The request to handle
     */
    getParametersToBody(req: Request) {
        let url = req.url;
        url = url.substring(url.lastIndexOf("?") + 1);

        const params = url.split("&");
        const body: { [key: string]: string } = {};

        params.forEach(param => {
            const parts = param.split("=");
            body[parts[0]] = parts[1];
        });

        req.body = body;
    }

}
