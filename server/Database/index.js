const mongoose = require("mongoose");
const MONGO_URL = "mongodb+srv://Matty:Bu11ademivida@bd-proyecto.6oijxbw.mongodb.net/?retryWrites=true&w=majority"
const db = async () => {
    try{
        const conn = await mongoose.connect(MONGO_URL);
        console.log("Base de datos conectada", conn.connection.host)
    }

    catch (error){
        console.log(error)
    }
}

module.exports = db