const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { getAllProducts, addProduct } = require("../controllers/productController");

const router = express.Router();
router.get('/allProducts',getAllProducts)
router.post("/addProduct",protect, addProduct);
module.exports = router;
