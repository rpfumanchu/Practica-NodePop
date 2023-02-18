const express = require("express");
const router = express.Router();
const {query,check, validationResult} = require('express-validator');
const Advertisements = require("../../models/Advertisements");
const findOut = require("../api/validations")

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
    const filterByState = req.query.state

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

    const advertisement = await Advertisements.catalogue(filter, skip, limit, sort, fields);

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
    const tags = req.query.tags

    const advertisement = await Advertisements.distinctTag(tags);

    res.json({ results: advertisement });

  } catch (error) {
    next(error);
  }
}) 


//NOTE PUT /api/catalogue/modify
router.put("/modify/:id", async (req,res,next) => {
  try {

    const id = req.params.id;
    const data = req.body;

    const updatedAd = await Advertisements.findByIdAndUpdate(id, data, {
      new: true // "nota para mi" esto hace que nos devuelva el documento actualizado
    });

    res.json({result: updatedAd})
    console.log(`actualizado anuncio con id ${updatedAd.name} `)
    
  } catch (error) {
    next(error)
  }
})


module.exports = router;
