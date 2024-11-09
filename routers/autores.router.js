/// autors.routes.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los autores, asignando cada ruta a su controlador correspondiente.

//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/autores.controller");

//// METODO GET  /////
// Para obtener todos los autores
router.get('/', controller.allAuthors);
// Para obtener un autor específico
router.get('/:id_autor', controller.showAuthor);

//// METODO POST  ////
// Para crear un nuevo autor
router.post('/', controller.storeAuthor);

//// METODO PUT  ////
// Para actualizar un autor completamente
router.put('/:id_autor', controller.updateAuthor);

//// METODO PATCH ////
// Para actualizar parcialmente un autor
router.patch('/:id_autor', controller.updatePartialAuthor);

//// METODO DELETE ////
// Para eliminar un autor
router.delete('/:id_autor', controller.destroyAuthor);

// EXPORTAR ROUTERS
module.exports = router;