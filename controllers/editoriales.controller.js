// const db = require("../db/db");

// // Crear una nueva editorial
// const storeEditorial = (req, res) => {
//     const { nombre_editorial, pais, sitio_web } = req.body;
//     const sql = "INSERT INTO editoriales (nombre_editorial, pais, sitio_web) VALUES (?, ?, ?)";
//     db.query(sql, [nombre_editorial, pais, sitio_web], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.status(201).json({ id_editorial: result.insertId, ...req.body });
//     });
// };

// // Obtener todas las editoriales
// const getAllEditorials = (req, res) => {
//     const sql = "SELECT * FROM editoriales";
//     db.query(sql, (error, rows) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json(rows);
//     });
// };

// // Editar una editorial
// const updateEditorial = (req, res) => {
//     const { id_editorial } = req.params;
//     const { nombre_editorial, pais, sitio_web } = req.body;
//     const sql = "UPDATE editoriales SET nombre_editorial = ?, pais = ?, sitio_web = ? WHERE id_editorial = ?";
//     db.query(sql, [nombre_editorial, pais, sitio_web, id_editorial], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json({ message: "Editorial actualizada", ...req.body });
//     });
// };

// // Eliminar una editorial
// const deleteEditorial = (req, res) => {
//     const { id_editorial } = req.params;
//     const sql = "DELETE FROM editoriales WHERE id_editorial = ?";
//     db.query(sql, [id_editorial], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json({ message: "Editorial eliminada" });
//     });
// };

// module.exports = {
//     storeEditorial,
//     getAllEditorials,
//     updateEditorial,
//     deleteEditorial
// };
