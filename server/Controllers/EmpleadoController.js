const Empleado = require("../Models/Empleado");
const asyncHandler = require("express-async-handler");

const getAllEmpleados = asyncHandler(async (req, res) => {
    const empleados = await Empleado.find().exec();
    if (!empleados) return res.status(204).json({'message': 'No se encontraron empleados'})
    res.json(empleados);
})

const crearEmpleado = asyncHandler(async (req, res) => {
    const {nombre, rut_em, rol} = req.body;

    if(!nombre || !rut_em || !rol ){
        return res.status(400).json({message: "algun campo no tiene valor"})
    }

    //revisar duplicados
    const duplicado = await Empleado.findOne({rut_em}).lean().exec();
    if (duplicado) {
        return res.status(409).json({message: "Rut duplicado"});
    }


    // 
    const empleadoObject = {nombre, rut_em, rol};

    //crear y guardar usuario
    const empleado = await Empleado.create(empleadoObject)

    if (empleado){
        res.status(201).json({message: `Empleado creado`})
    } else {
        res.status(400).json({message: 'Datos invalidos'})
    }
})

const getEmpleadoRut = asyncHandler(async (req, res) => {
    if (!req?.params?.rut) return res.status(400).json({'merssage': "rut requerido"});
    const empleados = await Empleado.findOne({rut_em: req.params.rut}).exec();
    if (!empleados) return res.status(204).json({'message': 'No se encontraron examenes'})
    res.json(empleados);
}
 ) 
module.exports = {
    getAllEmpleados,
    crearEmpleado,
    getEmpleadoRut
}