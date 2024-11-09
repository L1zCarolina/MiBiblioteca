/// citas.routes.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los citas, asignando cada ruta a su controlador correspondiente.

//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/citas.controller");

//// METODO GET  /////
// Para obtener todos los citas
router.get('/', controller.allCitas);
// Para obtener un cita específico
router.get('/:id_cita', controller.showCita);

//// METODO POST  ////
// Para crear un nuevo cita
router.post('/', controller.storeCita);

//// METODO PUT  ////
// Para actualizar un cita completamente
router.put('/:id_cita', controller.updateCita);

//// METODO PATCH ////
// Para actualizar parcialmente un cita
router.patch('/:id_cita', controller.updatePartialCita);

//// METODO DELETE ////
// Para eliminar un cita
router.delete('/:id_cita', controller.destroyCita);

// EXPORTAR ROUTERS
module.exports = router;