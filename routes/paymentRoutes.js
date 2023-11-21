const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { payment } = require("../controllers/paymentController");


const router = express.Router();
router.post('/checkout',payment)


module.exports = router;
