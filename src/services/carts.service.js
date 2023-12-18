import {cartDao} from "../constants/index.js"

export class CartsService{
    static getCarts=async()=>{
        return await cartDao.get();
    }
    
    static createCart = async(cartInfo)=>{
        return await cartDao.save(cartInfo);
    };

    static addToCart= async(products)=>{
        return await cartDao.addCart(products);
    };

    static getCart = async(cartId)=>{
        return await cartDao.getById(cartId);

    };

    static updateCart=async(cartId,cart)=>{
        return await cartDao.update(cartId,cart)
    }
}