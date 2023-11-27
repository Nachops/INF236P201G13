const Examen = require("../Models/Examen");
const asyncHandler = require("express-async-handler");

const getAllExamenes = asyncHandler(async (req, res) => {
    const examenes = await Examen.find().exec();
    if (!examenes) return res.status(204).json({'message': 'No se encontraron examenes'})
    res.json(examenes);
})

const crearExamen = asyncHandler(async (req, res) => {
    const {tipo, fecha, hora_inicio, detalle, paciente, nombre_medico_tratante, motivo_derivacion, sobreescrito} = req.body;

    if(!tipo || !fecha || !hora_inicio || !detalle || !paciente){
        return res.status(400).json({message: "algun campo no tiene valor"})
    }

    //revisar disponibilidad
    


    // 
    const examenObject = {tipo, fecha, hora_inicio, detalle, paciente, nombre_medico_tratante, motivo_derivacion, sobreescrito};

    //crear y guardar usuario
    const examen = await Examen.create(examenObject)

    if (examen){
        res.status(201).json({message: `Examen creado`})
    } else {
        res.status(400).json({message: 'Datos invalidos'})
    }
})

const getExamenesFecha = asyncHandler(async (req, res) => {
    if (!req?.params?.fecha) return res.status(400).json({'merssage': "Fecha requerida"});
    const examenes = await Examen.find({fecha: req.params.fecha}).exec();
    if (!examenes) return res.status(204).json({'message': 'No se encontraron examenes'})
    res.json(examenes);
})

const getExamenesFechaBloque = asyncHandler(async (req,res) =>{
    if (!req?.params?.fecha || !req?.params?.bloque) return res.status(400).json({'merssage': "Fecha y bloque requeridos"});
    const examenes = await Examen.find({fecha: req.params.fecha, hora_inicio: req.params.bloque}).exec();
    if (!examenes) return res.status(204).json({'message': 'No se encontraron examenes'})
    res.json(examenes);
})

const getExamenesId = asyncHandler(async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({'merssage': "id requerido"});
    const examenes = await Examen.find({_id: req.params.id}).exec();
    if (!examenes) return res.status(204).json({'message': 'No se encontraron examenes'})
    res.json(examenes);
})
module.exports = {
    getAllExamenes,
    crearExamen,
    getExamenesFecha,
    getExamenesFechaBloque,
    getExamenesId
}