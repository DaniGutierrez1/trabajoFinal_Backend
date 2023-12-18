import { productsDao } from "../constants/index.js"

export class ProductsService{
    static getProducts = async()=>{
        return await productsDao.get()

    };

    static getProduct = async(id)=>{
        return await productsDao.getById(id)
    };

    static createProduct = async(productInfo)=>{
        return await productsDao.save(productInfo)
    };

    static deleteProduct = async(id)=>{
        return await productsDao.delete(id)
    }
}