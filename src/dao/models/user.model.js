import mongoose from "mongoose";

const usersCollection = "users";

const userSchema= new mongoose.Schema({
    first_name:{
        type:String,
    },
    last_name:String,
    email:{
        type:String,
        required:true
    },
    age:Number,
    password:{
        type:String,
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts"
    },
    role:{
        type:String,
        required: true,
        enum:["user","admin","premium","superadmin"],
        default:"user"
    },
    documents:{
        type:[
            {
                name:{
                    type: String,
                    required:true
                },
                reference:{
                    type: String,
                    required: true
                }
            }
        ],
        default:[]
    },
    last_connection:{
        type: Date,
        default: null
    },
    status:{
        type: String,
        enums:["pendiente","incompleto","completo"],
        default: "pendiente"
    },
    avatar:{
        type: String,
        required:true 
    }

});

export const usersModel = mongoose.model(usersCollection,userSchema);