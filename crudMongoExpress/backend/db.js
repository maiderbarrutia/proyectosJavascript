const mongoose = require('mongoose');

async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/users');
    console.log('Conexión a MongoDB establecida correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

connectToMongoDB();

module.exports = mongoose;
