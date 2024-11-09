/// CONTROLADORES DEL MODULO ///

// Campos de la tabla libros
// id_libro, 
// titulo, 
// autor_id, 
// genero_id, 
// descripcion, 
// puntuacion, 
// estado,
// portada
// fecha_creacion

const db = require("../db/db"); // Requerimos la información desde la base de datos

//// METODO GET  /////

// Para todos los libros
const allBooks = (req, res) => {
    const sql = "SELECT * FROM libros";  // Seleccionamos todos los libros
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};

// Para obtener un libro especifico o por ID
const showBook = (req, res) => {
    const { id_libro } = req.params;
    const sql = "SELECT * FROM libros WHERE id_libro = ?";
    db.query(sql, [id_libro], (error, rows) => {
        console.log(rows);
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length === 0) {
            return res.status(404).send({ error: "ERROR: No existe el libro que busca" });
        }
        res.json(rows[0]); // Respondemos con el libro encontrado
    });
};

//// METODO POST  ////
// Crear un nuevo libro
const storeBook = (req, res) => {
    const { titulo, autor_id, genero_id, descripcion, puntuacion, estado, portada } = req.body;
    const sql = "INSERT INTO libros (titulo, autor_id, genero_id, descripcion, puntuacion, estado, portada) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [titulo, autor_id, genero_id, descripcion, puntuacion, estado, portada], (error, result) => {
        console.log(result);
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const libro = { ...req.body, id: result.insertId }; // Reconstruimos el objeto del body con el id
        res.status(201).json(libro); // muestra creado con éxito el elemento
    });
};

//// METODO PUT  ////
// Actualizar un libro completamente
const updatePartialBook = (req, res) => {
    const { id_libro } = req.params;
    const { titulo, autor_id, genero_id, descripcion, puntuacion, estado, portada } = req.body;

    const updates = [];
    const values = [];

    if (titulo) {
        updates.push("titulo = ?");
        values.push(titulo);
    }
    if (autor_id) {
        updates.push("autor_id = ?");
        values.push(autor_id);
    }
    if (genero_id) {
        updates.push("genero_id = ?");
        values.push(genero_id);
    }
    if (descripcion) {
        updates.push("descripcion = ?");
        values.push(descripcion);
    }
    if (puntuacion) {
        updates.push("puntuacion = ?");
        values.push(puntuacion);
    }
    if (estado) {
        updates.push("estado = ?");
        values.push(estado);
    }
    if (portada) {
        updates.push("portada = ?");
        values.push(portada);
    }

    if (updates.length === 0) {
        return res.status(400).json({ error: "No se especificaron campos para actualizar" });
    }

    const sql = `UPDATE libros SET ${updates.join(", ")} WHERE id_libro = ?`;
    values.push(id_libro); // Agregamos el id_libro al final de los valores

    db.query(sql, values, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El libro a modificar no existe" });
        }
        const libro = { id_libro, ...req.body }; // Reconstruimos el objeto actualizado
        res.json(libro); // Devolvemos el libro actualizado
    });
};

//// METODO DELETE ////
// Eliminar un libro
const destroyBook = (req, res) => {
    const { id_libro } = req.params;
    const sql = "DELETE FROM libros WHERE id_libro = ?";
    db.query(sql, [id_libro], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El libro a eliminar no existe" });
        }
        res.json({ mensaje: "Libro eliminado con éxito" });
    });
};

// Exportar todas las funciones del controlador
module.exports = {
    allBooks, // Obtiene todos los libros de la base de datos
    showBook, // Obtiene un libro específico por su id_libro
    storeBook, // Crea un nuevo libro en la base de datos
    updatePartialBook, // Permite actualizar algunos campos de un libro de manera parcial
    destroyBook // Elimina un libro de la base de datos
};
