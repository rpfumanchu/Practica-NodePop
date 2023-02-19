const { json } = require("express");
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const Advertisements = require("../../models/Advertisements");
const findOut = require("../api/validations");

//NOTE CRUD: create, read, update, delete

//DONE devuelve una lista de anuncios
//DONE devuelve un anuncio buscado por su id
//DONE Lista de anuncios con posibilidad de paginación
//DONE Con filtros por tag,
//DONE tipo de anuncio(venta o búsqueda)
//TODO nombre de artículo(que empiece por el dato buscado)
//TODO rango de precio (precio min. y precio max.)
//TODO modificar anuncio
//TODO crear anuncio

//NOTE GET /api/catalogue
//NOTE http://localhost:3001/api/catalogue

router.get("/", async (req, res, next) => {
  try {
    const advertisement = await Advertisements.catalogue();

    res.json({ results: advertisement });
  } catch (error) {
    next(error);
  }
});

//NOTE GET /api/catalogue/filter

router.get("/filter", findOut(), async (req, res, next) => {
  try {
    validationResult(req).throw();

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

    

    const advertisement = await Advertisements.catalogue(
      filter,
      skip,
      limit,
      sort,
      fields
    );

    res.json({ results: advertisement });

  } catch (error) {
    next(error);
  }
});

//NOTE GET /api/catalogue/tags
// tipos de tags
// http://localhost:3001/api/catalogue/tags?tag=tags
router.get("/tags", async (req, res, next) => {
  try {
    const tags = req.query.tags;

    const advertisement = await Advertisements.distinctTag(tags);

    res.json({ results: advertisement });
  } catch (error) {
    next(error);
  }
});

//DONE modifica un anuncio
//NOTE PUT /api/catalogue/modify
//localhost:3001/api/catalogue/modify/"_id del anuncio"

http: router.put("/modify/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedAd = await Advertisements.findByIdAndUpdate(id, data, {
      new: true, // "nota para mi" esto hace que nos devuelva el documento actualizado
    });

    res.json({ result: updatedAd });
    console.log(`actualizado anuncio con id ${updatedAd.id} y nombre ${updatedAd.name} `);

  } catch (error) {
    next(error);
  }
});

//NOTE POST /api/catalogue/create (body)
//http://localhost:3001/api/catalogue/create
router.post("/create", async (req, res, next) => {
  try {
    
    const adData = req.body;

    //NOTE Creo una instancia de ad en memoria
    const ad = new Advertisements(adData);

    //NOTE La persistimos en la base de datos
    const saveAd = await ad.save();

    res.json({ result: saveAd });
    console.log(`creado con exito anuncio con id ${saveAd.id} y nombre ${saveAd.name} `);

  } catch (error) {
    next(error);
  }
});

//NOTE DELETE /api/catalogue/delete
// http://localhost:3001/api/catalogue/delete/"_id del anuncio"
router.delete('/delete/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    
    await Advertisements .deleteOne({ _id: id });

    res.json();
    console.log(`Eliminado con éxito anuncio con id ${id}`);

  } catch (error) {
    next(error);
  }
});

//NOTE GET /api/catalogue/range/
// http://localhost:3001/api/catalogue/range/50-800
router.get("/range/:price", async (req, res, next) => {
  try {

  let price = req.params.price;
 
  const pricer = await Advertisements.priceRange(price);
  
  res.json({ results: pricer });
    
  } catch (error) {
    next(error)
  }
})


module.exports = router;
