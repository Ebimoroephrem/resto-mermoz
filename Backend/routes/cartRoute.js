import express from "express";
import { addTocart, removeFromCart, getCart } from "../controllers/cartControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addTocart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;