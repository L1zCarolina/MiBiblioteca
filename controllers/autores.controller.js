const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para todos los autores
const allAuthors = (req, res) => {
    const sql = "SELECT * FROM autores"; // Seleccionamos todos los autores
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con los datos en formato JSON
    });
};

// Para un autor específico
const showAuthor = (req, res) => {
    const {id_autor} = req.params;
    const sql = "SELECT * FROM autores WHERE id_autor = ?";
    db.query(sql, [id_autor], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length == 0) {
            return res.status(404).send({error: "ERROR: No existe el autor que busca"});
        }
        res.json(rows[0]); // Respondemos con el autor encontrado
    });
};

//// METODO POST  ////
// Crear un nuevo autor
const storeAuthor = (req, res) => {
    const {nombre_autor, biografia, pais_origen} = req.body;
    const sql = "INSERT INTO autores (nombre_autor, biografia, pais_origen) VALUES (?, ?, ?)";
    db.query(sql, [nombre_autor, biografia, pais_origen], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        const autor = { ...req.body, id_autor: result.insertId }; // Reconstruimos el objeto del body con el id
        res.status(201).json(autor); // Respondemos con el autor creado
    });
};

//// METODO PUT  ////
// Actualizar un autor completamente
const updateAuthor = (req, res) => {
    const {id_autor} = req.params;
    const {nombre_autor, biografia, pais_origen} = req.body;
    const sql = "UPDATE autores SET nombre_autor = ?, biografia = ?, pais_origen = ? WHERE id_autor = ?";
    db.query(sql, [nombre_autor, biografia, pais_origen, id_autor], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El autor a modificar no existe"});
        }
        const autor = {id_autor, nombre_autor, biografia, pais_origen};
        res.json(autor); // Respondemos con el autor actualizado
    });
};

//// METODO PATCH ////
// Actualizar parcialmente un autor
const updatePartialAuthor = (req, res) => {
    const {id_autor} = req.params;
    const {nombre_autor, biografia, pais_origen} = req.body;

    const updates = [];
    const values = [];

    if (nombre_autor) {
        updates.push("nombre_autor = ?");
        values.push(nombre_autor);
    }
    if (biografia) {
        updates.push("biografia = ?");
        values.push(biografia);
    }
    if (pais_origen) {
        updates.push("pais_origen = ?");
        values.push(pais_origen);
    }

    if (updates.length === 0) {
        return res.status(400).json({error: "No se especificaron campos para actualizar"});
    }

    const sql = `UPDATE autores SET ${updates.join(", ")} WHERE id_autor = ?`;
    values.push(id_autor); // Agregamos el id_autor al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El autor a modificar no existe"});
        }
        const autor = {id_autor, ...req.body}; // Reconstruimos el objeto actualizado
        res.json(autor); // Devolvemos el autor actualizado
    });
};

//// METODO DELETE ////
// Eliminar un autor
const destroyAuthor = (req, res) => {
    const {id_autor} = req.params;
    const sql = "DELETE FROM autores WHERE id_autor = ?";
    db.query(sql, [id_autor], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El autor a eliminar no existe"});
        }
        res.json({mensaje: "Autor eliminado con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allAuthors, //Obtiene todos los autores de la base de datos.
    showAuthor, //Obtiene todos los autores de la base de datos.
    storeAuthor, //Crea un nuevo autor en la base de datos.
    updateAuthor, //Actualiza completamente un autor, basado en su id_autor.
    updatePartialAuthor, //Permite actualizar algunos campos de un autor de manera parcial.
    destroyAuthor //Elimina un autor de la base de datos.
};
