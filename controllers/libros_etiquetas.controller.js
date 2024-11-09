const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para obtener todas las relaciones entre libros y etiquetas
const allLibrosEtiquetas = (req, res) => {
    const sql = "SELECT * FROM libros_etiquetas"; // Seleccionamos todas las relaciones entre libros y etiquetas
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con todas las relaciones en formato JSON
    });
};

// Para obtener las etiquetas de un libro específico
const showEtiquetasByLibro = (req, res) => {
    const {id_libro} = req.params;
    const sql = "SELECT e.* FROM etiquetas e INNER JOIN libros_etiquetas le ON e.id_etiqueta = le.id_etiqueta WHERE le.id_libro = ?";
    db.query(sql, [id_libro], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con las etiquetas del libro en formato JSON
    });
};

// Para obtener los libros de una etiqueta específica
const showLibrosByEtiqueta = (req, res) => {
    const {id_etiqueta} = req.params;
    const sql = "SELECT l.* FROM libros l INNER JOIN libros_etiquetas le ON l.id_libro = le.id_libro WHERE le.id_etiqueta = ?";
    db.query(sql, [id_etiqueta], (error, rows) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.json(rows); // Respondemos con los libros de la etiqueta en formato JSON
    });
};

//// METODO POST  ////
// Crear una nueva relación entre un libro y una etiqueta
const storeLibroEtiqueta = (req, res) => {
    const {id_libro, id_etiqueta} = req.body;
    const sql = "INSERT INTO libros_etiquetas (id_libro, id_etiqueta) VALUES (?, ?)";
    db.query(sql, [id_libro, id_etiqueta], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        res.status(201).json({id_libro, id_etiqueta}); // Respondemos con la relación creada
    });
};

//// METODO DELETE ////
// Eliminar una relación entre un libro y una etiqueta
const destroyLibroEtiqueta = (req, res) => {
    const {id_libro, id_etiqueta} = req.params;
    const sql = "DELETE FROM libros_etiquetas WHERE id_libro = ? AND id_etiqueta = ?";
    db.query(sql, [id_libro, id_etiqueta], (error, result) => {
        if (error) {
            return res.status(500).json({error: "ERROR: Intente más tarde por favor"});
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({error: "ERROR: La relación entre libro y etiqueta no existe"});
        }
        res.json({mensaje: "Relación entre libro y etiqueta eliminada con éxito"});
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allLibrosEtiquetas, //Obtiene todas las relaciones entre libros y etiquetas.
    showEtiquetasByLibro, //Obtiene todas las etiquetas asociadas a un libro dado su id_libro.
    showLibrosByEtiqueta, //Obtiene todos los libros asociados a una etiqueta dada su id_etiqueta.
    storeLibroEtiqueta, //Crea una nueva relación entre un libro y una etiqueta.
    destroyLibroEtiqueta //Elimina una relación entre un libro y una etiqueta.
};
