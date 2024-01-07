import { UsersService } from "../services/users.service.js"

export class UsersController{
    static modifyRole=async(req,res)=>{
        try {
            const userId=req.params.uid;
            const user=await UsersService.getUserById(userId);
            const userRole=user.role;
            
            //Validacion para pasar al usuario a premium
            if(user.documents.length>=3 && user.status === "completo"){
                if(userRole==="user"){
                    user.role="premium";
                }else if(userRole ==="premium"){
                    user.role="user";
                }else{
                    res.json({status:"error",message:"No se puede cambiar el rol de este usuario"})
                }
                await UsersService.updateUser(user._id,user);
                res.json({status:"success",message:`El nuevo rol del usuario es ${user.role}`});
            }else{
                res.json({status:"error",message:"El usuario no ha cargado todos los documentos"});
            }
        } catch (error) {
            res.json({status:"error",message:error.message})
        }
    };

    static uploadDocuments =async(req,res)=>{
        try {
            const userId=req.params.uid;
            const user = await UsersService.getUserById(userId);
            const identificacion = req.files?.identificacion?.[0] || null;
            const domicilio = req.files?.domicilio?.[0] || null;
            const estadoDeCuenta = req.files?.estadoDeCuenta?.[0] || null;
            const docs =[];
            if(identificacion){
                docs.push({name:"identificacion",reference:identificacion.filename});
            };
            if(domicilio){
                docs.push({name:"domicilio",reference:domicilio.filename});
            }
            if(estadoDeCuenta){
                docs.push({name:"estadoDeCuenta",reference:estadoDeCuenta.filename});
            }
            user.documents=docs ;
            if(docs.length === 3){
                user.status="completo"
            }else{
                user.status="incompleto"
            }
            const result = await UsersService.updateUser(user._id,user);
            res.json({status:"success",data:result});
        } catch (error) {
            console.log(error.message)
            res.json({status:"error",message:"No se pudieron cargar los documentos"});
        }
    }
}