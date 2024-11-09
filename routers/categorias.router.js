/// categorias.routes.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los categorias, asignando cada ruta a su controlador correspondiente.

//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/categorias.controller");

//// METODO GET  /////
// Para obtener todos los categorias
router.get('/', controller.allCategories);
// Para obtener un categoria específico
router.get('/:id_categoria', controller.showCategory);

//// METODO POST  ////
// Para crear un nuevo categoria
router.post('/', controller.storeCategory);

//// METODO PUT  ////
// Para actualizar un categoria completamente
router.put('/:id_categoria', controller.updateCategory);

//// METODO PATCH ////
// Para actualizar parcialmente un categoria
router.patch('/:id_categoria', controller.updatePartialCategory);

//// METODO DELETE ////
// Para eliminar un categoria
router.delete('/:id_categoria', controller.destroyCategory);

// EXPORTAR ROUTERS
module.exports = router;