import express from "express"
import { getProducts , addProductForm , addProduct , deleteProduct} from "../controllers/productController.js";
const productRouter = express.Router()

productRouter.get("/",getProducts)
productRouter.get("/add",addProductForm)
productRouter.post("/add",addProduct)
productRouter.get("/:id/delete",deleteProduct)

export {productRouter};