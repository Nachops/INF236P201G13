const express = require("express");
const router = express.Router();
const examenController = require("../Controllers/examenController");

router.route('/')
    .get(examenController.getAllExamenes)
    .post(examenController.crearExamen);

router.route('/:fecha')
    .get(examenController.getExamenesFecha);

router.route('/block/:fecha/:bloque')
    .get(examenController.getExamenesFechaBloque);
router.route('/id/:id')
    .get(examenController.getExamenesId)

module.exports = router;