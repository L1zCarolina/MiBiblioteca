const express = require("express");
const router = express.Router();

const controller = require("../controllers/resenas.controller");

router.get('/', controller.allReviews);
router.get('/:id_resena', controller.showReview);
router.post('/', controller.storeReview);
router.put('/:id_resena', controller.updateReview);
router.delete('/:id_resena', controller.destroyReview);

module.exports = router;