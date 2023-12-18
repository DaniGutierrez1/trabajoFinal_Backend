import mongoose from "mongoose";
//import { cartsCollection ,productsCollection } from "../../constants/index.js";

const cartsCollection="carts"

const cartsSchema = new mongoose.Schema({
    cartName:{
        type:String,
        required:true,
        unique:true,

    },
    cartProducts:{
        type:[
            
            {   
                quantify:{
                    type:Number,
                    default:1
                },
                productId:{
                    type:mongoose.Types.ObjectId,
                    ref: "products"

                },
            }
        ],
        default:[]
    },
})

export const cartsModel = mongoose.model(cartsCollection,cartsSchema)