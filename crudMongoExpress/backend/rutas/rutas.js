const express = require('express');
const Usuario = require('../modelos/user');

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo usuario
router.post('/users', async (req, res) => {
  const usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
  });

  try {
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
