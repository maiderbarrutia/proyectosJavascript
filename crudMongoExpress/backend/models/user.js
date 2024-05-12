const mongoose = require('mongoose');

const SchemaUser = new mongoose.Schema({
  name: String,
  surname: String,
  email: String
}, { collection: 'users' }); // Especifica el nombre de la colección

const User = mongoose.model('User', SchemaUser);

module.exports = User;

