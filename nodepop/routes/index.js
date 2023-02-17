var express = require('express');
const { locals } = require('../app');
var router = express.Router();
const Advertisements = require('../models/Advertisements');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// get /advertisement
router.get("/home", async function(req, res, next){
  try {
    const advertisement = await Advertisements.find();
    res.locals.advertisements = advertisement
    res.render("web_ad");
  } catch (err) {
    next(err)
    
  }
})

router.get("/advertisement/price/:price&price/:price", async function(req, res, next){
  try {
    const price = req.params.price;
    const price2 = req.params.price2;
    const advertisement = await Advertisements.find({price: {$gte : {price}, $lte : {price}}});
    res.locals.advertisement = advertisement
    console.log(price)
    //res.send(`Me pedíste ${price} ${price2} ${price}`);
    res.render("web_ad");
  } catch (err) {
    next(err)
    
  }
})


module.exports = router;
