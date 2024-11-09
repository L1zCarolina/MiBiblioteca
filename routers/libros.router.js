//// RUTAS DEL MODULO ////
const express = require("express");
const router = express.Router();

const controller = require("../controllers/libros.controller");

//// METODO GET  /////
// Para obtener todos los libros
router.get('/', controller.allBooks);
// Para obtener un libro específico
router.get('/:id_libro', controller.showBook);

//// METODO POST  ////
// Para crear un nuevo libro
router.post('/', controller.storeBook);

//// METODO PUT  ////
// Para actualizar un libro completamente (usaremos el mismo método de actualización parcial)
router.put('/:id_libro', controller.updatePartialBook);

//// METODO PATCH ////
// Para actualizar parcialmente un libro
router.patch('/:id_libro', controller.updatePartialBook);

//// METODO DELETE ////
// Para eliminar un libro
router.delete('/:id_libro', controller.destroyBook);

// EXPORTAR ROUTERS
module.exports = router;
