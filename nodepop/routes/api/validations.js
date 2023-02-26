const {query, validationResult} = require('express-validator');

const findOut = () => {
  return [
    query("name").isString().optional().withMessage("Este campo debe ser una cadena de texto"),
    query("tags").isIn(["lifestyle","mobile","motor","work"]).optional().withMessage("Este campo no existe, prueba con: lifestyle,mobile,motor,work"),
    query("state").isBoolean().optional().withMessage("Este campo tiene que ser true o false"),
    query("skip",).isNumeric().optional().withMessage("Este campo tiene que ser numérico"),
    query("limit",).isNumeric().optional().withMessage("Este campo tiene que ser numérico"),
    query("price",).isNumeric().optional().withMessage("Este campo tiene que ser numérico")
  ]
    

}

module.exports = findOut