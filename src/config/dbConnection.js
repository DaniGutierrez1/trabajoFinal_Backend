import mongoose from "mongoose";
import { config } from "./config.js";
import { CustomError } from "../services/error/customError.service.js";
import { EError } from "../enums/EError.js";


export const connectDB=async()=>{
    try {
        await mongoose.connect(config.mongo.url);
        console.log("Base de datos conectada");
    } catch (error) {
        CustomError.createError({
            name:" error Database connection",
            message:`Error al conectar la base de datos ${error.message}`,
            errorCode:EError.DATABASE_ERROR
        })
        console.log(`Error al conectar la base de datos ${error.message}`);
    }
}