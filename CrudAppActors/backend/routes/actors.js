// const {Router} = require("express");
// const querys = require("../querys");

// const router = Router();

// //Obtener datos: Lista de los actores
// router.get("/", async (req, res) => {
//     const query = await querys.getAllActors();
//     return res.status(200).json(query);
// })

// //Obtener los datos de un actor en concreto mediante la id
// router.get("/:id", async(req, res) =>{
//     const {id} = req.params;
//     const query = await querys.getActorsById(id);
//     if (query.length ===0) {
//         return res.status(400).json({message: "Actor not found"})
//     }
//     return res.status(200).json(query);
// })

// //Crear un actor nuevo
// router.post("/", async(req, res) =>{
//     const {first_name, last_name} = req.body;
//     const query = await querys.createActor(first_name, last_name);
//     return res.status(200).json(query);
// })

// //Actualizar un actor
// router.put("/", async(req, res) =>{
//     const {id, first_name, last_name} = req.body;
//     const query = await querys.updateActor(id, first_name, last_name);
//     if (query === null) {
//         return res.status(400).json({message: "Actor not found"})
//     }
//     return res.status(200).json({message: "Actor registered successfully"})
// })

// //Borrar un actor
// router.delete("/", async(req, res) =>{
//     const {id} = req.body;
//     const query = await querys.deleteActor(id);
//     if (query === null) {
//         return res.status(400).json({message: "Actor not found"})
//     }
//     return res.status(200).json({message: "Actor deleted successfully"})
// })



// module.exports = router;


const express = require("express");
const router = express.Router();
const { getAllActors, createActor, updateActor, deleteActor } = require("../querys");

// Obtener datos: Lista de los actores
router.get("/", async (req, res) => {
    try {
        const actors = await getAllActors();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los actores" });
    }
});

// Crear un actor nuevo
router.post("/", async (req, res) => {
    const { first_name, last_name } = req.body;
    try {
        const newActor = await createActor(first_name, last_name);
        res.status(201).json(newActor);
    } catch (error) {
        res.status(500).json({ message: "Error al añadir el actor" });
    }
});

// Actualizar un actor
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    try {
        const updatedActor = await updateActor(id, first_name, last_name);
        if (updatedActor) {
            res.status(200).json({ message: "Actor actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Actor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el actor" });
    }
});

// Borrar un actor
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedActor = await deleteActor(id);
        if (deletedActor) {
            res.status(200).json({ message: "Actor eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Actor no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el actor" });
    }
});

module.exports = router;
