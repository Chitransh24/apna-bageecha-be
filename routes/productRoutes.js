const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  getAllProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();
router.get("/products", getAllProducts);
router.post("/product/addProduct", protect, addProduct);
router.post("/getProduct/:id", getSingleProduct);
router.put("/updateProduct/:id", updateProduct);

module.exports = router;
