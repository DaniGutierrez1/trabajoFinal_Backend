import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/product.service.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/error/customError.service.js";
import { FindIdErrorMsg,productErrorMsg } from "../services/error/createUserError.service.js";



export class CartController{
    static RenderCart = async(req,res)=>{
        try {
            const cartCreated = await CartsService.getCarts()
            res.json({status:"succes",data:cartCreated})
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static createCart = async(req,res)=>{
        try {
            const cartInfo={};
            const cartCreated=await CartsService.createCart(cartInfo)
            res.json({status:"succes",data:cartCreated})
        } catch (error) {
            res.json({status:"error",message:"Ups, no pudo crearse el carrito"});
        }
    };

    static getCart = async(req,res)=>{ 
        try {
            const cart = await CartsService.getCarts()
            res.json({status:"succes", data:cart})
        } catch (error) {
            CustomError.createError({
                name:"error FindID",
                cause:FindIdErrorMsg(req.body),
                message: "No existe el ID",
                errorCode: EError.CART_ERROR
            });
            //res.json({status:"error", message:error.message});
        }
    };

    static AddProductToCart= async(req,res)=>{
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
            const cart = await CartsService.getCart(cartId);
            const product = await ProductsService.getProduct(productId)
            const productExist = cart.products.find(product=>product.productIdd ===productId);
            if(!productExist){
                CustomError.createError({
                    name:"error addProduct",
                    cause:productErrorMsg(req.body),
                    message:"Producto inexistente o sin stock",
                    errorCode:EError.PRODUCT_ERROR
                });

                //console.log("No se encuentra este producto")
            }
            
            const newProduct ={
                productId:productId,
                quantify:1
            }
            cart.products.push(newProduct)

            const cartUpdated= await CartsService.updateCart(cartId,cart)
            res.json({status:"success",data:cartUpdated})
        } catch (error) {
            
        }

    }
}