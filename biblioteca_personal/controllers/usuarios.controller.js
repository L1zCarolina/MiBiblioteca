const db = require("../db/db");
const bcrypt = require('bcrypt');

const allUsers = (req, res) => {
    const sql = "SELECT id_usuario, nombre, email, fecha_registro FROM usuarios";
    db.query(sql, (error, rows) => {
        if(error) {
            return res.status(500).json({error : "Error al obtener usuarios"});
        }
        res.json(rows);
    });
};

const showUser = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "SELECT id_usuario, nombre, email, fecha_registro FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id_usuario], (error, rows) => {
        if(error) {
            return res.status(500).json({error : "Error al obtener el usuario"});
        }
        if(rows.length === 0) {
            return res.status(404).json({error : "Usuario no encontrado"});
        }
        res.json(rows[0]);
    });
};

const storeUser = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
      db.query(sql, [nombre, email, hashedPassword], (error, result) => {
          if (error) {
              console.error("Error en la inserción:", error); // Agrega un log para ver el error
              return res.status(500).json({ error: "Error al crear el usuario" });
          }
          console.log("Resultado de la inserción:", result); // Log para ver el resultado
          res.status(201).json({ id: result.insertId, nombre, email });
      });
  } catch (error) {
      console.error("Error al hashear la contraseña:", error); // Log para errores en el hash
      res.status(500).json({ error: "Error al crear el usuario" });
  }
};


const updateUser = async (req, res) => {
    const {id_usuario} = req.params;
    const {nombre, email, password} = req.body;
    try {
        let sql, params;
        if(password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            sql = "UPDATE usuarios SET nombre = ?, email = ?, password = ? WHERE id_usuario = ?";
            params = [nombre, email, hashedPassword, id_usuario];
        } else {
            sql = "UPDATE usuarios SET nombre = ?, email = ? WHERE id_usuario = ?";
            params = [nombre, email, id_usuario];
        }
        db.query(sql, params, (error, result) => {
            if(error) {
                return res.status(500).json({error : "Error al actualizar el usuario"});
            }
            if(result.affectedRows === 0) {
                return res.status(404).json({error : "Usuario no encontrado"});
            }
            res.json({id_usuario, nombre, email});
        });
    } catch (error) {
        res.status(500).json({error : "Error al actualizar el usuario"});
    }
};

const destroyUser = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id_usuario], (error, result) => {
        if(error) {
            return res.status(500).json({error : "Error al eliminar el usuario"});
        }
        if(result.affectedRows === 0) {
            return res.status(404).json({error : "Usuario no encontrado"});
        }
        res.json({mensaje : "Usuario eliminado"});
    });
};

module.exports = {
    allUsers,
    showUser,
    storeUser,
    updateUser,
    destroyUser
};