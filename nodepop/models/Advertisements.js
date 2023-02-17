const mongoose = require('mongoose');

// definir el esquema de los agentes
const AdvertisementsSchema = mongoose.Schema({
  name: String,
  state: Boolean,
  price: Number,
  tags: String,
  img: String
}, {
  // collection: 'advertisements'
});

// crear el modelo de Advertisements
const Advertisements = mongoose.model('Advertisements', AdvertisementsSchema);

// exportar el modelo
module.exports = Advertisements;