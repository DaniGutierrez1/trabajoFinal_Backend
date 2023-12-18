import { productsDao ,productServiceDB} from "../routes/views.routes.js";


export class viewsController{
    static renderHome=async(req,res)=>{
        const products = await productsDao.get();
        res.render("home",{products})
    };

    static renderSignup =(req,res)=>{
        res.render("signup");
    };

    static renderLogin = (req,res)=>{
        res.render("login");
    };

    static renderProfile = (req,res)=>{
        res.render("profile",{user:JSON.parse(JSON.stringify(req.user))});
    };
    
    static renderForgot = async(req,res)=>{
        res.render("forgotPassword")
    };

    static renderResetPass=(req,res)=>{
        const token=req.query.token;
        res.render("resetPassword",{token})
    }

    static renderProduct = async (req,res)=>{
        try {
            const {limit=5,page=1,stock,sort="asc"} = req.query
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            if(!["asc","desc"].includes(sort)){
                return res.render("products", {error:"Orden no valido"})
            }
        
            const sortValue = sort === "asc" ? 1: -1 ;
            let query ={};
            if(stockValue){
                query={stock:{$gte:stockValue}}
            }
        
            const products = await productServiceDB.getPaginate(query,{
                page,
                limit,
                sort:{price:sortValue},
                lean:true,
            });
            console.log(products)
            const baseUrl=`${req.protocol}://${req.get("host")}${req.originalUrl}`
            
            const resultProductsView = {
                status : "succes",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                netPage:products.nextPage,
                page:  products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage?`${baseUrl.replace(`page=${products.page}`,`page=${products.prevPage}`)}`:null,
                nextLink:products.hasNextPage?`${baseUrl.replace(`page=${products.page}`,`page=${products.nextPage}`)}`:null,
                
                
            }
            
            res.render("products",resultProductsView)
            console.log(resultProductsView)
        } catch (error) {
            throw error
        }
    
    };
}