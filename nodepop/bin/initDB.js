"use strict";
const Advertisements = require("../models/Advertisements");
const connection = require("../lib/connectMongoose");

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  // inicializo colección Advertisements
  await initAdvertisements();

  // cierro conexión
  connection.close();
}

async function initAdvertisements() {
  // borro todos los documentos de la colección Advertisements
  const deleted = await Advertisements.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crea los anuncios iniciales
  const inserted = await Advertisements.insertMany([
    {
      name: "Play 5",
      state: true,
      price: 659,
      tags: "lifestyle",
      img: "play",
    },
    {
      name: "Xbox",
      state: false,
      price: 559,
      tags: "lifestyle",
      img: "xbox",
    },
    {
      name: "nike",
      state: true,
      price: 180,
      tags: "lifestyle",
      img: "zapas",
    },
    {
      name: "silla",
      state: false,
      price: 400,
      tags: "work",
      img: "silla",
    },
    {
      name: "reloj",
      state: false,
      price: 500,
      tags: "lifestyle",
      img: "reloj",
    },
    {
      name: "pc",
      state: true,
      price: 1500,
      tags: "lifestyle",
      img: "pc",
    },
    {
      name: "apple",
      state: true,
      price: 1100,
      tags: "mobile",
      img: "movil1",
    },
    {
      name: "oppo",
      state: false,
      price: 450,
      tags: "mobile",
      img: "movil",
    },
    {
      name: "yamaha R7",
      state: true,
      price: 10500,
      tags: "motor",
      img: "moto",
    },
    {
      name: "escritorio",
      state: true,
      price: 120,
      tags: "work",
      img: "mesa",
    },
    {
      name: "Renault",
      state: false,
      price: 16000,
      tags: "motor",
      img: "coche",
    },
  ]);
  console.log(`Creados ${inserted.length} anuncios`);
}
