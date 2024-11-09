// // CONTROLADOR DEL MODULO LIBROS_LISTA
// const db = require("../db/db"); // Requerimos la base de datos

// // Obtener todos los libros de todas las listas
// const allBooksInLists = (req, res) => {
//     const sql = "SELECT * FROM libros_lista";
//     db.query(sql, (error, rows) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json(rows); // Retornamos todos los registros de libros en listas
//     });
// };

// // Obtener libros de una lista específica
// const showBooksInList = (req, res) => {
//     const { id_lista } = req.params;
//     const sql = "SELECT * FROM libros_lista WHERE id_lista = ?";
//     db.query(sql, [id_lista], (error, rows) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         if (rows.length === 0) {
//             return res.status(404).send({ error: "ERROR: No existen libros en esta lista" });
//         }
//         res.json(rows); // Retorna los libros de la lista especificada
//     });
// };

// // Crear un nuevo registro de libro en lista
// const storeBookInList = (req, res) => {
//     const { id_lista, id_libro, fecha_agregado } = req.body;
//     const sql = "INSERT INTO libros_lista (id_lista, id_libro, fecha_agregado) VALUES (?, ?, ?)";
//     db.query(sql, [id_lista, id_libro, fecha_agregado], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         const libroLista = { id_libro_lista: result.insertId, id_lista, id_libro, fecha_agregado };
//         res.status(201).json(libroLista); // Retorna el nuevo registro creado
//     });
// };

// // Eliminar un libro de una lista
// const destroyBookFromList = (req, res) => {
//     const { id_libro_lista } = req.params;
//     const sql = "DELETE FROM libros_lista WHERE id_libro_lista = ?";
//     db.query(sql, [id_libro_lista], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).send({ error: "ERROR: El libro no existe en la lista" });
//         }
//         res.json({ mensaje: "Libro eliminado de la lista" }); // Mensaje de éxito
//     });
// };

// // EXPORTAR DEL MODULO TODAS LAS FUNCIONES
// module.exports = {
//     allBooksInLists,    // Obtiene todos los libros en listas
//     showBooksInList,    // Obtiene los libros de una lista específica
//     storeBookInList,    // Crea un nuevo libro en lista
//     destroyBookFromList // Elimina un libro de una lista
// };
