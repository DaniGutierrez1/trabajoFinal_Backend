import { ticketsService } from "../services/tickets.service.js";
import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/product.service.js";

export class TicketsController{
    
    static async createTicket(req,res){
        try {
            const cartId=req.params.cid;
            const cart= await CartsService.getCart(cartId)
            const productsCart = cart.products;
            let purchaseProducts=[];
            let rejectProducts=[];
            for(let i=0; i<productsCart.length;i++){
                const product = ProductsService.getProduct(productsCart[i].productId)

                // Validar el stock que tiene cada producto y enviarlo al arreglo que corresponda si la condicion se cumple o no. Tambien restar del stock la cantidad que vamos a comprar 
            };
            const newTicket={
                code,
                purchase_dateTime:new Date(),
                amount,
                purchaser,

            }
            const ticketCreated= await ticketsService.createTicket(newTicket)
        } catch (error) {
            res.json({status:"error",message:error.message})
        }
    }
}