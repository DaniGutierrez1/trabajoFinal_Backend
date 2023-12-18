import { usersDao } from "../constants/index.js";
import passport from "passport";
import { UsersService } from "../services/users.service.js";
import { generateEmailToken, recoveryEmail} from "../helpers/gmail.js"
import { validateToken , createHash } from "../utils.js";


export class SessionController{
    static renderRegister=async(req,res)=>{
        passport.authenticate("signupStrategy",{
            failureRedirect:"/api/sessions/fail-signup"
        }),(req,res)=>{
            res.render("login",{message:"usuario registrado"})
        }
    };

    static renderLogin=async(req,res)=>{
        passport.authenticate("loginStrategy",{
            failureRedirect:"/api/sessions/fail-login"
        }),(req,res)=>{
            res.redirect("/perfil")
        }
    };

    static renderFailSignup=async(req,res)=>{
        res.render("signup",{error:"No se pudo registrar el usuario"})
    };

    static renderFailLogin=async(req,res)=>{
        res.render("login",{error:"Credenciales invalidas"})
    };

    static forgotPassword=async(req,res)=>{
        try {
            const {email}=req.body;
            const user = await UsersService.getUserByEmail(email);
            if(!user){
                return res.json({status:"error",message:"No es posible restablecer la contraseña"});
            }
            const token= generateEmailToken(email,5*60);
            await recoveryEmail(req,email,token);
            res.send("Correo enviado");
        } catch (error) {
            res.json({status:"error", message:"No es posible restablecer la contraseña"})
        }
    }

    static resetPassword=async(req,res)=>{
        try {
            const token =req.query.token;
            const {newPassword}=req.body;
            const validEmail = validateToken(token);
            if(validEmail){
                const user= await UsersService.getUserByEmail(validEmail);
                if(user){
                    user.password= createHash(newPassword);
                    await UsersService.updateUser(user._id,user);
                    res.send("Contraseña actualizada correctamente <a href='/login'>Ir a inicio</a> ")
                }
            }else{
                return res.send("Token caducado,genera uno nuevo <a href='/forgot-password'></a>");
            }
            
        } catch (error) {
            res.send("No se pudo restablecer la contraseña,intenta nuevamente <a href='/forgot-password'></a>")
        }
        
        //res.render("resetPassword",{token});

    }

    static renderChangePassword=async(req,res)=>{
        try {
            const form=req.body;
            const user = await usersDao.getByEmail(form.email);
            if(!user){
                return res.render("changePassword",{error:
                "No se pudo cambiar la contraseña"})
            }
            user.password=createHash(form.newPassword);
            await usersDao.update(user._id,user);
            return res.render("login", {message:"Contraseña restaurada"});
        } catch (error) {
            res.render("changePassword",{error:error.message});
        }
    };

    static renderLoginGithub=async(req,res)=>{
        passport.authenticate("githubLoginStrategy")
    }

    static renderLoginGithubCallback=async(req,res)=>{
        passport.authenticate("githubLoginStrategy",{
            failureRedirect:"/fail-signup"
        }),(req,res)=>{
            res.render("profile")
        }
    }

    static renderLogout = (req,res)=>{
        req.logOut(error=>{
            if(error){
                return res.render("profile",{user: req.user, error: "No se pudo cerrar la sesión"})
            }else{
            
               const user = req.user;
               user.last_connection = new Date();
                UsersService.updateUser(user._id,user);
               req.session.destroy(error=>{
                    if(error)return res.render("profile",{user: req.session.userInfo, error: "No se pudo cerrar la sesión"})
                    res.redirect("/login");
                })
            }
        })
    };
}