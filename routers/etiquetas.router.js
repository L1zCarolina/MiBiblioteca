/// etiquetas.router.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los etiquetas, asignando cada ruta a su controlador correspondiente.

//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/etiquetas.controller");

//// METODO GET  /////
// Para obtener todos los etiquetas
router.get('/', controller.allEtiquetas);
// Para obtener un etiqueta específico
router.get('/:id_etiqueta', controller.showEtiqueta);

//// METODO POST  ////
// Para crear un nuevo etiqueta
router.post('/', controller.storeEtiqueta);

//// METODO PUT  ////
// Para actualizar un etiqueta completamente
router.put('/:id_etiqueta', controller.updateEtiqueta);

//// METODO PATCH ////
// Para actualizar parcialmente un etiqueta
router.patch('/:id_etiqueta', controller.updatePartialEtiqueta);

//// METODO DELETE ////
// Para eliminar un etiqueta
router.delete('/:id_etiqueta', controller.destroyEtiqueta);

// EXPORTAR ROUTERS
module.exports = router;