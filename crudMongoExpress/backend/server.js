const express = require('express');
const mongoose = require('./db');
const rutas = require('./rutas/rutas');

const app = express();

app.use(express.json());
app.use(rutas);

const puerto = 3303;

app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en el puerto ${puerto}`);
});
