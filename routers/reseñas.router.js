// /// reseñas.router.js: Define las rutas de la API para manejar las peticiones GET, POST, y DELETE relacionadas con la tabla de relaciones entre libros y etiquetas.

// //// RUTAS DEL MODULO ////
// const express = require("express");
// const router = express.Router();

// const controller = require("../controllers/reseñas.controller");

// //// METODO GET  /////
// // Obtener todas las reseñas de un libro
// router.get('/libro/:id_libro', reseñasController.getReviewsByBook);

// // Obtener todas las reseñas de un usuario
// router.get('/usuario/:id_usuario', reseñasController.getReviewsByUser);

// //// METODO PUT ////
// // Editar una reseña
// router.put('/:id_resena', reseñasController.updateReview);

// //// METODO POST  ////
// // Para crear una nueva reseña
// router.post('/', reseñasController.storeReview);

// //// METODO DELETE ////
// // Eliminar una reseña
// router.delete('/:id_resena', reseñasController.deleteReview);

// // EXPORTAR ROUTERS
// module.exports = router;