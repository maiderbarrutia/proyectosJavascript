//EXPRESS
const express = require("express");
const app = express();
app.use(express.json()); // Middleware para analizar el cuerpo de las solicitudes como JSON

//CORS
const cors = require('cors');
app.use(cors()); // Para poder visualizar los datos en el html hay que instalar cors

//USUARIOS
const users = require("./users"); // Importa el enrutador de usuarios
app.use("/users", users); // Utiliza el enrutador de usuarios para manejar las solicitudes dirigidas a /users

// Puerto en el que se ejecutará el servidor express
const PORT = 3302;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


