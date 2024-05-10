const connection = require("./connection");

//Obtener datos: Lista de los actores
const getAllActors = async () => {
    const [query] = await connection.execute("SELECT * FROM sakila.actor");
    return query;
};

//Obtener los datos de un actor en concreto mediante la id
const getActorsById = async (id) => {
    const [query] = await connection.execute("SELECT * FROM sakila.actor WHERE actor_id = ?", [id]);
    return query;
};

//Crear un actor nuevo
const createActor = async (first_name, last_name) => {
    const [query] = await connection.execute("INSERT INTO sakila.actor (first_name, last_name) VALUES (?, ?)", [first_name, last_name]);
    const item = await getActorsById(query.insertId);
    return item;
};

//Actualizar un actor
const updateActor = async (id, first_name, last_name) => {
    const item = await getActorsById(id);
    if (item.length ===0) {
        return null;
    }
    const [query] = await connection.execute("UPDATE sakila.actor SET first_name = ?, last_name = ? WHERE actor_id = ?;", [first_name, last_name, id]);
    
    return query;
};

//Borrar un actor
const deleteActor = async (id) => {
    const item = await getActorsById(id);
    if (item.length ===0) {
        return null;
    }
    await connection.execute("DELETE FROM sakila.film_actor WHERE actor_id = ?;", [id])
    const [query] = await connection.execute("DELETE FROM sakila.actor WHERE actor_id = ?;", [id]);
    
    return query;
};

module.exports = { getAllActors, getActorsById, createActor, updateActor, deleteActor }