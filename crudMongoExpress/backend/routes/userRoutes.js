const express = require('express');
const User = require('../models/user');

const router = express.Router();

// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// Obtener lista de usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Añadir usuarios
router.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// // Ruta para obtener todos los usuarios
// router.get('/usersList', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Ruta para obtener un usuario por su ID
// router.get('/usersList/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Ruta para crear un nuevo usuario
// router.post('/usersList', async (req, res) => {
//   const user = new User({
//     nombre: req.body.nombre,
//     apellido: req.body.apellido,
//     email: req.body.email,
//     edad: req.body.edad
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //Ruta para crear varios usuarios
// // router.post('/usersList', async (req, res) => {
// //   const users = req.body; 

// //   try {
// //     const createdUsers = [];
// //     for (const user of users) {
// //       const newUser = await User.create(user);
// //       createdUsers.push(newUser);
// //     }
// //     res.status(201).json(createdUsers);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // Ruta para actualizar un usuario
// router.put('/usersList/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Ruta para eliminar un usuario
// router.delete('/usersList/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//     res.json({ message: 'Usuario eliminado correctamente' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
