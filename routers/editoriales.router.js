// /// reseñas.router.js: Define las rutas de la API para manejar las peticiones GET, POST, y DELETE relacionadas con la tabla de relaciones entre libros y etiquetas.

// //// RUTAS DEL MODULO ////
// const express = require("express");
// const router = express.Router();

// const controller = require("../controllers/editoriales.controller");

// //// METODO GET  /////
// // Obtener todas las editoriales
// router.get('/', controller.getAllEditorials);

// // Obtener todas las reseñas de un usuario
// router.get('/usuario/:id_usuario', controller.getReviewsByUser);

// //// METODO PUT ////
// // Editar una editorial
// router.put('/:id_editorial', controller.updateEditorial);

// //// METODO POST  ////
// // Crear una nueva editorial
// router.post('/', controller.storeEditorial);

// //// METODO DELETE ////
// // Eliminar una editorial
// router.delete('/:id_editorial', controller.deleteEditorial);

// // EXPORTAR ROUTERS
// module.exports = router;