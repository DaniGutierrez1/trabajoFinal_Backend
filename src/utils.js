import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { config } from "./config/config.js";
import path from 'path';
import { fileURLToPath } from 'url';
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync())
};

export const isValidPassword = (userDB,password)=>{
    return bcrypt.compareSync(password,userDB.password)
};

export const validateToken =(token)=>{
    try {
        const info= jwt.verify(token,config.gmail.secretToken);
        return info.email;
    } catch (error) {
        console.log("Error con el token",error.message)
        return null
    }

}

const checkValidFields =(body)=>{
    const {first_name,email,password}=body;
    if(!first_name || !email || !password){
        return false;
    }
    return true;
}

const multerProfileFilter=(req,file,cb)=>{
    const valid = checkValidFields(req.body);
    if(valid){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const productsStorage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/products/img"))
    },
    filename: function(req,file,cb){
        cb(null,`${req.body.code}-product-${file.originalname}`)
    }
});

export const uploaderProducts=multer({storage:productsStorage});

const profileStorage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/img"))
    },
    filename: function(req,file,cb){
        cb(null,`${req.body.email}-perfil-${file.originalname}`)
    }
});

export const uploaderProfile=multer({storage:profileStorage, fileFilter:multerProfileFilter});

const documentsStorage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"/multer/users/documents"))
    },
    filename: function(req,file,cb){
        cb(null,`${req.user.email}-documento-${file.originalname}`)
    }
});

export const uploaderDocuments=multer({storage:documentsStorage});