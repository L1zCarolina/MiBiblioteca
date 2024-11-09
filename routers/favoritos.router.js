/// favoritos.routes.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los favoritos, asignando cada ruta a su controlador correspondiente.

//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/favoritos.controller");

//// METODO GET  /////
// Para obtener todos los favoritos
router.get('/', controller.allFavoritos);
// Para obtener un favorito específico
router.get('/:id_favorito', controller.showFavorito);

//// METODO POST  ////
// Para crear un nuevo favorito
router.post('/', controller.storeFavorito);

//// METODO PUT  ////
// Para actualizar un favorito completamente
router.put('/:id_favorito', controller.updateFavorito);

//// METODO PATCH ////
// Para actualizar parcialmente un favorito
router.patch('/:id_favorito', controller.updatePartialFavorito);

//// METODO DELETE ////
// Para eliminar un favorito
router.delete('/:id_favorito', controller.destroyFavorito);

// EXPORTAR ROUTERS
module.exports = router;
