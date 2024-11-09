const express = require("express");
const router = express.Router();

const controller = require("../controllers/libros_etiquetas.controller");

//// METODO GET  /////
// Para obtener todas las relaciones entre libros y etiquetas
router.get('/', controller.allLibrosEtiquetas); // Aquí cambiamos 'allEtiquetas' por 'allLibrosEtiquetas'

// Para obtener las etiquetas de un libro específico
router.get('/libro/:id_libro', controller.showEtiquetasByLibro);

// Para obtener los libros de una etiqueta específica
router.get('/etiqueta/:id_etiqueta', controller.showLibrosByEtiqueta);

//// METODO POST  ////
// Para crear una nueva relación entre un libro y una etiqueta
router.post('/', controller.storeLibroEtiqueta);

//// METODO DELETE ////
// Para eliminar una relación entre un libro y una etiqueta
router.delete('/:id_libro/:id_etiqueta', controller.destroyLibroEtiqueta);

// EXPORTAR ROUTERS
module.exports = router;
