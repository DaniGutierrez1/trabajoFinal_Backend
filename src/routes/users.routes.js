import { Router } from "express";
import { checkRole } from "../middlewares/auth.js";
import { UsersController } from "../controllers/users.controller.js";
import { CustomError } from "../services/error/customError.service.js";
import { EError } from "../enums/EError.js";
import { createUserErrorMsg } from "../services/error/createUserError.service.js";
import { uploaderDocuments } from "../utils.js";

//PASAR TODO ESTO A SESSIONS. ES MAS FACIL YA QUE TENEMOS LOS VALIDADORES Y SOLO HACE FALTA ADAPTAR EL MANEJADOR DE ERRORES


const router = Router();
const users=[];

router.get("/",(req,res)=>{
    res.json({status:"success",data:users});
})
router.post("/",(req,res)=>{
    const{name,lastname,email}=req.body;
    if(!name || !lastname ||!email){
        CustomError.createError({
            name:"error createUser",
            cause:createUserErrorMsg(req.body),
            message:"Datos invalidos para crear el usuario",
            errorCode:EError.INVALID_JSON
        });
    };
    users.push(req.body);
    res.json({status:"success",message:"usuario creado"})
})

router.post("/premium/:uid",checkRole(["admin"]),UsersController.modifyRole)

router.put("/:uid/documents",uploaderDocuments.fields([
    {name:"identificacion",maxCount:1},
    {name:"domicilio",maxCount:1},
   {name:"estadoDeCuenta",maxCount:1}
]),UsersController.uploaderDocuments)

export { router as usersRouter};