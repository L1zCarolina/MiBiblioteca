/// CONTROLADORES DEL MODULO /// 

// Campos de la tabla usuarios
// id_usuario
// nombre_usuario
// email_usuario
// password
// fecha_registro
// foto_perfil
// rol

/// Controladores del modulo
const db = require("../db/db"); // Se importa la conexión a la base de datos desde la carpeta db.
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//---------------- METODOS HTTP ---------------------///

//// METODO GET  /////

// Para todos los usuarios
const allUsers = (req, res) => { 
    const sql = "SELECT id_usuario, nombre_usuario, email_usuario, fecha_registro, foto_perfil, rol FROM usuarios"; 
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows); 
    }); 
};

// Para un usuario específico
const showUser = (req, res) => {
    const { id_usuario } = req.params;
    const sql = "SELECT id_usuario, nombre_usuario, email_usuario, fecha_registro, foto_perfil, rol FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id_usuario], (error, rows) => {
        if (error) return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        if (rows.length == 0) return res.status(404).send({ error: "ERROR: Usuario no encontrado" });
        res.json(rows[0]); 
    }); 
};

//// METODO POST  ////
// Para crear un nuevo usuario, incluyendo la subida de foto de perfil
const storeUser = (req, res) => {
  console.log("Body recibido:", req.body);
  console.log("Archivo recibido:", req.file);
  const foto_perfil = req.file ? req.file.filename : null;
  const { nombre_usuario, email_usuario, password, rol = "usuario" } = req.body;

  if (!nombre_usuario || !email_usuario || !password) {
      return res.status(400).send({ error: "Error 400 POST: Campos incompletos", camposFaltantes: { nombre_usuario, email_usuario, password } });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send("Error de encriptación");

      const sql = "INSERT INTO usuarios (nombre_usuario, email_usuario, password, foto_perfil, rol) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [nombre_usuario, email_usuario, hashedPassword, foto_perfil, rol], (error, result) => {
          if (error) return res.status(500).json({ error: "ERROR al crear el usuario: Intente más tarde por favor" });

          //const usuario = { ...req.body, id_usuario: result.insertId };
          res.status(201).json({ id_usuario: result.insertId, nombre_usuario, email_usuario, rol, foto_perfil });

      });
  });
};

//// METODO PUT  ////
// Para actualizar todo el usuario
const updateUser = (req, res) => {
  let imagenAsubir = req.file ? req.file.filename : null;
  const { id_usuario } = req.params;
  const { nombre_usuario, email_usuario, password, rol } = req.body;

  // Validación de campos faltantes
  const camposFaltantes = [];
  const camposRequeridos = ['nombre_usuario', 'email_usuario', 'password', 'rol'];

  camposRequeridos.forEach(campo => {
    if (!req.body[campo]) {
      camposFaltantes.push(campo);
    }
  });

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      message: 'Campos faltantes para actualizar el usuario.',
      camposFaltantes: camposFaltantes
    });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send("Error de encriptación");

      const sql = "UPDATE usuarios SET nombre_usuario=?, email_usuario=?, password=?, foto_perfil=?, rol=? WHERE id_usuario=?";
      db.query(sql, [nombre_usuario, email_usuario, hashedPassword, imagenAsubir, rol, id_usuario], (error, result) => {
          if (error) return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
          if (result.affectedRows == 0) return res.status(404).send({ error: "ERROR: El usuario no existe" });

          const usuario = { ...req.body, id_usuario };
          res.json(usuario);
      });
  });
};

//// METODO PATCH ////

// Función para actualizar parcialmente un usuario
const updatePartialUser = (req, res) => {
  const userId = req.params.id_usuario; // Obtener el id del usuario desde los parámetros de la URL
  const updatedData = req.body; // Obtener los datos a actualizar desde el cuerpo de la solicitud
  const foto_perfil = req.file ? req.file.filename : null;

  // Asegurarse de que se proporcionaron datos válidos
  if (Object.keys(updatedData).length === 0 && !foto_perfil) {
    return res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
  }

  // // Validación de campos faltantes
  // const camposFaltantes = [];
  // const camposRequeridos = ['nombre_usuario', 'email_usuario', 'password', 'rol'];

  // camposRequeridos.forEach(campo => {
  //   if (!updatedData[campo]) {
  //     camposFaltantes.push(campo);
  //   }
  // });

  // if (camposFaltantes.length > 0) {
  //   return res.status(400).json({
  //     message: 'Campos faltantes para actualizar.',
  //     camposFaltantes: camposFaltantes
  //   });
  // }

  // Si todos los campos están presentes, proceder con la actualización
  const sql = "UPDATE usuarios SET nombre_usuario=?, email_usuario=?, password=?, rol=? WHERE id_usuario=?";
  
  db.query(sql, [
    updatedData.nombre_usuario,
    updatedData.email_usuario,
    updatedData.password,
    updatedData.rol,
    userId
  ], (error, result) => {
    if (error) return res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  });
};

//// METODO DELETE ////
// Para eliminar un usuario
const destroyUser = (req, res) => {
  const { id_usuario } = req.params;
  const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
  db.query(sql, [id_usuario], (error, result) => {
      if (error) return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
      if (result.affectedRows == 0) return res.status(404).send({ error: "ERROR: El usuario no existe" });

      res.json({ mensaje: "Usuario eliminado" });
  });
};

// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allUsers, 
    showUser, 
    storeUser, 
    updateUser, 
    updatePartialUser, 
    destroyUser 
};
