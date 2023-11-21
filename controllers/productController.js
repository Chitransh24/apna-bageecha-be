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
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    return res.status(200).json({ product: product });
  }
});
const addToCart = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }
    const product = await Product.findById({ _id: req.params.id });
    {
      if (product) {
        const cartItem = user.cartItems.find(
          (item) => item.product.toString() === req.params.id
        );
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          user.cartItems.push({ product: req.params.id });
        }
        const newUser = await user.save();
        res.status(200).json({ newUser: newUser });
      } else {
        res.status(400);
        throw new Error("Product not Found");
      }
    }
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      return res.status(500).json({ message: "user not found" });
    }
    const product = await Product.findById({ _id: req.params.id });
    if (product) {
      if (
        user.wishListed.some(
          (item) => item.product.toString() === req.params.id
        )
      ) {
        return res.json({ message: "product already in wishlist" });
      } else {
        user.wishListed.push({ product: req.params.id });
      }
      const newUser = await user.save();
      return res.status(200).json({ message: "added to wishlist", newUser });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
const getCartItems = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).populate(
      "cartItems.product"
    );
    if (user.cartItems.length > 0) {
      let cartItems = user.cartItems;
      return res.status(200).json({ message: "get cartItems", cartItems });
    } else {
      return res.json({ message: "no items to display" });
    }
  } catch (err) {}
});
const getWishItems = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate(
      "wishListed.product"
    );
    if (user) {
      let wishItems = user.wishListed;
      return res.status(200).json({ message: "wishlist", wishItems });
    } else {
      return res.status(500).json({ message: "unauthorized" });
    }
  } catch (err) {
    return res.status(500);
  }
});

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  addToCart,
  addToWishlist,
  getCartItems,
  getWishItems,
};
