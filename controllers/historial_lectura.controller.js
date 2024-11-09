const db = require("../db/db"); // Requerimos la información desde la base de datos

//---------------- METODOS HTTP ---------------------///

//// METODO GET  /////

// Para todos los registros de historial de lectura
const allHistorialLectura = (req, res) => {
    const sql = "SELECT * FROM historial_lectura"; // Seleccionamos todos los registros de historial de lectura
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con los registros en formato JSON
    });
};

// Para un historial de lectura específico
const showHistorialLectura = (req, res) => {
    const {id_historial} = req.params;
    const sql = "SELECT * FROM historial_lectura WHERE id_historial = ?";
    db.query(sql, [id_historial], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length == 0) {
            return res.status(404).send({error: "ERROR: No existe el historial que busca"});
        }
        res.json(rows[0]); // Respondemos con el historial encontrado
    });
};

//// METODO POST  ////
// Crear un nuevo registro en el historial de lectura
const storeHistorialLectura = (req, res) => {
    const {id_libro, id_usuario, fecha_lectura, estado} = req.body;
    const sql = "INSERT INTO historial_lectura (id_libro, id_usuario, fecha_lectura, estado) VALUES (?, ?, ?, ?)";
    db.query(sql, [id_libro, id_usuario, fecha_lectura, estado], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        const historialCreado = { ...req.body, id_historial: result.insertId }; // Reconstruimos el objeto con el id
        res.status(201).json(historialCreado); // Respondemos con el historial creado
    });
};

//// METODO PUT  ////
// Actualizar un registro de historial de lectura completamente
const updateHistorialLectura = (req, res) => {
    const {id_historial} = req.params;
    const {id_libro, id_usuario, fecha_lectura, estado} = req.body;
    const sql = "UPDATE historial_lectura SET id_libro = ?, id_usuario = ?, fecha_lectura = ?, estado = ? WHERE id_historial = ?";
    db.query(sql, [id_libro, id_usuario, fecha_lectura, estado, id_historial], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El historial a modificar no existe"});
        }
        const historialActualizado = {id_historial, id_libro, id_usuario, fecha_lectura, estado};
        res.json(historialActualizado); // Respondemos con el historial actualizado
    });
};

//// METODO PATCH ////
// Actualizar parcialmente un registro de historial de lectura
const updatePartialHistorialLectura = (req, res) => {
    const {id_historial} = req.params;
    const {id_libro, id_usuario, fecha_lectura, estado} = req.body;

    const updates = [];
    const values = [];

    if (id_libro) {
        updates.push("id_libro = ?");
        values.push(id_libro);
    }

    if (id_usuario) {
        updates.push("id_usuario = ?");
        values.push(id_usuario);
    }

    if (fecha_lectura) {
        updates.push("fecha_lectura = ?");
        values.push(fecha_lectura);
    }

    if (estado) {
        updates.push("estado = ?");
        values.push(estado);
    }

    if (updates.length === 0) {
        return res.status(400).json({error: "No se especificaron campos para actualizar"});
    }

    const sql = `UPDATE historial_lectura SET ${updates.join(", ")} WHERE id_historial = ?`;
    values.push(id_historial); // Agregamos el id_historial al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El historial a modificar no existe"});
        }
        const historialActualizado = {id_historial, ...req.body}; // Reconstruimos el objeto actualizado
        res.json(historialActualizado); // Devolvemos el historial actualizado
    });
};

//// METODO DELETE ////
// Eliminar un registro del historial de lectura
const destroyHistorialLectura = (req, res) => {
    const {id_historial} = req.params;
    const sql = "DELETE FROM historial_lectura WHERE id_historial = ?";
    db.query(sql, [id_historial], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: El historial a eliminar no existe"});
        }
        res.json({mensaje: "Historial de lectura eliminado con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allHistorialLectura, // Obtiene todos los registros del historial de lectura.
    showHistorialLectura, // Obtiene un registro específico del historial de lectura por id_historial.
    storeHistorialLectura, // Crea un nuevo registro de historial de lectura.
    updateHistorialLectura, // Actualiza completamente un registro de historial de lectura, basado en su id_historial.
    updatePartialHistorialLectura, // Permite actualizar algunos campos de un registro de historial de lectura de manera parcial.
    destroyHistorialLectura // Elimina un registro del historial de lectura de la base de datos.
};
