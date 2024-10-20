const express = require("express");
const router = express.Router();

const controller = require("../controllers/listas_lectura.controller");

router.get('/', controller.allReadingLists);
router.get('/:id_lista', controller.showReadingList);
router.post('/', controller.storeReadingList);
router.put('/:id_lista', controller.updateReadingList);
router.delete('/:id_lista', controller.destroyReadingList);

module.exports = router;