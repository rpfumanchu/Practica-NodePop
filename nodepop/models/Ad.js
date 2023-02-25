const mongoose = require('mongoose');

// definir el esquema de los anuncios
const AdSchema = mongoose.Schema({
  name: String,
  state: Boolean,
  price: Number,
  tags: Array,
  img: String
}, {
  // collection: 'ad'
});


//DONE método estático para las query

AdSchema.statics.catalogue = function(filter, skip, limit, sort, fields) {
  const query = Ad.find(filter)     //(filter:{"name":/play5/i}));
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

//DONE método estático para sacar los distintos tags
AdSchema.statics.distinctTag = function() {
  const query = Ad.distinct("tags");
  return query.exec();
}

//DONE Método estático para aplicar un rango de precio al anúncio
AdSchema.statics.priceRange = function(price) {
  if(!price.includes("-")){
// Filtrar directamente por el precio exacto
  } else {
const newPrice = price.split("-")
  const price1 = newPrice[0]
  const price2 = newPrice[1]
  if (price1 && price2) {

    const query = Ad.find({price:{$gte : price1, $lte : price2}})
    console.log(price1,price2)
    return query.exec();

  }else if(price1) {
    const query = Ad.find({price:{$gte : price1}})
    return query.exec();

  }else if(price2) {
    const query = Ad.find({price:{$lte : price2}})
    return query.exec();

  } 
  }
  
  //price = price.toString()
 
}

AdSchema.statics.price = function(price) {
  const query = Ad.find({price:  price})
  console.log(price)
  return query.exec();
}

AdSchema.virtual("stateText").get(función() {
 return this.state ? "Si" : "No";
});

// crear el modelo de Ad
const Ad = mongoose.model('Ad', AdSchema);

// exportar el modelo
module.exports = Ad;
