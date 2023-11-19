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
const { getAllProducts, addProduct, getSingleProduct } = require("../controllers/productController");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.get('/products',getAllProducts)
router.post("/product/addProduct", protect, addProduct);
router.post('/getProduct/:id',getSingleProduct)
router.post('/addToCart/:id',protect,addToCart)
router.patch('/addToWishList/:id',protect,addToWishlist)
router.get('/getCart',protect,getCartItems)
router.get('/getWishList',protect,getWishItems)
module.exports = router;
