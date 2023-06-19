var mongoose = require('mongoose');

var GirlSchema = mongoose.Schema(
   {
      product : String,
      quantity : String,
      brand : String,
      price : Number,
      image : String
     
      
   }
);

var GirlModel = mongoose.model("Girl", GirlSchema, "girl");

module.exports = GirlModel;