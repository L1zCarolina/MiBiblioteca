const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para todas las sagas
const allSagas = (req, res) => {
    const sql = "SELECT * FROM sagas"; // Seleccionamos todas las sagas
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con los datos en formato JSON
    });
};

// Para una saga específica
const showSaga = (req, res) => {
    const {id_saga} = req.params;
    const sql = "SELECT * FROM sagas WHERE id_saga = ?";
    db.query(sql, [id_saga], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length == 0) {
            return res.status(404).send({error: "ERROR: No existe la saga que busca"});
        }
        res.json(rows[0]); // Respondemos con la saga encontrada
    });
};

//// METODO POST  ////
// Crear una nueva saga
const storeSaga = (req, res) => {
    const {nombre_saga, descripcion, imagen} = req.body;
    const sql = "INSERT INTO sagas (nombre_saga, descripcion, imagen) VALUES (?, ?, ?)";
    db.query(sql, [nombre_saga, descripcion, imagen], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        const saga = { ...req.body, id_saga: result.insertId }; // Reconstruimos el objeto del body con el id
        res.status(201).json(saga); // Respondemos con la saga creada
    });
};

//// METODO PUT  ////
// Actualizar una saga completamente
const updateSaga = (req, res) => {
    const {id_saga} = req.params;
    const {nombre_saga, descripcion, imagen} = req.body;
    const sql = "UPDATE sagas SET nombre_saga = ?, descripcion = ?, imagen = ? WHERE id_saga = ?";
    db.query(sql, [nombre_saga, descripcion, imagen, id_saga], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La saga a modificar no existe"});
        }
        const saga = {id_saga, nombre_saga, descripcion, imagen};
        res.json(saga); // Respondemos con la saga actualizada
    });
};

//// METODO PATCH ////
// Actualizar parcialmente una saga
const updatePartialSaga = (req, res) => {
    const {id_saga} = req.params;
    const {nombre_saga, descripcion, imagen} = req.body;

    const updates = [];
    const values = [];

    if (nombre_saga) {
        updates.push("nombre_saga = ?");
        values.push(nombre_saga);
    }

    if (descripcion) {
        updates.push("descripcion = ?");
        values.push(descripcion);
    }

    if (imagen) {
        updates.push("imagen = ?");
        values.push(imagen);
    }

    if (updates.length === 0) {
        return res.status(400).json({error: "No se especificaron campos para actualizar"});
    }

    const sql = `UPDATE sagas SET ${updates.join(", ")} WHERE id_saga = ?`;
    values.push(id_saga); // Agregamos el id_saga al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La saga a modificar no existe"});
        }
        const saga = {id_saga, ...req.body}; // Reconstruimos el objeto actualizado
        res.json(saga); // Devolvemos la saga actualizada
    });
};

//// METODO DELETE ////
// Eliminar una saga
const destroySaga = (req, res) => {
    const {id_saga} = req.params;
    const sql = "DELETE FROM sagas WHERE id_saga = ?";
    db.query(sql, [id_saga], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La saga a eliminar no existe"});
        }
        res.json({mensaje: "Saga eliminada con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allSagas, //Obtiene todas las sagas de la base de datos.
    showSaga, //Obtiene una saga específica para su id_saga.
    storeSaga, //Crea una nueva saga en la base de datos.
    updateSaga, //Actualiza completamente una saga, basada en su id_saga.
    updatePartialSaga, //Permite actualizar algunos campos de una saga de manera parcial.
    destroySaga //Elimina una saga de la base de datos.
};
