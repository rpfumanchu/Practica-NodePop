
const express = require("express");
const router = express.Router();
const Ad = require("../../models/Ad");
const findOut = require("../api/validations");
const getCatalogue = require("../../lib/filter");
const { validationResult } = require("express-validator");

//NOTE CRUD: create, read, update, delete

//DONE devuelve una lista de anuncios
//DONE devuelve un anuncio buscado por su id
//DONE Lista de anuncios con posibilidad de paginación
//DONE Con filtros por tag,
//DONE tipo de anuncio(venta o búsqueda)
//DONE nombre de artículo(que empiece por el dato buscado)
//DONE rango de precio (precio min. y precio max.), menor igual, mayor igual y precio exacto
//DONE modificar anuncio
//DONE crear anuncio


//DONE Filtra anuncios por todos sus campos e implemto limit, skip, fields
//NOTE GET /api/catalogue
//NOTE Ejemplos de url para las distintas query
// http://localhost:3001/api/catalogue
// http://localhost:3001/api/catalogue?name=nike
// http://localhost:3001/api/catalogue?name=P
// http://localhost:3001/api/catalogue?_id=(id producto)
// http://localhost:3001/api/catalogue?tags=motor
// http://localhost:3001/api/catalogue?state=true
// http://localhost:3001/api/catalogue?sort=price&fields=price
// http://localhost:3001/api/catalogue?fields=name&limit=4&skip=3
// http://localhost:3001/api/catalogue?fields=img&img=moto
// http://localhost:3001/api/catalogue?fields=img&img=c
router.get("/", findOut(), async (req, res, next) => {
  try {
    
    const ad = await getCatalogue(req);

    res.json({ results: ad });

  } catch (error) {
    next(error);
  }
});

//DONE tipos de tag distintos
//NOTE GET /api/catalogue/tags
// http://localhost:3001/api/catalogue/tags?tag=tags
router.get("/tags", async (req, res, next) => {
  try {
    const tags = req.query.tags;

    const ad = await Ad.distinctTag(tags);

    res.json({ results: ad });
  } catch (error) {
    next(error);
  }
});

//DONE modifica un anuncio
//NOTE PUT /api/catalogue/modify
//localhost:3001/api/catalogue/modify/"_id del anuncio"
router.put("/modify/:id", findOut(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedAd = await Ad.findByIdAndUpdate(id, data, {
      new: true, // "nota para mi" esto hace que nos devuelva el documento actualizado
    });

    res.json({ result: updatedAd });
    console.log(`actualizado anuncio con id ${updatedAd.id} y nombre ${updatedAd.name} `);

  } catch (error) {
    next(error);
  }
});

//DONE Crea un anuncio
//NOTE POST /api/catalogue/create (body)
//http://localhost:3001/api/catalogue/create
router.post("/create", findOut(), async (req, res, next) => {
  try {
    
    const adData = req.body;

    //NOTE Creo una instancia de ad en memoria
    const ad = new Ad(adData);

    //NOTE La persistimos en la base de datos
    const saveAd = await ad.save();

    res.json({ result: saveAd });
    console.log(`creado con exito anuncio con id ${saveAd.id} y nombre ${saveAd.name} `);

  } catch (error) {
    next(error);
  }
});

//DONE Borra un anuncio por su _id
//NOTE DELETE /api/catalogue/delete
// http://localhost:3001/api/catalogue/delete/"_id del anuncio"
router.delete('/delete/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    
    await Ad .deleteOne({ _id: id });

    res.json();
    console.log(`Eliminado con éxito anuncio con id ${id}`);

  } catch (error) {
    next(error);
  }
});

//DONE Buscar anuncios filtrando por precio
//NOTE GET /api/catalogue/range/
// http://localhost:3001/api/catalogue/range/50-800
// http://localhost:3001/api/catalogue/range/-200
// http://localhost:3001/api/catalogue/range/11000-
// http://localhost:3001/api/catalogue/range/659
router.get("/range/:price", findOut(), async (req, res, next) => {
  try {

  let price = req.params.price;
 
  const pricer = await Ad.priceRange(price);
  
  res.json({ results: pricer });
  
  } catch (error) {
    next(error)
  }
})




module.exports = router;
