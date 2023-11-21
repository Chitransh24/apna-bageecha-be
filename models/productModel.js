const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    isActive: { type: Boolean, default: true },
    imgUrl: { type: String, default: "https://placehold.co/600x400" },
    title: { type: String, required: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, required: true },
    quantity: { type: Number, default: 1 },
    isWishlisted: { type: Boolean, default: false },
    category: { type: Array, default: [] },  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
