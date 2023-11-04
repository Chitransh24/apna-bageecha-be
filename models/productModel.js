const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
  {
    isActive:{type:Boolean,default:true},
    imgUrl:{type:String,default:'https://placehold.co/600x400'},
    title:{type:String,required:true},
    description:{type:String},
    price:{type:Number,required:true},
    quantity:{type:Number},
    isWishlisted:{type:Boolean,default:false}
  },
  { timestaps: true }
);



const Product = mongoose.model("Product", productSchema);

module.exports = Product;
