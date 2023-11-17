const mongoose = require("mongoose");
const Product=require('./productModel')
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdribbble.com%2Fsearch%2Fprofile-image-placeholder&psig=AOvVaw2cpi5MWy_AuIxbFAN3elE2&ust=1698784145569000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMiWy57OnoIDFQAAAAAdAAAAABAE",
    },
    cartItems: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity:{type:Number,default:1}
      },
    ],
    wishListed:[
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
      }
    ]
  },
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
