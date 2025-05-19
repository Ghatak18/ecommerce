const mongoose  = require('mongoose')

const connectDb = async(req,res) =>{
    try {
        await mongoose.connect("mongodb+srv://supratik:tublai@ecommerce.z10bl.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce")
        console.log("Connected to MongoDB")
    } catch{
        console.log('Error connecting to database')
    }
}

module.exports = connectDb