const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  allUsers,
  registerUser,
  authUser,
  addToCart,
  addToWishlist,
  getCartItems,
  getWishItems,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/addToCart/:id", protect, addToCart);
router.patch("/addToWishList/:id", protect, addToWishlist);
router.get("/getCart", protect, getCartItems);
router.get("/getWishList", protect, getWishItems);

module.exports = router;
