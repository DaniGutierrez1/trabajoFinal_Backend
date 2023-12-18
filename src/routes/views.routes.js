import { Router } from "express";
import { ProductManager } from "../dao/managers/fileSystem/productsFiles.js";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";

import { usersMongo } from "../dao/managers/mongo/userMongo.js";
import { checkUserAuthenticated, showLoginView } from "../middlewares/auth.js";

import { viewsController } from "../controllers/views.controller.js";



const usersDao=new usersMongo()
export const productsDao = new ProductManager('products.json')
export const productServiceDB = new ProductsMongo('products.json')

const router = Router();

router.get("/",viewsController.renderHome);
router.get("/realtimeproducts",(req,res)=>{
    res.render("realTimeProducts")
});
router.get("/registro",showLoginView,viewsController.renderSignup)
router.get("/login",showLoginView,viewsController.renderLogin)
router.get("/cambio-contraseña",(req,res)=>{
    res.render("changePassword")
});
router.get("/forgot-password",viewsController.renderForgot)
router.get("/reset-password",viewsController.renderResetPass)
router.get("/perfil",checkUserAuthenticated,viewsController.renderProfile)

/*
const user = await usersDao.getByEmail(user.email,{lean:true})
Esta linea de codigo iria dentro del router.get para perfil 
*/


router.get("/products",viewsController.renderProduct);

export {router as viewsRouter}