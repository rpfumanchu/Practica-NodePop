var express = require("express");
//const { locals } = require('../app');
var router = express.Router();
const Ad = require("../models/Ad");
const { validationResult } = require("express-validator");
const findOut = require("./api/validations");


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

 router.get("/filter", findOut(), async (req, res, next) => {
   try {
     validationResult(req).throw();

     //NOTE filter
     const filterByName = req.query.name;
     const filterById = req.query._id;
     const filterByTags = req.query.tags;
     const filterByState = req.query.state;
     const filterByImg = req.query.img;

     //NOTE paginación
     const skip = req.query.skip;
     const limit = req.query.limit;

     //NOTE ordenar
     const sort = req.query.sort;

     //NOTE selección de campos
     const fields = req.query.fields;

     //NOTE Ejemplos de url para las distintas query
     // http://127.0.0.1:3001/filter?name=nike
     // http://127.0.0.1:3001/filter?_id=(id producto)
     // http://127.0.0.1:3001/filter?tags=motor
     // http://127.0.0.1:3001/filter?state=true
     // http://127.0.0.1:3001/filter?fields=img&fields=name&fields=price&sort=price
     // http://127.0.0.1:3001/filter?limit=4&skip=3
     // http://127.0.0.1:3001/filter?fields=img&img=moto

     const filter = {};

     if (filterByName) {
       filter.name = new RegExp('^' + filterByName, "i");
     }

     if (filterById) {
       filter._id = filterById;
     }

     if (filterByTags) {
       filter.tags = filterByTags;
     }

     if (filterByState) {
       filter.state = filterByState;
     }

     if (filterByImg) {
       filter.img = filterByImg.toLowerCase();
     }

     const ad = await Ad.catalogue(filter, skip, limit, sort, fields);

     res.locals.filterAds = ad;
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
