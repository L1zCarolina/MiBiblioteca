const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para todos los favoritos
const allFavoritos = (req, res) => {
    const sql = "SELECT * FROM favoritos"; // Seleccionamos todos los favoritos
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con los datos en formato JSON
    });
};

// Para un favorito específico
const showFavorito = (req, res) => {
    const {id_favorito} = req.params;
    const sql = "SELECT * FROM favoritos WHERE id_favorito = ?";
    db.query(sql, [id_favorito], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length == 0) {
            return res.status(404).send({error: "ERROR: No existe el favorito que busca"});
        }
        res.json(rows[0]); // Respondemos con el favorito encontrado
    });
};

//// METODO POST  ////
// Crear un nuevo favorito
const storeFavorito = (req, res) => {
    const {id_usuario, id_libro, fecha_agregado} = req.body;
    const sql = "INSERT INTO favoritos (id_usuario, id_libro, fecha_agregado) VALUES (?, ?, ?)";
    db.query(sql, [id_usuario, id_libro, fecha_agregado], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        const favorito = { ...req.body, id_favorito: result.insertId }; // Reconstruimos el objeto del body con el id
        res.status(201).json(favorito); // Respondemos con el favorito creado
    });
};

//// METODO PUT  ////
// Actualizar un favorito completamente
const updateFavorito = (req, res) => {
    const {id_favorito} = req.params;
    const {id_usuario, id_libro, fecha_agregado} = req.body;
    const sql = "UPDATE favoritos SET id_usuario = ?, id_libro = ?, fecha_agregado = ? WHERE id_favorito = ?";
    db.query(sql, [id_usuario, id_libro, fecha_agregado, id_favorito], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El favorito a modificar no existe"});
        }
        const favorito = {id_favorito, id_usuario, id_libro, fecha_agregado};
        res.json(favorito); // Respondemos con el favorito actualizado
    });
};

//// METODO PATCH ////
// Actualizar parcialmente un favorito
const updatePartialFavorito = (req, res) => {
    const {id_favorito} = req.params;
    const {id_usuario, id_libro, fecha_agregado} = req.body;

    const updates = [];
    const values = [];

    if (id_usuario) {
        updates.push("id_usuario = ?");
        values.push(id_usuario);
    }

    if (id_libro) {
        updates.push("id_libro = ?");
        values.push(id_libro);
    }

    if (fecha_agregado) {
        updates.push("fecha_agregado = ?");
        values.push(fecha_agregado);
    }

    if (updates.length === 0) {
        return res.status(400).json({error: "No se especificaron campos para actualizar"});
    }

    const sql = `UPDATE favoritos SET ${updates.join(", ")} WHERE id_favorito = ?`;
    values.push(id_favorito); // Agregamos el id_favorito al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El favorito a modificar no existe"});
        }
        const favorito = {id_favorito, ...req.body}; // Reconstruimos el objeto actualizado
        res.json(favorito); // Devolvemos el favorito actualizado
    });
};

//// METODO DELETE ////
// Eliminar un favorito
const destroyFavorito = (req, res) => {
    const {id_favorito} = req.params;
    const sql = "DELETE FROM favoritos WHERE id_favorito = ?";
    db.query(sql, [id_favorito], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El favorito a eliminar no existe"});
        }
        res.json({mensaje: "Favorito eliminado con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allFavoritos, //Obtiene todos los favoritos de la base de datos.
    showFavorito, //Obtiene un favorito específico por su id_favorito.
    storeFavorito, //Crea un nuevo favorito en la base de datos.
    updateFavorito, //Actualiza completamente un favorito, basado en su id_favorito.
    updatePartialFavorito, //Permite actualizar algunos campos de un favorito de manera parcial.
    destroyFavorito //Elimina un favorito de la base de datos.
};
