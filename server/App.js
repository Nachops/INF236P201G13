const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { default: mongoose } = require("mongoose");

//importar base de datos
const db = require("./Database/index");

const app = express();

app.set("port", process.env.PORT || 5000);

//Middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


//Cosas estaticas
app.use("/pacientes", require("./Routes/PacienteRuta"));
app.use("/examenes", require("./Routes/ExamenRuta"));
app.use("/empleados", require("./Routes/EmpleadoRuta"))

db();


mongoose.connection.once('open', () => {
    console.log("conectao");
    app.listen(app.get("port"), ()=>{
        console.log('Servidor esta corriendo en el puerto: '+app.get("port"));
    })
})


module.exports = app;