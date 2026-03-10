import express from "express"
import { getProducts , addProductForm , addProduct } from "../controllers/productController.js";
const productRouter = express.Router()

productRouter.get("/",getProducts)
productRouter.get("/add",addProductForm)
productRouter.post("/add",addProduct)

export {productRouter};