const Ad = require("../models/Ad");
const { validationResult } = require("express-validator");

async function getCatalogue(req) {

    validationResult(req).throw();

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
    // http://127.0.0.1:3001/api/catalogue
    // http://localhost:3001/api/catalogu?name=nikaaaaaa
    // http://localhost:3001/api/catalogue?_id=(id producto)
    // http://localhost:3001/api/catalogue?tags=motor
    // http://localhost:3001/api/catalogue?state=true
    // http://localhost:3001/api/catalogue?sort=price&fields=price
    // http://localhost:3001/api/catalogue?fields=name&limit=4&skip=3
    // http://localhost:3001/api/catalogue?fields=img&img=moto

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
      filter.img = filterByImg;
    }

    const ad = await Ad.catalogue(
        filter,
        skip,
        limit,
        sort,
        fields
    );

    return ad;
}

module.exports = getCatalogue;