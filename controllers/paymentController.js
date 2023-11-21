const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
const payment = asyncHandler(async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity
        };
      }),
      success_url:"http://localhost:5000/",
      cancel_url:"http://localhost:5000/product"
    });

    res.json({url:session.url})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
});

module.exports = { payment };
