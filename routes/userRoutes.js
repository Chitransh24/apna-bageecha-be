const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  allUsers,
  registerUser,
  authUser,
} = require("../controllers/userControllers");
const { allProducts, addProduct } = require("../controllers/productController");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.get('/products',allProducts)
router.post('/addProduct',addProduct)
module.exports = router;
