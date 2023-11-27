const express = require("express");
const router = express.Router();
const empleadoController = require("../Controllers/EmpleadoController");

router.route('/')
    .get(empleadoController.getAllEmpleados)
    .post(empleadoController.crearEmpleado)

router.route('/:rut')
    .get(empleadoController.getEmpleadoRut)

module.exports = router;