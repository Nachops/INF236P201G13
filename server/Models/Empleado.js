const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
    nombre: String,
    rut_em: String,
    rol: String
});

module.exports = mongoose.model('Empleado', empleadoSchema);