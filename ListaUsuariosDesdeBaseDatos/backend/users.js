const express = require("express");
const router = express.Router();
const { getAllUsers} = require("./querys");

// Obtener datos: Lista de usuarios
router.get("/", async (req, res) => {
    try {
        const actors = await getAllUsers();
        res.status(200).json(actors);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
});

module.exports = router;