import dotenv from "dotenv";
import { __dirname } from "../utils.js";
dotenv.config();

export const config = {
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    github:{
        clientId: process.env.GITCLIENT,
        secretId: process.env.GITSECRET,
        callbackUrl: process.env.GITCALLBACK
    }
}

/*
export const config = {
    server:{
        port: 8080,
        secretSession: "sessionSecretKey"
    },
    mongo:{
        url:"mongodb+srv://Eduardo:8OlSRq8ep7hp7ueX@backendcoder.1qacdwm.mongodb.net/ecommerce?retryWrites=true&w=majority"
    },
    github:{
        clientId: "Iv1.81c3950ebb2543c0",
        secretId: "929be2ef875aec4816e603fe301afd98fdae5a0d",
        callbackUrl: "http://localhost:8080/api/sessions/github-callback"
    }
}
*/