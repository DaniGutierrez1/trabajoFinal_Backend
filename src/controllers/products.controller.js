import { ProductsService } from "../services/product.service.js";
import { EError } from "../enums/EError.js";
import { CustomError } from "../services/error/customError.service.js";
import { FindIdErrorMsg } from "../services/error/createUserError.service.js";

export class ProductsController{
    static getProducts= async(req,res)=>{
        try {
            const limit = req.query.limit;
            const products = await ProductsService.getProducts();
            if(limit){
                
                res.json({status:"succes",data:products.lenght==limit})
            }else{
                
                res.json({status:"succes", data:products})
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static getProduct = async (req,res)=>{
        try {
            const id = req.body;
            const productSearch = await ProductsService.getProduct(id);
            if(id){
                
                res.json({status:"succes",data:productSearch, message:"El producto ha sido encontrado"})
            }else{
                CustomError.createError({
                    name:"error FindID",
                    cause:FindIdErrorMsg(),
                    message: "No existe el ID",
                    errorCode: EError.ID_ERROR
                });
                //res.json({status:"error", message:"El id no existe"})
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static createProduct = async(req,res)=>{
    
        try {
            const productInfo=req.body;
            productInfo.owner= req.user._id;
            const productCreated = await ProductsService.createProduct(productInfo);
            res.json({status:"succes", data:productCreated, message:"El producto ha sido creado"});
        } catch (error) {
            CustomError.createError({
                    name:"error createProduct",
                    message:"No fue posible crear el producto",
                    errorCode:EError.PRODUCT_ERROR
                });
            //res.json({status:"error", message:error.message});
        }
        
    };

    static updateProduct = async(req,res)=>{
    
    
        //Actualizar producto
    };

    static deleteProduct =async(req,res)=>{
        try {
            const productId = req.params.pid;
            const product = await ProductsService.getProduct(productId)
            if(req.user.role ==="premium" && product.owner.toString()===req.user._id.toString() || req.user.role === "admin"){
                await ProductsService.deleteProduct(productId)
                return res.json({status:"success", message:"El producto ha sido eliminado correctamente"})
            }else{
                return res.json({status:"error", message:"No tienes el permiso para esta accion"})
            }
        } catch (error) {
            res.json({status:"error", message:error.message})
        }
    
    };
        
    
}