const Ad = require("../models/Ad");
const { validationResult } = require("express-validator");


// DONE funcion que ne sirve para filtrar por los disitintos campos
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
      filter.img = new RegExp('^' + filterByImg, "i");
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