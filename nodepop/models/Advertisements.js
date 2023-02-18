const mongoose = require('mongoose');

// definir el esquema de los anuncios
const AdvertisementsSchema = mongoose.Schema({
  name: String,
  state: Boolean,
  price: Number,
  tags: String,
  img: String
}, {
  // collection: 'advertisements'
});


//DONE método estático para las query

AdvertisementsSchema.statics.catalogue = function(filter, skip, limit, sort, fields) {
  const query = Advertisements.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

//DONE método estático para sacar los distintos tags
AdvertisementsSchema.statics.distinctTag = function() {
  const query = Advertisements.distinct("tags");
  return query.exec();
}

// crear el modelo de Advertisements
const Advertisements = mongoose.model('Advertisements', AdvertisementsSchema);

// exportar el modelo
module.exports = Advertisements;