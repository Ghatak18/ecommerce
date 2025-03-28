const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://supratik:tublai@ecommerce.z10bl.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce")
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;