import express from "express";
import { getOrders, placeOrder, deleteOrder, getOrderById, updateOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", getOrders); // GET all orders
orderRouter.post("/place", placeOrder); // POST place order
orderRouter.get("/:id", getOrderById); // GET single order
orderRouter.put("/:id", updateOrder); // PUT update order
orderRouter.delete("/:id", deleteOrder); // DELETE order

export default orderRouter;