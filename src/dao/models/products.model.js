import mongoose from "mongoose";
//import { productsCollection } from "../../constants/index.js";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection="products";

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["Perifericos","Componentes","Sillas gamer"]
    },
    stock:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
});

productSchema.plugin(mongoosePaginate);

export const productsModel=mongoose.model(productsCollection,productSchema); 