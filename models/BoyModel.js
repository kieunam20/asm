var mongoose = require('mongoose');

var BoySchema = mongoose.Schema(
   {
      product : String,
      quantity : String,
      color : String,
      price : Number,
      image : String,
      rating : Number
      
   }
);

var BoyModel = mongoose.model("Boy", BoySchema, "boy");

module.exports = BoyModel;