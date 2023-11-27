const Paciente = require("../Models/Paciente");
const asyncHandler = require("express-async-handler");

const getAllPacientes = asyncHandler(async (req, res) => {
    const pacientes = await Paciente.find().exec();
    if (!pacientes) return res.status(204).json({'message': 'No se encontraron pacienes'})
    res.json(pacientes);
})

const crearPaciente = asyncHandler(async (req, res) => {
    const {rut_pac, nombre, numero_telefono, email} = req.body;

    if(!rut_pac || !nombre || !numero_telefono || !email){
        return res.status(400).json({message: "algun campo no tiene valor"})
    }

    //revisar duplicados
    const duplicado = await Paciente.findOne({rut_pac}).lean().exec();
    if (duplicado) {
        return res.status(409).json({message: "Rut duplicado"});
    }

    const pacienteObject = {rut_pac, nombre, numero_telefono, email};

    //crear y guardar usuario
    const user = await Paciente.create(pacienteObject)

    if (user){
        res.status(201).json({message: `Nuevo paciente ${nombre} creado`})
    } else {
        res.status(400).json({message: 'Datos invalidos'})
    }
})

const getPacienteId = asyncHandler(async (req,res)=>{
    if (!req?.params?.id) return res.status(400).json({'message': "Id requerido"});
    const pacientes = await Paciente.find({_id: req.params.id}).exec();
    if (!pacientes) return res.status(204).json({'message': 'No se encontraron pacientes con ese id'})
    res.json(pacientes);
})

const getPacienteRut = asyncHandler(async (req,res)=>{
    if (!req?.params?.rut) return res.status(400).json({'message': "Rut requerido"});
    const pacientes = await Paciente.find({rut_pac: req.params.rut}).exec();
    if (!pacientes) return res.status(204).json({'message': 'No se encontraron pacientes con ese rut'})
    res.json(pacientes);
})

module.exports = {
    getAllPacientes,
    crearPaciente,
    getPacienteId,
    getPacienteRut
}
