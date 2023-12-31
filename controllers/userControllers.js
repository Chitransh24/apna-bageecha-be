const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const Product = require("../models/productModel");

// const changePassword = asyncHandler(async (req,res)=>{
// const user = 

// })

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
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
  allUsers,
  registerUser,
  authUser,
  addToCart,
  addToWishlist,
  getCartItems,
  getWishItems,
};
