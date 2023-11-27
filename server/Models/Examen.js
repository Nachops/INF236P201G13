const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examenSchema = new Schema({
    tipo: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora_inicio: {
        type: String,
        required: true
    },
    detalle: String,
    paciente: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    nombre_medico_tratante: String,
    motivo_derivacion: String,
    sobreescrito: Boolean,
    sobreescritura: {
        quien_sobreescribio: String,
        motivo_sobreescritura: String
    }


});

module.exports = mongoose.model("Examen", examenSchema);