var express = require('express');
var router = express.Router();
var product=require("../models/product");
var check=require("../middlewares/checksessionauth");

/* GET home page. */
router.get('/', async function(req, res, next) {
  let products= await product.find();
  console.log(req.session.user);
  res.render('products/list', {products});
});




router.get('/add', check, async function(req, res, next) {
  res.render('products/add');
});

router.post('/add', async function(req, res, next) {
  let p= new product(req.body);
  await p.save();
  res.redirect("/products");
});


router.get('/delete/:id', async function(req, res, next) {
  let p= await product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});




router.get("/edit/:id", async function (req, res, next) {
  let products = await product.findById(req.params.id);
  res.render("products/edit", { products });
});
router.post("/edit/:id", async function (req, res, next) {
  let products = await product.findById(req.params.id);
  products.name = req.body.name;
  products.price = req.body.price;
  await products.save();
  res.redirect("/products");
});

router.get('/shop/:id', async function(req, res, next) {
  let p= await product.findById(req.params.id);
  let shop=[];
  if (req.cookies.shop) shop= req.cookies.shop;
  shop.push(p);
  res.cookie("shop",shop);
  res.redirect("/products");
});

router.get('/shop/remove/:id', async function(req, res, next) {
  if (req.cookies.shop) shop= req.cookies.shop;
  shop.splice(
    shop.findIndex((c)=> (c._id==req.params.id)),1 ); 
  res.cookie("shop",shop);
  res.redirect("/shop");
});

module.exports = router;
