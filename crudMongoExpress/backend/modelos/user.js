const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  edad: Number,
}, { collection: 'users' }); // Especifica el nombre de la colección

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;

