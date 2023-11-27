const express = require("express");
const router = express.Router();
const pacienteController = require("../Controllers/pacienteController");


router.route('/')
    .get(pacienteController.getAllPacientes)
    .post(pacienteController.crearPaciente);
router.route('/:id')
    .get(pacienteController.getPacienteId);
router.route('/rut/:rut')
    .get(pacienteController.getPacienteRut);

module.exports = router;