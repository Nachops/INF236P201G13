const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    rut_pac: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    numero_telefono: {
        type: Number,
        required: true
    },
    email: String
});

module.exports = mongoose.model('Paciente', pacienteSchema, 'pacientes');