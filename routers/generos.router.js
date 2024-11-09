/// RUTAS DEL MODULO ///
const express = require("express"); // express es una biblioteca que se utiliza para pedir algo especifico de esa biblioteca como son los routers
const router = express.Router(); //selecciono que solo quiero el router no toda la biblioteca y dentro de eso va a meter esa variable que se llama router

const controller = require("../controllers/generos.controller"); //se esta aramando un modulo el cual va a requerir el modulo que se llama generos control que se va a meter en la variable control

//// METODO GET  ////

// Para obtener todos los generos
router.get('/', controller.allGenre);

// Para para obtener un genero en especifico 
router.get('/:id_genero', controller.showGenre);

//// METODO POST  ////

// Para crear un nuevo genero
router.post('/', controller.storeGenre);

//// METODO PUT  ////

// Para actualizar todo el genero
router.put('/:id_genero', controller.updateGenre);

//// METODO PATCH ////

// Para actualizar algo del genero
router.patch('/:id_genero', controller.updatePartialGenre); 


//// METODO DELETE ////

// Para eliminar un genero 
router.delete('/:id_genero', controller.destroyGenre);

// EXPORTAR ROUTERS
module.exports = router;
