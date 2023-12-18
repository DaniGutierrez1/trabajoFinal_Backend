import { __dirname } from "../utils.js"
import path from "path";
import fs from "fs"

export class CartManager{
    constructor(fileName){
        this.path=path.join(__dirname,`/files/${fileName}`)
    }

    fileExist(){
        return fs.existsSync(this.path);
    }
    
    async getAll(){
        try {
            if(this.fileExist()){
              const content = await fs.promises.readFile(this.path,"utf-8");
              const carts = JSON.parse(content);
              return carts
            }else{
                throw new Error("No se pueden obtener los carritos")
            }    
        } catch (error) {
            throw error;
        }
    };

    async save(){
        try {
            if(this.fileExist()){
              const content = await fs.promises.readFile(this.path,"utf-8");
              const carts = JSON.parse(content);
              let newID=1;
              if(carts.length>0){
                newID=carts[carts.length-1].id+1;
              }
              const newCart={
                id:newID,
                products:[]
              };
              carts.push(newCart);
              await fs.promises.writeFile(this.path,JSON.stringify(carts,null,'\t'));
              return newCart;
            }else{
                throw new Error("Accion no posible")
            }    
        } catch (error) {
            throw error;
        }
    };

    async update(cartID,productID){
        
    }
}