const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const mongoose = require('./connection/db');

//RUTAS
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use(taskRoutes);

// const allRoutes  = require('./routes/allRoutes');
// app.use(allRoutes);

const port = 3303;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
