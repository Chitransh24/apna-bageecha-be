const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { getAllProducts, addProduct, getSingleProduct } = require("../controllers/productController");
const { addToCart } = require("../controllers/userControllers");

const router = express.Router();
router.get('/allProducts',getAllProducts)
router.post("/addProduct", protect, addProduct);
router.post('/getProduct/:id',getSingleProduct)
router.post('/addToCart/:id',protect,addToCart)

module.exports = router;
