const db = require("../db/db");

const allReviews = (req, res) => {
    const sql = "SELECT * FROM resenas";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        res.json(rows);
    }); 
};

const showReview = (req, res) => {
    const {id_resena} = req.params;
    const sql = "SELECT * FROM resenas WHERE id_resena = ?";
    db.query(sql,[id_resena], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la reseña buscada"});
        };
        res.json(rows[0]);
    }); 
};

const storeReview = (req, res) => {
    const {id_libro, id_usuario, calificacion, comentario} = req.body;
    const sql = "INSERT INTO resenas (id_libro, id_usuario, calificacion, comentario, fecha_resena) VALUES (?, ?, ?, ?, NOW())";
    db.query(sql,[id_libro, id_usuario, calificacion, comentario], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        const resena = {...req.body, id_resena: result.insertId, fecha_resena: new Date()};
        res.status(201).json(resena);
    });     
};

const updateReview = (req, res) => {
    const {id_resena} = req.params;
    const {id_libro, id_usuario, calificacion, comentario} = req.body;
    const sql ="UPDATE resenas SET id_libro = ?, id_usuario = ?, calificacion = ?, comentario = ? WHERE id_resena = ?";
    db.query(sql,[id_libro, id_usuario, calificacion, comentario, id_resena], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La reseña a modificar no existe"});
        };
        const resena = {...req.body, ...req.params};
        res.json(resena);
    });     
};

const destroyReview = (req, res) => {
    const {id_resena} = req.params;
    const sql = "DELETE FROM resenas WHERE id_resena = ?";
    db.query(sql,[id_resena], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La reseña a borrar no existe"});
        };
        res.json({mensaje : "Reseña Eliminada"});
    }); 
};

module.exports = {
    allReviews,
    showReview,
    storeReview,
    updateReview,
    destroyReview
};