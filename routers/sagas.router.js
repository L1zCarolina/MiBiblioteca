/// sagas.routes.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los sagas, asignando cada ruta a su controlador correspondiente.

//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/sagas.controller");

//// METODO GET  /////
// Para obtener todos los sagas
router.get('/', controller.allSagas);
// Para obtener un saga específico
router.get('/:id_saga', controller.showSaga);

//// METODO POST  ////
// Para crear un nuevo saga
router.post('/', controller.storeSaga);

//// METODO PUT  ////
// Para actualizar un saga completamente
router.put('/:id_saga', controller.updateSaga);

//// METODO PATCH ////
// Para actualizar parcialmente un saga
router.patch('/:id_saga', controller.updatePartialSaga);

//// METODO DELETE ////
// Para eliminar un saga
router.delete('/:id_saga', controller.destroySaga);

// EXPORTAR ROUTERS
module.exports = router;