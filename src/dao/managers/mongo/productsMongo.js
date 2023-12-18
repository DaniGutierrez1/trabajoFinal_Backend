import mongoose from "mongoose";

import {productsModel} from "../../models/products.model.js";

export class ProductsMongo{
    constructor(){
        this.model=productsModel;
    };

    
    async get(){
        try {
            const products = await this.model.find().lean();
            return products;
        } catch (error) {
            console.log(error.message);

            throw new error("No se encuentran los productos")
        }
    };

    async getPaginate(query,options){
        try {
            const productsPaginate = await this.model.paginate(query,options);
            return productsPaginate
        } catch (error) {
            throw error
        }
    }

    async getById(id){
        try {
            const product = await this.model.findById(id).lean();
            return product;
        } catch (error) {
            throw new error("No se encontró el ID del producto ");
        }
    };

    async save(productInfo){
        try {
            const productCreated = await this.model.create(productInfo);
            return productCreated;

        } catch (error) {
            console.log(error.message);

            throw new error("No pudo crearse el producto")
        }
    };


}