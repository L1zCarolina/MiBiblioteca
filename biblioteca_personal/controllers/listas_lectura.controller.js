const db = require("../db/db");

const allReadingLists = (req, res) => {
    const sql = "SELECT * FROM listas_lectura";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        res.json(rows);
    }); 
};

const showReadingList = (req, res) => {
    const {id_lista} = req.params;
    const sql = "SELECT * FROM listas_lectura WHERE id_lista = ?";
    db.query(sql,[id_lista], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la lista de lectura buscada"});
        };
        res.json(rows[0]);
    }); 
};

const storeReadingList = (req, res) => {
    const {id_usuario, nombre, descripcion} = req.body;
    const sql = "INSERT INTO listas_lectura (id_usuario, nombre, descripcion) VALUES (?, ?, ?)";
    db.query(sql,[id_usuario, nombre, descripcion], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        const lista = {...req.body, id_lista: result.insertId};
        res.status(201).json(lista);
    });     
};

const updateReadingList = (req, res) => {
    const {id_lista} = req.params;
    const {id_usuario, nombre, descripcion} = req.body;
    const sql ="UPDATE listas_lectura SET id_usuario = ?, nombre = ?, descripcion = ? WHERE id_lista = ?";
    db.query(sql,[id_usuario, nombre, descripcion, id_lista], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La lista de lectura a modificar no existe"});
        };
        const lista = {...req.body, ...req.params};
        res.json(lista);
    });     
};

const destroyReadingList = (req, res) => {
    const {id_lista} = req.params;
    const sql = "DELETE FROM listas_lectura WHERE id_lista = ?";
    db.query(sql,[id_lista], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La lista de lectura a borrar no existe"});
        };
        res.json({mensaje : "Lista de Lectura Eliminada"});
    }); 
};

module.exports = {
    allReadingLists,
    showReadingList,
    storeReadingList,
    updateReadingList,
    destroyReadingList
};