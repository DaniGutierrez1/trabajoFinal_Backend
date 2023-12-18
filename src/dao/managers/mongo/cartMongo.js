import { cartsModel } from "../../models/carts.model.js";

export class CartMongo{
    constructor(){
        this.model = cartsModel;
    };

    async get(){
        try {
            const carts= await this.model.find().lean();
            return carts
        } catch (error) {
            throw new error("El carrito no pudo encontrarse") ;
        }
    };


    async save (cart){
        try {
            const cartCreated = await this.model.create(cart);
            return cartCreated 
        } catch (error) {
            throw error
        }
    };

    async getById(cartId){
        try {
            const cart = await this.model.findById(cartId).lean();
            return cart;
        } catch (error) {
            throw new error("No se encontró el ID del producto ");
        }
    };
    
    async addCart(products){
        try {
            let cartData={};
            if(products && products.lenght >0){
                cartData.products=products;
            }
            const cart = await this.model.create(cartData);
            return cart
        } catch (error) {
            console.log(error.message);
        }
    };

    async update(cartId,cart){
        try {
            const cartUpdated = await this.model.findByIdAndUpdate(cartId,cart,{new:true})
            return cartUpdated
        } catch (error) {
            console.log(error.message)
        }
    };
}