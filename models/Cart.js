import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId:String,
    name:String,
    image:String,
    price:Number,
    quantity:Number,
    totalPrice:Number,
});


const cartSchema = new mongoose.Schema({
    userId: String,
    products: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema);