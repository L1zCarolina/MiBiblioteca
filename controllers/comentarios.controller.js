const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para todos los comentarios
const allComentarios = (req, res) => {
    const sql = "SELECT * FROM comentarios"; // Seleccionamos todos los comentarios
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con los comentarios en formato JSON
    });
};

// Para un comentario específico
const showComentario = (req, res) => {
    const {id_comentario} = req.params;
    const sql = "SELECT * FROM comentarios WHERE id_comentario = ?";
    db.query(sql, [id_comentario], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length == 0) {
            return res.status(404).send({error: "ERROR: No existe el comentario que busca"});
        }
        res.json(rows[0]); // Respondemos con el comentario encontrado
    });
};

//// METODO POST  ////
// Crear un nuevo comentario
const storeComentario = (req, res) => {
    const {id_usuario, id_libro, comentario, fecha_comentario} = req.body;
    const sql = "INSERT INTO comentarios (id_usuario, id_libro, comentario, fecha_comentario) VALUES (?, ?, ?, ?)";
    db.query(sql, [id_usuario, id_libro, comentario, fecha_comentario], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        const comentarioCreado = { ...req.body, id_comentario: result.insertId }; // Reconstruimos el objeto del body con el id
        res.status(201).json(comentarioCreado); // Respondemos con el comentario creado
    });
};

//// METODO PUT  ////
// Actualizar un comentario completamente
const updateComentario = (req, res) => {
    const {id_comentario} = req.params;
    const {id_usuario, id_libro, comentario, fecha_comentario} = req.body;
    const sql = "UPDATE comentarios SET id_usuario = ?, id_libro = ?, comentario = ?, fecha_comentario = ? WHERE id_comentario = ?";
    db.query(sql, [id_usuario, id_libro, comentario, fecha_comentario, id_comentario], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El comentario a modificar no existe"});
        }
        const comentarioActualizado = {id_comentario, id_usuario, id_libro, comentario, fecha_comentario};
        res.json(comentarioActualizado); // Respondemos con el comentario actualizado
    });
};

//// METODO PATCH ////
// Actualizar parcialmente un comentario
const updatePartialComentario = (req, res) => {
    const {id_comentario} = req.params;
    const {id_usuario, id_libro, comentario, fecha_comentario} = req.body;

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

    if (comentario) {
        updates.push("comentario = ?");
        values.push(comentario);
    }

    if (fecha_comentario) {
        updates.push("fecha_comentario = ?");
        values.push(fecha_comentario);
    }

    if (updates.length === 0) {
        return res.status(400).json({error: "No se especificaron campos para actualizar"});
    }

    const sql = `UPDATE comentarios SET ${updates.join(", ")} WHERE id_comentario = ?`;
    values.push(id_comentario); // Agregamos el id_comentario al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El comentario a modificar no existe"});
        }
        const comentarioActualizado = {id_comentario, ...req.body}; // Reconstruimos el objeto actualizado
        res.json(comentarioActualizado); // Devolvemos el comentario actualizado
    });
};

//// METODO DELETE ////
// Eliminar un comentario
const destroyComentario = (req, res) => {
    const {id_comentario} = req.params;
    const sql = "DELETE FROM comentarios WHERE id_comentario = ?";
    db.query(sql, [id_comentario], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El comentario a eliminar no existe"});
        }
        res.json({mensaje: "Comentario eliminado con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allComentarios, //Obtiene todos los comentarios de la base de datos.
    showComentario, //Obtiene un comentario específico por su id_comentario.
    storeComentario, //Crea un nuevo comentario en la base de datos.
    updateComentario, //Actualiza completamente un comentario, basado en su id_comentario.
    updatePartialComentario, //Permite actualizar algunos campos de un comentario de manera parcial.
    destroyComentario //Elimina un comentario de la base de datos.
};
