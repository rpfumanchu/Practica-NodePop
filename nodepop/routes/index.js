var express = require("express");
//const { locals } = require('../app');
var router = express.Router();
const Ad = require("../models/Ad");
const { validationResult } = require("express-validator");
const findOut = require("./api/validations");
const getCatalogue = require("../lib/catalogue");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// get /catalogue
 router.get("/catalogue", findOut(), async function (req, res, next) {
   try {
     const ad = await Ad.find();
     res.locals.ads = ad;
     res.render("catalog-ads");
   } catch (err) {
    next(err);
   }
 });

router.get("/range/:price", findOut(), async (req, res, next) => {
  try {
    validationResult(req).throw();

    let price = req.params.price;

    const pricer = await Ad.priceRange(price);

    res.locals.priceRange = pricer;
    res.render("price-range");
  } catch (error) {
    next(error);
  }
});

router.get("/price/:price", findOut(), async (req, res, next) => {
  try {
    validationResult(req).throw();

    let price = req.params.price;

    const pricer = await Ad.price(price);

    res.locals.priceExac = pricer;
    res.render("price");
  } catch (error) {
    next(error);
  }
});


 router.get("/filter", findOut(), async (req, res, next) => {
   try {
    
     const ad = await getCatalogue(req);

     res.locals.filterAds = ad;
     //res.locals.filteredByField = req.query.fields;
     res.render("filter-ad");
   } catch (error) {
     next(error);
   }
 });

//NOTE GET /tags
// tipos de tags
// http://localhost:3001/tags?tag=tags
router.get("/tags", async (req, res, next) => {
  try {
    const tags = req.query.tags;

    const ad = await Ad.distinctTag(tags);

    res.locals.tags = ad
    res.render("tags")
  } catch (error) {
    next(error);
  }
});



module.exports = router;
