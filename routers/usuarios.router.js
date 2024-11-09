/// usuarios.routes.js: Define las rutas de la API para manejar las peticiones GET, POST, PUT, PATCH, y DELETE de los usuarios, asignando cada ruta a su controlador correspondiente.

/// -------- RUTAS DEL MODULO ---------///
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarios.controller");

/// --------- M U L T E R ---------- ///
const multer = require('multer'); // Para manejo de imágenes
const path = require("path");

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img_users'); // Carpeta donde se guardan las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const uploads = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const filetypes = /jpg|jpeg|png|webp|avif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Tipo de archivo no soportado");
    },
    limits: { fileSize: 1024 * 1024 * 1 }, // aprox. 1 MB
});

///--------- M E T O D O S   H T T P ----------///

//// METODO GET  /////
// Para obtener todos los usuarios
router.get('/', controller.allUsers);
// Para obtener un usuario específico
router.get('/:id_usuario', controller.showUser);

//// METODO POST  ////
// Para crear un nuevo usuario
router.post('/', uploads.single('foto_perfil'), controller.storeUser);

//// METODO PUT  ////
// Para actualizar un usuario completamente
router.put('/:id_usuario', uploads.single('foto_perfil'), controller.updateUser);

//// METODO PATCH ////
// Para actualizar parcialmente un usuario
router.patch('/:id_usuario', uploads.single('foto_perfil'), controller.updatePartialUser);

//// METODO DELETE ////
// Para eliminar un usuario
router.delete('/:id_usuario', controller.destroyUser);

///---------- EXPORTAR ROUTERS ---------///
module.exports = router;