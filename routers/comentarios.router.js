/// comentarios.routes.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los comentarios, asignando cada ruta a su controlador correspondiente.

//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/comentarios.controller");

//// METODO GET  /////
// Para obtener todos los comentarios
router.get('/', controller.allComentarios);
// Para obtener un comentario específico
router.get('/:id_comentario', controller.showComentario);

//// METODO POST  ////
// Para crear un nuevo comentario
router.post('/', controller.storeComentario);

//// METODO PUT  ////
// Para actualizar un comentario completamente
router.put('/:id_comentario', controller.updateComentario);

//// METODO PATCH ////
// Para actualizar parcialmente un comentario
router.patch('/:id_comentario', controller.updatePartialComentario);

//// METODO DELETE ////
// Para eliminar un comentario
router.delete('/:id_comentario', controller.destroyComentario);

// EXPORTAR ROUTERS
module.exports = router;