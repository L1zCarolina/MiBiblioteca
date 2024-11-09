const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para todas las citas
const allCitas = (req, res) => {
    const sql = "SELECT * FROM citas"; // Seleccionamos todas las citas
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con las citas en formato JSON
    });
};

// Para una cita específica
const showCita = (req, res) => {
    const {id_cita} = req.params;
    const sql = "SELECT * FROM citas WHERE id_cita = ?";
    db.query(sql, [id_cita], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length == 0) {
            return res.status(404).send({error: "ERROR: No existe la cita que busca"});
        }
        res.json(rows[0]); // Respondemos con la cita encontrada
    });
};

//// METODO POST  ////
// Crear una nueva cita
const storeCita = (req, res) => {
    const {id_libro, texto_cita, fecha} = req.body;
    const sql = "INSERT INTO citas (id_libro, texto_cita, fecha) VALUES (?, ?, ?)";
    db.query(sql, [id_libro, texto_cita, fecha], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        const cita = { ...req.body, id_cita: result.insertId }; // Reconstruimos el objeto del body con el id
        res.status(201).json(cita); // Respondemos con la cita creada
    });
};

//// METODO PUT  ////
// Actualizar una cita completamente
const updateCita = (req, res) => {
    const {id_cita} = req.params;
    const {id_libro, texto_cita, fecha} = req.body;
    const sql = "UPDATE citas SET id_libro = ?, texto_cita = ?, fecha = ? WHERE id_cita = ?";
    db.query(sql, [id_libro, texto_cita, fecha, id_cita], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La cita a modificar no existe"});
        }
        const cita = {id_cita, id_libro, texto_cita, fecha};
        res.json(cita); // Respondemos con la cita actualizada
    });
};

//// METODO PATCH ////
// Actualizar parcialmente una cita
const updatePartialCita = (req, res) => {
    const {id_cita} = req.params;
    const {id_libro, texto_cita, fecha} = req.body;

    const updates = [];
    const values = [];

    if (id_libro) {
        updates.push("id_libro = ?");
        values.push(id_libro);
    }

    if (texto_cita) {
        updates.push("texto_cita = ?");
        values.push(texto_cita);
    }

    if (fecha) {
        updates.push("fecha = ?");
        values.push(fecha);
    }

    if (updates.length === 0) {
        return res.status(400).json({error: "No se especificaron campos para actualizar"});
    }

    const sql = `UPDATE citas SET ${updates.join(", ")} WHERE id_cita = ?`;
    values.push(id_cita); // Agregamos el id_cita al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La cita a modificar no existe"});
        }
        const cita = {id_cita, ...req.body}; // Reconstruimos el objeto actualizado
        res.json(cita); // Devolvemos la cita actualizada
    });
};

//// METODO DELETE ////
// Eliminar una cita
const destroyCita = (req, res) => {
    const {id_cita} = req.params;
    const sql = "DELETE FROM citas WHERE id_cita = ?";
    db.query(sql, [id_cita], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La cita a eliminar no existe"});
        }
        res.json({mensaje: "Cita eliminada con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allCitas, // Obtiene todas las citas de la base de datos.
    showCita, // Obtiene una cita específica por su id_cita.
    storeCita, // Crea una nueva cita en la base de datos.
    updateCita, // Actualiza completamente una cita, basado en su id_cita.
    updatePartialCita, // Permite actualizar algunos campos de una cita de manera parcial.
    destroyCita // Elimina una cita de la base de datos.
};
