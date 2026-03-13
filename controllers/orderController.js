import orderModel from "../models/orderModel.js";

// GET all orders
const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("products.productId", "name price")
      .populate("user", "name email");
    res.json(orders); // <- send JSON instead of rendering HTML
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST place order
const placeOrder = async (req, res) => {
  try {
    const body = req.body;
    const newOrder = await orderModel.create(body);
    res.status(201).json(newOrder); // <- send created order as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// DELETE order
const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await orderModel.findByIdAndDelete(id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};

// GET single order
const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderModel.findById(id)
      .populate("products.productId", "name price")
      .populate("user", "name email");
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order not found" });
  }
};

// PUT update order
const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await orderModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order" });
  }
};

export { getOrders, placeOrder, deleteOrder, getOrderById, updateOrder };