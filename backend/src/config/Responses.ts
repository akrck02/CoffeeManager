export interface HttpResponse {
    success: boolean
    message: string 
    code : number
}

export const PONG = new Promise((r) => r({
    success: true , 
    message : "pong", 
    code: 200
}));

export const MISSING_PARAMETERS = new Promise<HttpResponse>((r) => r({
    success: false, 
    message:"Missing parameters.", 
    code : 400
}));

export const INCORRECT_CREDENTIALS = new Promise<HttpResponse>((r) => r({
    success: false, 
    message:"Incorrect credentials.", 
    code : 403
}));

export const USER_ALREADY_EXISTS = new Promise<HttpResponse>((r) => r({
    success: false, 
    message:"User already exists.", 
    code : 409
}));


export const USER_REGISTER_FAILED = new Promise<HttpResponse>((r) => r({
    success: false, 
    message:"The user cannot be registered right now, try again later.", 
    code : 500
}));

export const TOKEN_INSERT_FAILED = new Promise<HttpResponse>((r) => r({
    success: false, 
    message:"The token insertion failed.", 
    code : 500
}));

export const TOKEN_UPDATE_FAILED = new Promise<HttpResponse>((r) => r({
    success: false, 
    message:"The token update failed.", 
    code : 500
}));

export const TOKEN_UPDATE_SUCCESS = new Promise<HttpResponse>((r) => r({
    success: true, 
    message:"The token insertion succeded.", 
    code : 200
}));



