const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  getAllProducts,
  addProduct,
  getSingleProduct,
} = require("../controllers/productController");

const router = express.Router();
router.get("/products", getAllProducts);
router.post("/product/addProduct", protect, addProduct);
router.post("/getProduct/:id", getSingleProduct);
module.exports = router;
