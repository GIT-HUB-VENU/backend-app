// const productModel = [
//   {id: 1,name: "Product 1",price: 19.99},
//   {id: 2,name: "Product 2",price: 29.99},
//   {id: 3,name: "Product 3",price: 39.99}
// ];
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productModel = mongoose.model("Product", productSchema);        
export default productModel;