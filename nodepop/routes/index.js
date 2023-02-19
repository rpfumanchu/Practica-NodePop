var express = require('express');
//const { locals } = require('../app');
var router = express.Router();
const Advertisements = require('../models/Advertisements');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// get /advertisement
router.get("/catalogue", async function(req, res, next){
  try {
    const advertisement = await Advertisements.find(

    );
    res.locals.advertisements = advertisement
    res.render("web_ad");
  } catch (err) {
    next(err)
    
  }
})

// router.get("/catalogue/range:price", async function(req, res, next){
//   try {
//     let price = req.params.price;
//     const newPrice = price.split("-")
//     const price1 = newPrice[0]
//     const price2 = newPrice[1]

    
//     const advertisement = await Advertisements.find({price:{$gte : price1, $lte : price2}})
//     res.locals.advertisements = advertisement
//     console.log(price1,price2)

    
//     //res.send(`Me pedíste ${price} ${price2} ${price}`);
//     res.render("ejem");
//   } catch (err) {
//     next(err)
    
//   }
// })


router.get("/filter", async (req, res, next) => {
  try {
    //validationResult(req).throw();

    //NOTE filter
    const filterByName = req.params.name;
    const filterById = req.query._id;
    const filterByTags = req.query.tags;
    const filterByState = req.query.state;
    const filterByImg = req.query.img

    //NOTE paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    //NOTE ordenar
    const sort = req.query.sort;

    //NOTE selección de campos
    const fields = req.query.fields;

    //NOTE Ejemplos de url para las distintas query
    // http://localhost:3001/api/catalogue?name=nike
    // http://localhost:3001/api/catalogue?_id=(id producto)
    // http://localhost:3001/api/catalogue/filter?tags=motor
    // http://localhost:3001/api/catalogue/filter?state=true
    // http://localhost:3001/api/catalogue/filter?sort=price&fields=price
    // http://localhost:3001/api/catalogue/filter?fields=name&limit=4&skip=3
    // http://localhost:3001/api/catalogue/filter?fields=img&img=moto

    const filter = {};

    if (filterByName) {
      filter.name = filterByName;
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
      filter.img = filterByImg;
    }

    

    const advertisement = await Advertisements.catalogue(
      filter,
      skip,
      limit,
      sort,
      fields
    );

    res.locals.advertisement = advertisement ;
    res.render("ejem");

  } catch (error) {
    next(error);
  }
});


module.exports = router;
