'use strict';
const Ad = require('../models/Ad');
const connection = require('../lib/connectMongoose');

main().catch(err => console.log('Hubo un error', err));

async function main() {
  // inicializo colección Ad
  await initAd();

  // cierro conexión
  connection.close();
}

async function initAd() {
  // borro todos los documentos de la colección Ad
  const deleted = await Ad.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crea los anuncios iniciales
  const inserted = await Ad.insertMany([
    {
      name: 'play 5',
      state: true,
      price: 659,
      tags: 'lifestyle',
      img: 'play.jpg',
    },
    {
      name: 'xbox',
      state: false,
      price: 559,
      tags: 'lifestyle',
      img: 'xbox.jpg',
    },
    {
      name: 'nike',
      state: true,
      price: 180,
      tags: 'lifestyle',
      img: 'zapas.jpg',
    },
    {
      name: 'silla',
      state: false,
      price: 400,
      tags: ['work', 'lifestyle'],
      img: 'silla.jpg',
    },
    {
      name: 'reloj',
      state: false,
      price: 500,
      tags: 'lifestyle',
      img: 'reloj.jpg',
    },
    {
      name: 'pc',
      state: true,
      price: 1500,
      tags: ['work', 'lifestyle'],
      img: 'pc.jpg',
    },
    {
      name: 'apple',
      state: true,
      price: 1100,
      tags: 'mobile',
      img: 'movil1.jpg',
    },
    {
      name: 'oppo',
      state: false,
      price: 450,
      tags: 'mobile',
      img: 'movil.jpg',
    },
    {
      name: 'yamaha R7',
      state: true,
      price: 10500,
      tags: 'motor',
      img: 'moto.jpg',
    },
    {
      name: 'escritorio',
      state: true,
      price: 120,
      tags: 'work',
      img: 'mesa.jpg',
    },
    {
      name: 'renault',
      state: false,
      price: 16000,
      tags: 'motor',
      img: 'coche.jpg',
    },
  ]);
  console.log(`Creados ${inserted.length} anuncios`);
}
