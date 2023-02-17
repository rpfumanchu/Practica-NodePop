const express = require("express");
const router = express.Router();
const Advertisements = require("../../models/Advertisements");




// GET /api/agentes
router.get('/', async (req, res, next) => {
 try {

     const advertisement = await Advertisements.find();

     res.json({ results: advertisement });

 } catch (error) {
     next(error);
   }
 });





 module.exports = router;