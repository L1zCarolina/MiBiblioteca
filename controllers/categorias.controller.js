const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para todas las categorías
const allCategories = (req, res) => {
    const sql = "SELECT * FROM categorias"; // Seleccionamos todas las categorías
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con los datos en formato JSON
    });
};

// Para una categoría específica
const showCategory = (req, res) => {
    const {id_categoria} = req.params;
    const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
    db.query(sql, [id_categoria], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length == 0) {
            return res.status(404).send({error: "ERROR: No existe la categoría que busca"});
        }
        res.json(rows[0]); // Respondemos con la categoría encontrada
    });
};

//// METODO POST  ////
// Crear una nueva categoría
const storeCategory = (req, res) => {
    const {nombre_categoria} = req.body;
    const sql = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
    db.query(sql, [nombre_categoria], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        const categoria = { ...req.body, id_categoria: result.insertId }; // Reconstruimos el objeto del body con el id
        res.status(201).json(categoria); // Respondemos con la categoría creada
    });
};

//// METODO PUT  ////
// Actualizar una categoría completamente
const updateCategory = (req, res) => {
    const {id_categoria} = req.params;
    const {nombre_categoria} = req.body;
    const sql = "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?";
    db.query(sql, [nombre_categoria, id_categoria], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La categoría a modificar no existe"});
        }
        const categoria = {id_categoria, nombre_categoria};
        res.json(categoria); // Respondemos con la categoría actualizada
    });
};

//// METODO PATCH ////
// Actualizar parcialmente una categoría
const updatePartialCategory = (req, res) => {
    const {id_categoria} = req.params;
    const {nombre_categoria} = req.body;

    const updates = [];
    const values = [];

    if (nombre_categoria) {
        updates.push("nombre_categoria = ?");
        values.push(nombre_categoria);
    }

    if (updates.length === 0) {
        return res.status(400).json({error: "No se especificaron campos para actualizar"});
    }

    const sql = `UPDATE categorias SET ${updates.join(", ")} WHERE id_categoria = ?`;
    values.push(id_categoria); // Agregamos el id_categoria al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La categoría a modificar no existe"});
        }
        const categoria = {id_categoria, ...req.body}; // Reconstruimos el objeto actualizado
        res.json(categoria); // Devolvemos la categoría actualizada
    });
};

//// METODO DELETE ////
// Eliminar una categoría
const destroyCategory = (req, res) => {
    const {id_categoria} = req.params;
    const sql = "DELETE FROM categorias WHERE id_categoria = ?";
    db.query(sql, [id_categoria], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La categoría a eliminar no existe"});
        }
        res.json({mensaje: "Categoría eliminada con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allCategories, //Obtiene todas las categorías de la base de datos.
    showCategory, //Obtiene una categoría específica por su id_categoria.
    storeCategory, // Crea una nueva categoría en la base de datos.
    updateCategory, //Actualiza completamente una categoría, basada en su id_categoria.
    updatePartialCategory, //permite actualizar algunos campos de una categoría de manera parcial.
    destroyCategory //Elimina una categoría de la base de datos.
};
