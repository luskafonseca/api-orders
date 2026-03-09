const mongoose = require("mongoose");

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Atlas conectado");

    } catch (error) {

        console.error("Erro ao conectar no MongoDB:", error);

    }

}

module.exports = connectDB;