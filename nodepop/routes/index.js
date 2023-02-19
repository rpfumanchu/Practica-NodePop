var express = require('express');
//const { locals } = require('../app');
var router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// get /catalogue
router.get("/catalogue", async function(req, res, next){
  try {
    const ad = await Ad.find(

    );
    res.locals.ad = ad
    res.render("web_ad");
  } catch (err) {
    next(err)
    
  }
})

router.get("/range/:price", async (req, res, next) => {
  try {

  let price = req.params.price;
 
  const pricer = await Ad.priceRange(price);
  
  res.locals.ado = pricer;
  res.render("ejem");
  
  } catch (error) {
    next(error)
  }
})


router.get("/filter", async (req, res, next) => {
  try {
    //validationResult(req).throw();

    //NOTE filter
    const filterByName = req.query.name;
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

    

    const ad = await Ad.catalogue(
      filter,
      skip,
      limit,
      sort,
      fields
    );

    res.locals.ada = ad ;
    res.render("ejem");

  } catch (error) {
    next(error);
  }
});

// router.get("/filter", async function(req, res, next){
//   try {
//     const filterByName = req.params.name

//     const filter = {};

//     if (filterByName) {
//       filter.name = filterByName;
//     }

//     const ad = await Ad.catalogue(filter);
//     res.locals.ada = ad
//     res.render("ejem");
  
//   } catch (err) {
//     next(err)
    
//   }
// })

module.exports = router;
