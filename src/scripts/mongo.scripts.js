//Scrip para actualizar informacion de los productos

import mongoose from "mongoose";
import { productsModel } from "../dao/models/products.model.js";
import {config} from "../config/config.js"

const updateProducts = async()=>{
    try {
        await mongoose.connect(config.mongo.url);
        const adminId="34w415123123"
        const result= await productsModel.updateMany({},{$set:{owner:adminId}})
        console.log(result)
    } catch (error) {
        console.log(error)
    }finally{
        await mongoose.connection.close()
    }
}
updateProducts()