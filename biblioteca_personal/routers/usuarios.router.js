const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarios.controller");

router.get('/', controller.allUsers);
router.get('/:id_usuario', controller.showUser);
router.post('/', controller.storeUser);
router.put('/:id_usuario', controller.updateUser);
router.delete('/:id_usuario', controller.destroyUser);

module.exports = router;