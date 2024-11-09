// const db = require("../db/db");

// // Crear una nueva reseña
// const storeReview = (req, res) => {
//     const { id_libro, id_usuario, titulo, contenido, puntuacion, fecha_resena } = req.body;
//     const sql = "INSERT INTO reseñas (id_libro, id_usuario, titulo, contenido, puntuacion, fecha_resena) VALUES (?, ?, ?, ?, ?, ?)";
//     db.query(sql, [id_libro, id_usuario, titulo, contenido, puntuacion, fecha_resena], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.status(201).json({ id_resena: result.insertId, ...req.body });
//     });
// };

// // Obtener todas las reseñas de un libro
// const getReviewsByBook = (req, res) => {
//     const { id_libro } = req.params;
//     const sql = "SELECT * FROM reseñas WHERE id_libro = ?";
//     db.query(sql, [id_libro], (error, rows) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json(rows);
//     });
// };

// // Obtener reseñas por usuario
// const getReviewsByUser = (req, res) => {
//     const { id_usuario } = req.params;
//     const sql = "SELECT * FROM reseñas WHERE id_usuario = ?";
//     db.query(sql, [id_usuario], (error, rows) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json(rows);
//     });
// };

// // Editar una reseña (PUT/PATCH)
// const updateReview = (req, res) => {
//     const { id_resena } = req.params;
//     const { titulo, contenido, puntuacion, fecha_resena } = req.body;
//     const sql = "UPDATE reseñas SET titulo = ?, contenido = ?, puntuacion = ?, fecha_resena = ? WHERE id_resena = ?";
//     db.query(sql, [titulo, contenido, puntuacion, fecha_resena, id_resena], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json({ message: "Reseña actualizada", ...req.body });
//     });
// };

// // Eliminar una reseña
// const deleteReview = (req, res) => {
//     const { id_resena } = req.params;
//     const sql = "DELETE FROM reseñas WHERE id_resena = ?";
//     db.query(sql, [id_resena], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json({ message: "Reseña eliminada" });
//     });
// };

// module.exports = {
//     storeReview,
//     getReviewsByBook,
//     getReviewsByUser,
//     updateReview,
//     deleteReview
// };
