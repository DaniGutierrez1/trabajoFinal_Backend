import { Router } from "express";
import { CartController } from "../controllers/carts.controller.js"
import { TicketsController } from "../controllers/tickets.controller.js";

const router = Router();

router.get("/carts",CartController.RenderCart);
router.post("/carts",CartController.createCart);
router.get("/:cid",CartController.getCart);
router.post("/:cid/product/:pid",CartController.AddProductToCart);
router.post("/:cid/purchase",TicketsController.createTicket)

export { router as cartsRouter} 