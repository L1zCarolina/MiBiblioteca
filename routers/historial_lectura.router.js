/// historial_lectura.router.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los historial de lectura, asignando cada ruta a su controlador correspondiente.

//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/historial_lectura.controller");

//// METODO GET  /////
// Para obtener todos los historials
router.get('/', controller.allHistorialLectura);
// Para obtener un historial específico
router.get('/:id_historial', controller.showHistorialLectura);

//// METODO POST  ////
// Para crear un nuevo historial
router.post('/', controller.storeHistorialLectura);

//// METODO PUT  ////
// Para actualizar un historial completamente
router.put('/:id_historial', controller.updateHistorialLectura);

//// METODO PATCH ////
// Para actualizar parcialmente un historial
router.patch('/:id_historial', controller.updatePartialHistorialLectura);

//// METODO DELETE ////
// Para eliminar un historial
router.delete('/:id_historial', controller.destroyHistorialLectura);

// EXPORTAR ROUTERS
module.exports = router;