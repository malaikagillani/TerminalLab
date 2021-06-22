var mongoose= require("mongoose");
var productSchema= mongoose.Schema({
    name:String,
    price: String,
    description:String,
    rating:String,
});

var product= mongoose.model("product",productSchema)
module.exports= product;

