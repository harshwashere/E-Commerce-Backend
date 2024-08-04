import express from "express";
import { register, login, user } from "../controllers/auth-controller.js";
import { product } from "../controllers/product-controller.js";
import { getOrder, postOrder } from "../controllers/order-controller.js";
import { getCart, postCart, delCart } from "../controllers/cart-controller.js";
import { protect } from "../middleware/authMiddleware.js";
export const route = express.Router()

route.post('/register', register)
route.post('/login', login)
route.post('/cart', protect, postCart)
route.post('/order', protect, postOrder)
route.get('/product', product)
route.get("/user", protect, user);
route.get('/order/:id', protect, getOrder)
route.get('/cart', protect, getCart)
route.delete('/cart/:id', protect, delCart)
