const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const addProduct = asyncHandler(async (req, res) => {
  const {
    isActive,
    imgUrl,
    title,
    description,
    price,
    quantity,
    isWishlisted,
    category
  } = req.body;
  if (!title || !description || !price) {
    res.status(400);
    throw new Error(`Title, Description, Price are mandatory`);
  }
  const productExists = await Product.findOne({ title });
  if (productExists) {
    res.status(400);
    throw new Error("Product already exists.");
  }
  const product = await Product.create({
    isActive,
    imgUrl,
    title,
    description,
    price,
    quantity,
    isWishlisted,
    category
  });
  if (product) {
    res.status(201).json({
      _id: product._id,
      title: product.title,
      isActive: product.isActive,
      imgUrl: product.imgUrl,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      isWishlisted: product.isWishlisted,
      category: product.category,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create this product, Try again!");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  if (product) {
    return res.status(200).json({ products: product });
  } else {
    return res.status(400).json({ message: "no products" });
  }
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  if (product) {
    return res.status(200).json({ product: product });
  }
  else{
    res.status(404);
    throw new Error("Product not found")
  }
});


module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
};
