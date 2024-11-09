const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para todas las etiquetas
const allEtiquetas = (req, res) => {
    const sql = "SELECT * FROM etiquetas"; // Seleccionamos todas las etiquetas
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con todas las etiquetas en formato JSON
    });
};

// Para una etiqueta específica
const showEtiqueta = (req, res) => {
    const {id_etiqueta} = req.params;
    const sql = "SELECT * FROM etiquetas WHERE id_etiqueta = ?";
    db.query(sql, [id_etiqueta], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (rows.length == 0) {
            return res.status(404).send({error: "ERROR: No existe la etiqueta que busca"});
        }
        res.json(rows[0]); // Respondemos con la etiqueta encontrada
    });
};

//// METODO POST  ////
// Crear una nueva etiqueta
const storeEtiqueta = (req, res) => {
    const {nombre_etiqueta} = req.body;
    const sql = "INSERT INTO etiquetas (nombre_etiqueta) VALUES (?)";
    db.query(sql, [nombre_etiqueta], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        const etiquetaCreada = {id_etiqueta: result.insertId, nombre_etiqueta}; // Reconstruimos el objeto con el id
        res.status(201).json(etiquetaCreada); // Respondemos con la etiqueta creada
    });
};

//// METODO PUT  ////
// Actualizar una etiqueta completamente
const updateEtiqueta = (req, res) => {
    const {id_etiqueta} = req.params;
    const {nombre_etiqueta} = req.body;
    const sql = "UPDATE etiquetas SET nombre_etiqueta = ? WHERE id_etiqueta = ?";
    db.query(sql, [nombre_etiqueta, id_etiqueta], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La etiqueta a modificar no existe"});
        }
        const etiquetaActualizada = {id_etiqueta, nombre_etiqueta};
        res.json(etiquetaActualizada); // Respondemos con la etiqueta actualizada
    });
};

//// METODO PATCH ////
// Actualizar parcialmente una etiqueta
const updatePartialEtiqueta = (req, res) => {
    const {id_etiqueta} = req.params;
    const {nombre_etiqueta} = req.body;

    const updates = [];
    const values = [];

    if (nombre_etiqueta) {
        updates.push("nombre_etiqueta = ?");
        values.push(nombre_etiqueta);
    }

    if (updates.length === 0) {
        return res.status(400).json({error: "No se especificaron campos para actualizar"});
    }

    const sql = `UPDATE etiquetas SET ${updates.join(", ")} WHERE id_etiqueta = ?`;
    values.push(id_etiqueta); // Agregamos el id_etiqueta al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La etiqueta a modificar no existe"});
        }
        const etiquetaActualizada = {id_etiqueta, ...req.body}; // Reconstruimos el objeto actualizado
        res.json(etiquetaActualizada); // Devolvemos la etiqueta actualizada
    });
};

//// METODO DELETE ////
// Eliminar una etiqueta
const destroyEtiqueta = (req, res) => {
    const {id_etiqueta} = req.params;
    const sql = "DELETE FROM etiquetas WHERE id_etiqueta = ?";
    db.query(sql, [id_etiqueta], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La etiqueta a eliminar no existe"});
        }
        res.json({mensaje: "Etiqueta eliminada con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allEtiquetas, //Obtiene todas las etiquetas de la base de datos.
    showEtiqueta, //Obtiene una etiqueta específica por id_etiqueta.
    storeEtiqueta, //Crea una nueva etiqueta en la base de datos.
    updateEtiqueta, //Crea una nueva etiqueta en la base de datos.
    updatePartialEtiqueta, //Permite actualizar algunos campos de una etiqueta de manera parcial.
    destroyEtiqueta //Elimina una etiqueta de la base de datos.
};
