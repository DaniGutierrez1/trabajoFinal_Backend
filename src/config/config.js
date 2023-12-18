import dotenv from "dotenv";
dotenv.config();

export const config = {
    server:{
        port: process.env.PORT,
        secretSession: process.env.SECRET_SESSION
    },
    mongo:{
        url:"mongodb+srv://Dani:DanyGutierrez913@cluster0.ovkmrpe.mongodb.net/ecommerce?retryWrites=true&w=majority",
        //url: process.env.MONGO_URL
    },
    github:{
        //clientId:process.env.CLIENTID,
        //clientSecret:process.env.CLIENTSECRET,
        //callbackUrl:process.env.CALLBACKURL,
        clientId: "Iv1.80926f1c9aa698ac",
        clientSecret:"56b0de7b4015273ecbd15dcd83c18e318b3765ee",
        callbackUrl:"http://localhost:8080/api/sessions/github-callback"
    },
    gmail:{
        account: process.env.GMAIL_SALES,
        password:process.env.GMAIL_SALES_PASSWORD,
        secretToken: process.env.SECRET_TOKEN_EMAIL
    }
} 