const connection = require("./connection");

//Obtener datos: Lista de los usuarios
const getAllUsers = async () => {
    const [query] = await connection.execute("SELECT * FROM usuarios.usuarios");
    return query;
};

module.exports = { getAllUsers}