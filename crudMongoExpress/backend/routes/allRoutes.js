const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);

const taskRoutes = require('./taskRoutes');
router.use('/tasks', taskRoutes);

// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const Task = require('../models/task');

// //USUARIOS
// // Obtener lista de usuarios
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Añadir usuarios
// router.post('/users', async (req, res) => {
//   const user = new User({
//     name: req.body.name,
//     surname: req.body.surname,
//     email: req.body.email,
//   });

//   try {
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// //TAREAS
// // Obtener lista de Tareas
// router.get('/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find().populate('assignedTo', 'name surname email');
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Obtener una tarea por su id
// router.get('/tasks/:id', async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Tarea no encontrada' });
//     }
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Agregar una tarea
// router.post('/tasks', async (req, res) => {
//   const task = new Task({
//     title: req.body.title,
//     description: req.body.description,
//     deadline: req.body.deadline,
//     assignedTo: req.body.assignedTo,
//   });

//   try {
//     const newTask = await task.save();
//     res.status(201).json(newTask);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Actualizar una tarea
// router.put('/tasks/:id', async (req, res) => {
//   const { title, description, deadline, assignedTo } = req.body;
//   if (!title || !description || !deadline || !assignedTo) {
//     return res.status(400).json({ message: 'El título y la descripción son obligatorios' });
//   }
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, { title, description, deadline, assignedTo }, { new: true });
//     if (!task) {
//       return res.status(404).json({ message: 'Tarea no encontrada' });
//     }
//     res.json(task);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Eliminar una tarea por su id
// router.delete('/tasks/:id', async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
//     if (!task) {
//       return res.status(404).json({ message: 'Tarea no encontrada' });
//     }
//     res.json({ message: 'Tarea eliminada correctamente' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
