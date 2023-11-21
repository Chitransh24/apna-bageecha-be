const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  getAllProducts,
  addProduct,
  getSingleProduct,
  addToCart,
  addToWishlist,
  getCartItems,
  getWishItems,
} = require("../controllers/productController");

const router = express.Router();
router.get("/products", getAllProducts);
router.post("/product/addProduct", protect, addProduct);
router.post("/getProduct/:id", getSingleProduct);
router.post("/addToCart/:id", protect, addToCart);
router.patch("/addToWishList/:id", protect, addToWishlist);
router.get("/getCart", protect, getCartItems);
router.get("/getWishList", protect, getWishItems);
module.exports = router;
