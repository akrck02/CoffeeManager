import { Api } from "./Api";

async function startHttp() {
    const api = new Api();
    api.start();
}


startHttp();
