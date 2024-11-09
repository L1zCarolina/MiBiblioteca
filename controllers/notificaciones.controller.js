// const db = require("../db/db");

// // Crear una nueva notificación
// const storeNotification = (req, res) => {
//     const { id_usuario, contenido, fecha_envio, estado } = req.body;
//     const sql = "INSERT INTO notificaciones (id_usuario, contenido, fecha_envio, estado) VALUES (?, ?, ?, ?)";
//     db.query(sql, [id_usuario, contenido, fecha_envio, estado], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.status(201).json({ id_notificacion: result.insertId, ...req.body });
//     });
// };

// // Obtener todas las notificaciones de un usuario
// const getNotificationsByUser = (req, res) => {
//     const { id_usuario } = req.params;
//     const sql = "SELECT * FROM notificaciones WHERE id_usuario = ?";
//     db.query(sql, [id_usuario], (error, rows) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json(rows);
//     });
// };

// // Editar una notificación
// const updateNotification = (req, res) => {
//     const { id_notificacion } = req.params;
//     const { contenido, estado } = req.body;
//     const sql = "UPDATE notificaciones SET contenido = ?, estado = ? WHERE id_notificacion = ?";
//     db.query(sql, [contenido, estado, id_notificacion], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json({ message: "Notificación actualizada", ...req.body });
//     });
// };

// // Eliminar una notificación
// const deleteNotification = (req, res) => {
//     const { id_notificacion } = req.params;
//     const sql = "DELETE FROM notificaciones WHERE id_notificacion = ?";
//     db.query(sql, [id_notificacion], (error, result) => {
//         if (error) {
//             return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
//         }
//         res.json({ message: "Notificación eliminada" });
//     });
// };

// module.exports = {
//     storeNotification,
//     getNotificationsByUser,
//     updateNotification,
//     deleteNotification
// };
