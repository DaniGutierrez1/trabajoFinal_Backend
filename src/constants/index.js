export const productsCollection = "products";
export const cartsCollection = "carts"
import { connectDB } from "../config/dbConnection.js";
import { ProductsMongo } from "../dao/managers/mongo/productsMongo.js";
import { ticketsMongo } from "../dao/managers/mongo/ticketsMongo.js";
import { CartMongo } from "../dao/managers/mongo/cartMongo.js";
import { usersMongo } from "../dao/managers/mongo/userMongo.js";

connectDB();
export const usersDao = new usersMongo()
export const ticketsDao= new ticketsMongo()
export const productsDao = new ProductsMongo();
export const cartDao = new CartMongo();