/// CONTROLADORES DEL MODULO ///

// Campos de la tabla generos
// id_genero
// nombre_genero

const db = require("../db/db"); // se va a requerir la info desde la base de datos que esta en la carpeta db.

//---------------- METODOS HTTP ---------------------///

//// METODO GET  /////

// Para todos los generos
//Es un callback porque es una función que como parámetro tiene otras funciones en este caso es el recuest(requerimiento) y el respon(respuesta). 
//=> es una funcion flecha que simplifica la escritura del estandar de como se define una función.

const allGenre = (req, res) => { 
    const sql = "SELECT * FROM generos"; //Dentro de esta funcion le decimos que cree el sql y que seleccione todo de generos
    //En esta 2da linea ejecutamos el query diciendole que ejecute lo que esta guardado en la variable sql
    //se arma de nuevo una funcion callback y una funcion flecha al cual le decimos que use la funcion error y rows(fila).
    //si error es verdadero, porque eso me va a devolver V o F, le decimos que retorne un error de 500 e intente mas tarde...
    //si error es falso, no va a estar ahi y va a responder con un Json
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"}); //manda un msj al usuario para que no se quede colgado de que paso algo
        }
        res.json(rows); // Json va a armar el objeto json como {atributos: valor del atributo}
    }); 
};

// Para un genero
const showGenre = (req, res) => {
    const {id_genero} = req.params;
    const sql = "SELECT * FROM generos WHERE id_genero = ?";
    db.query(sql,[id_genero], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el genero que busca"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeGenre = (req, res) => {
    const {nombre_genero} = req.body;
    const sql = "INSERT INTO generos (nombre_genero) VALUES (?)";
    db.query(sql,[nombre_genero], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const genero = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(genero); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateGenre = (req, res) => {
  const {id_genero} = req.params;
  const {nombre_genero} = req.body;

  // Asegúrate de incluir la cláusula WHERE en la consulta SQL
  const sql = "UPDATE generos SET nombre_genero = ? WHERE id_genero = ?";
  db.query(sql, [nombre_genero, id_genero], (error, result) => {
      console.log(result);
      if (error) {
          return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
      }
      if (result.affectedRows == 0) {
          return res.status(404).send({error : "ERROR: El género a modificar no existe"});
      }

      const genero = {id_genero, nombre_genero}; // Reconstruimos el objeto actualizado
      res.json(genero); // Devuelve el género actualizado
  });     
};


//// METODO PATCH ////
const updatePartialGenre = (req, res) => {
  const {id_genero} = req.params;
  const {nombre_genero} = req.body;

  // Creamos un array de campos a actualizar y sus valores
  const updates = [];
  const values = [];

  // Agregamos campos solo si están presentes en el cuerpo de la solicitud
  if (nombre_genero) {
      updates.push("nombre_genero = ?");
      values.push(nombre_genero);
  }

  // Si no se especifica ningún campo para actualizar
  if (updates.length === 0) {
      return res.status(400).json({ error: "No se especificaron campos para actualizar" });
  }

  // Unimos los campos para la consulta
  const sql = `UPDATE generos SET ${updates.join(", ")} WHERE id_genero = ?`;
  values.push(id_genero); // Agregamos el id_genero al final de los valores

  db.query(sql, values, (error, result) => {
      console.log(result);
      if (error) {
          return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
      }
      if (result.affectedRows == 0) {
          return res.status(404).send({ error: "ERROR: El genero a modificar no existe" });
      }

      const genero = { id_genero, ...req.body }; // Reconstruimos el objeto del body
      res.json(genero); // Devolvemos el objeto actualizado
  });
};


//// METODO DELETE ////
const destroyGenre = (req, res) => {
    const {id_genero} = req.params;
    const sql = "DELETE FROM generos WHERE id_genero = ?";
    db.query(sql,[id_genero], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El genero a eliminar no existe"});
        };
        res.json({mesaje : "Genero Eliminada"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allGenre, //Obtiene todos los generos de la base de datos y responde con una lista de ellos.

    showGenre, //Obtiene un genero específico según el id_genero proporcionado en los parámetros de la solicitud.
    storeGenre, //Crea un nuevo genero
    updateGenre, // Actualiza los datos de un genero existente. Si se proporciona una nueva.
    updatePartialGenre, //Permite actualizar solo algunos campos del genero en lugar de todos.
    destroyGenre // Elimina un genero de la base de datos según el id_genero.
};
